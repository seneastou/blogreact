"use client";
import React, { useEffect, useState } from "react";
import ArticleItem from "../component/ArticleItem";
import Link from "next/link";
import { Article } from "../component/ArticleItem";

export default function Allarticles() {
  const [articles, setArticles] = useState<Omit<Article, "content">[]>();
  useEffect(() => {
    async function fetchData() {
      const data = await fetch("http://localhost:8080/articles");
      if (!data.ok) {
        return data.json();
      }
      console.log(data);
      const jsonData = (await data.json()).data;
      const articlesWithoutContent = jsonData.map(
        ({ content, image, ...rest }: Article) => ({
          ...rest,
          image: `http://localhost:8080/images/${image}`,
          date_post: new Date(rest.date_post),
        })
      );

      setArticles(articlesWithoutContent);
    }

    fetchData();
  }, []);

  return (
    <main>
      <Link href="/" className="accueil">
        Déconnexion
      </Link>
      <div className="articles-container">
        <h2>Liste des articles</h2>
        <a href="./create-article" className="new-article-btn">
          Créer un nouvel article
        </a>
        <div id="articlesList">
          {articles && articles.length > 0 ? (
            <ul>
              {articles.map((article) => (
                <li key={article.id}>
                  <ArticleItem
                    id={article.id}
                    title={article.title}
                    image={article.image} // Assurez-vous que l'image est bien passée
                    author={article.author}
                    date_post={article.date_post}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun article trouvé</p>
          )}
        </div>
      </div>
    </main>
  );
}
