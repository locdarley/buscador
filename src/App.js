import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';

import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState('');

  async function handleSearch() {
    if (input === '') {
      alert('Informe algum CEP');
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      alert('Ops, algo deu errado...');
      setInput('');
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite o seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress} 
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {cep && (
        <main className="main">
          <h2>{cep.cep} </h2>
          <span>{cep.logradouro} </span>
          <span> {cep.complemento}</span>
          <span> {cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.ud}{' '}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
