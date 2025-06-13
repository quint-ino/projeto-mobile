import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('atlcompany.db');

export interface Product {
  id: string;
  name: string;
  price: number;
}

export const initDB = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: { executeSql: (arg0: string, arg1: never[], arg2: () => void, arg3: (_: any, error: any) => boolean) => void; }) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS products (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          price REAL NOT NULL
        );`,
        [],
        () => resolve(),
        (_: any, error: any) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const insertProducts = (products: Product[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: { executeSql: (arg0: string, arg1: (string | number)[]) => void; }) => {
      products.forEach(product => {
        tx.executeSql(
          'INSERT OR IGNORE INTO products (id, name, price) VALUES (?, ?, ?);',
          [product.id, product.name, product.price]
        );
      });
    },
    (err: any) => reject(err),
    () => resolve());
  });
};

export const fetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: { executeSql: (arg0: string, arg1: never[], arg2: (_: any, result: { rows: { _array: Product[]; }; }) => void, arg3: (_: any, error: any) => boolean) => void; }) => {
      tx.executeSql(
        'SELECT * FROM products;',
        [],
        (_: any, result: { rows: { _array: Product[]; }; }) => {
          const data: Product[] = result.rows._array;
          resolve(data);
        },
        (_: any, error: any) => {
          reject(error);
          return false;
        }
      );
    });
  });
};
