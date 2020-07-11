import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    });
  }, []);

  async function handleAddRepository() {
    api.post('/repositories', {
      title: "Github repo",
      url: "http://github.com",
      techs: ["React", "Node.js"]
    }).then(response => {
      setRepositories([...repositories, response.data]);
    });
  }

  async function handleRemoveRepository(index) {
    const repositoryToDelete = repositories[index];

    api.delete(`/repositories/${repositoryToDelete.id}`). then(() => {
      setRepositories(repositories
        .filter(repository => repository.id !== repositoryToDelete.id));
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(index)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
