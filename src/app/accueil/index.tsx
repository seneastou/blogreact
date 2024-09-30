'use client';
import React from 'react';
import Link from 'next/link';

 
export default function Accueil() {
  return (
    <main className="message">
       <h1>Welcome to my blog</h1>
       <div className="accueillog">
       <p>Vous avez la possibilité de lire et de créer des articles de votre choix !</p>

       <Link href="./login">
            Se connecter
          </Link>
       </div>
       </main>  
  );
};

