"use client";
import React, { useEffect, useState } from "react";
import ArticleItem from "../../component/ArticleItem/index";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Article } from "../../component/ArticleItem/index";

export default function SingleArticle() {
  const [article, setArticle] = useState<Article | null>(null); // Un seul article
  const { id } = useParams(); // Récupérer l'id de l'URL

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`http://localhost:8080/articles/${id}`);

      if (!data.ok) {
        console.error(
          `Erreur lors de la récupération de l'article: ${data.statusText}`
        );
        return;
      }

      const jsonData = await data.json();

      const articleData = {
        ...jsonData.data,
        image: `http://localhost:8080/images/${jsonData.data.image}`, // Assurez-vous que l'image est correctement construite
        date_post: new Date(jsonData.data.date_post),
      };

      setArticle(articleData);
    }

    fetchData();
  }, [id]);

  return (
    <main>
      <Link href="/articles" className="accueil">
        Retour à la liste des articles
      </Link>

      <div className="detailArticle">
        <div className="detailArticle-container">
          <h2>Détails de l'article</h2>
          {article ? (
            <ArticleItem
              id={article.id}
              title={article.title}
              image={article.image}
              content={article.content} // Assurez-vous que l'image est bien passée
              author={article.author}
              date_post={article.date_post}
            />
          ) : (
            <p>Chargement de l'article...</p>
          )}
        </div>
      </div>
    </main>
  );
}
