import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface Article {
  id: number;
  title: string;
  content?: string; // Rendre "content" optionnel pour plus de flexibilité
  image: string;
  date_post: Date;
  author: string;
}

// Composant pour afficher un article individuel
export default function ArticleItem(article: Article) {
  const formattedDate = new Date(article.date_post).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="article-item">
      <h3>{article.title}</h3>
      <Link href={`/articles/${article.id}`}>
        <Image
          src={article.image}
          width={345}
          height={250}
          alt={`Image de ${article.title}`}
          style={{ cursor: "pointer" }}
        />
      </Link>
      {/* Affichage conditionnel de `content` seulement s'il existe */}
      {article.content && <p>{article.content}</p>}
      <p>
        <strong>Auteur :</strong> {article.author}
      </p>
      <p>
        <strong>Publié le :</strong> {formattedDate}
      </p>
    </div>
  );
}
