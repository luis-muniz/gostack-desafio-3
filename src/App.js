import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    api.get("/repositories").then((response) => {
      const data = response.data;

      setRepositories([].concat(repositories, data));
    });
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      title,
      url,
      techs: [techs],
    };

    const response = await api.post("/repositories", newRepository);

    if (response.status === 200) {
      setRepositories([].concat(repositories, [response.data]));
      setTitle("");
      setUrl("");
      setTechs("");
    }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if (response.status === 204) {
      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    } else {
      console.log("ocorreu um erro");
    }
  }

  return (
    <div className="container">
      <div className="group-input">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Título"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          placeholder="Digite a url"
        />
        <input
          value={techs}
          onChange={(e) => setTechs(e.target.value)}
          type="text"
          placeholder="Tecnologias"
        />
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>

      <div className="content-list">
        <h1>Lista de Repositórios</h1>
        <ul data-testid="repository-list">
          {repositories.map((repository) => {
            return (
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
