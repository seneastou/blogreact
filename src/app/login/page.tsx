"use client";
import React, { useState } from "react";
import Link from "next/link";
import InputBox from "../component/InputBox/index";
import MyButton from "../component/MyButton/index";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fonction de mise à jour de l'état du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError(null);
  };

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    if (!form.email.trim() || !form.password.trim()) {
      setError("Tous les champs sont requis.");
      setLoading(false);
      return;
    }
   
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validEmail.test(form.email)) {
      setError("Veuillez entrer une adresse e-mail valide.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Une erreur est survenue");
      } else {
        alert(data.message || "Connexion réussie");
        localStorage.setItem("userEmail", form.email);
        // Redirigez l'utilisateur vers une autre page après la connexion réussie
        window.location.href = "./articles"; // Exemple de redirection
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setError("Une erreur de réseau est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="container">
        <h2>Se connecter</h2>
        {error && <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>} 
        <div className="form-group">
          {/* Utilisation de InputBox pour le champ email et mot de passe */}
          <InputBox
            email={form.email}
            password={form.password}
            onChange={handleChange}
          />
        </div>
        
        <MyButton
          text={"Se connecter"}
          onClick={handleSubmit}
          
        />
        <p>
          Pas encore inscrit ? <Link href="./register"> S'inscrire</Link>
        </p>
      </div>
    </main>
  );
}
