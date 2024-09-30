'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import MyButton from '../component/MyButton';


interface CreateArticleForm {
  title: string;
  content: string;
  author: string;
  image: File | null; 
}

export default function CreateArticle() {
  // État pour gérer le formulaire d'article
  const [form, setForm] = useState<CreateArticleForm>({
    title: '',
    content: '',
    author: '', // Initialiser `author`
    image: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fonction de mise à jour de l'état du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError(null);
  };

  // Fonction spécifique pour gérer le changement du champ image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setForm({ ...form, image: e.target.files[0] });
    }
  };

  // Fonction de soumission de l'article
const handleSubmit = async () => {
  setLoading(true);
  setError(null);

  try {
    // Préparer les données du formulaire
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', form.content);
    formData.append('author', form.author); // Utilisez `author` au lieu de `id_user`
    if (form.image) {
      formData.append('image', form.image.name); // Assurez-vous que `image` est un fichier, pas un chemin ou une chaîne
    }
    const plainFormData = Object.fromEntries(formData.entries());
    // Envoyer la requête POST au backend
    const response = await fetch('http://localhost:8080/articles', {
      method: 'POST',
      headers: { "Content-Type": "application/json",},
      body: JSON.stringify(plainFormData) // Envoyer formData dans le corps de la requête
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Une erreur s'est produite lors de la création de l'article");
    } else {
      // Afficher une alerte indiquant que l'article a été créé
      alert("Article créé avec succès !");
      // Rediriger vers la page des articles
       window.location.href = "./articles";
    }
  } catch (error) {
    console.error('Erreur lors de la création de l’article :', error);
    setError("Erreur de réseau, veuillez réessayer");
  } finally {
    setLoading(false);
  }
};

  return (
    <main>
      <div className='container'>
        <h2>Créer un article</h2>
        
        <div className="form-group">
          <label htmlFor="title">Titre de l'article</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            placeholder="Titre de l'article"
            onChange={handleChange}
            required
            disabled={loading} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Auteur</label>
          <input
            type="text"
            id="author"
            name="author" // Utilisez `author`
            value={form.author}
            placeholder="Nom de l'auteur"
            onChange={handleChange}
            required
            disabled={loading} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Contenu</label>
          <input
            type="text"
            id="content"
            name="content"
            value={form.content}
            placeholder="Contenu de l'article"
            onChange={handleChange}
            required
            disabled={loading} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image de l'article</label>
          <input
            type="file"
            id="imageUrl"
            name="image"
            accept="image/*" 
            onChange={handleImageChange} // Utiliser `onChange` pour le champ de fichier
          />
        </div>

        {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

        <MyButton
          text={"Créer"}
          onClick={handleSubmit}
        />
        
        <p>
          <Link href="./articles">Retour à la liste des articles</Link>
        </p>
      </div>
    </main>
  );
}
