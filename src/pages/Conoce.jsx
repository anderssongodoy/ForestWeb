import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const Conoce = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Realiza la solicitud a la API de noticias
    axios
      .get('https://newsapi.org/v2/everything?q=deforestation&apiKey=c6ecf0cdc2d94b72bd8b9f4cb18c5289')
      .then((response) => {
        setNews(response.data.articles);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  }, []);

  return (
    <div className="conoce">
      <h2 className="text-3xl font-semibold mb-4">Noticias sobre Deforestación</h2>
      <ul>
        {news.map((article, index) => (
          <li key={index} className="mb-4 p-4 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
            <p className="text-gray-700">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline block mt-2"
            >
              Leer más
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}