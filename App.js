import React, { useEffect } from 'react';
import { initDB, insertProducts } from './database';
import * as SQLite from 'expo-sqlite';

const initialProducts = [
  {
    id: '1',
    name: 'Velas Aromáticas 110g - Vários Aromas',
    price: 35.00,
  },
  {
    id: '2',
    name: 'Caixa Decorativa',
    price: 95.00,
  },
  {
    id: '3',
    name: 'Kit Crochê e Tricô',
    price: 50.00,
  },
  {
    id: '4',
    name: 'Conjunto Stencil - Artesanato Decorativo',
    price: 11.50,
  },
];

export default function App() {
  useEffect(() => {
    async function setupDatabase() {
      try {
        await initDB();
        await insertProducts(initialProducts);
        console.log('Banco de dados pronto!');
      } catch (err) {
        console.error('Erro ao inicializar o banco:', err);
      }
    }

    setupDatabase();
  }, []);

  return (
    // seu componente de navegação ou tela inicial aqui
    null
  );
}