"use client";
import React, { useState } from "react";
import Link from "next/link";
import InputBox from "../component/InputBox/index";
import MyButton from "../component/MyButton/index";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  // État pour gérer le formulaire, les messages d'erreur, et l'indicateur de chargement
  const [form, setForm] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fonction de mise à jour de l'état du formulaire à chaque saisie
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError(null);
  };

  // Fonction de soumission de l'inscription
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!form.username.trim() || !form.email.trim() || !form.password.trim()) {
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

    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!validPassword.test(form.password)) {
      setError(
        "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial."
      );
      setLoading(false);
      return;
    }

    try {
      // Envoie des données au backend
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Une erreur s'est produite lors de l'inscription"
        );
      } else {
        setSuccess("Inscription réussie !");
        alert("Inscription réussie !");
        
        // Redirigez l'utilisateur vers la page de connexion après un délai
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }
    } catch (error) {
      console.error("Erreur lors de l’inscription :", error);
      setError("Erreur de réseau, veuillez réessayer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="container">
        <h2>S'inscrire</h2>
        {error && (
          <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>
        )}

        <div className="form-group">
          {/* Champ d'entrée pour le nom d'utilisateur */}
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            disabled={loading}
          />
          {/* Réutilisation de InputBox pour les champs email et mot de passe */}
          <InputBox
            email={form.email}
            password={form.password}
            onChange={handleChange}
          />
        </div>
        <MyButton text={"S'inscrire"} onClick={handleSubmit} />
        <p>
          Déjà inscrit ? <Link href="./login">Se connecter</Link>
        </p>
      </div>
    </main>
  );
}
