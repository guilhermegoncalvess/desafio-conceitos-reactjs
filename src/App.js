import React, {useEffect, useState} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect( () => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    
    const response = await api.post('repositories', {
      title: "REPOSITORIO1",
      owner: "Professor",
      techs: ["JavaScript", "Nodejs", "React"] 
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);

    const repository = repositories.filter( repository => { 
      return repository.id !== id 
    });
    
    setRepositories(repository);
  }

  return (
    <div>
      <ul data-testid="repository-list">        
        {repositories.map( (repository) => {
          return (
            <div>
              <li key={repository.id}>{repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            </div>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
