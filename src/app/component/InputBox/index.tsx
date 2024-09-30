import React from 'react';

export interface Input {
  email: string;
  password: string;
}

interface InputBoxProps {
  email: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Ajoutez la fonction onChange
}

export default function InputBox({ email, password, onChange }: InputBoxProps) {
  return (
    <main>
      <form>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Adresse email"
          value={email}
          onChange={onChange} // Ajoutez l'écouteur d'événements
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mot de passe"
          value={password}
          onChange={onChange} // Ajoutez l'écouteur d'événements
        />
      </form>
    </main>
  );
}
