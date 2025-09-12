import React from 'react';
import './Result.css';

const Result = ({ resultado }) => {
  if (resultado === null || resultado === undefined) return null; // não mostra nada se não tiver resultado

  // Define a mensagem e a classe CSS baseada no resultado
  const mensagem = resultado === 1 ? 'Deu falha' : 'Não deu falha';
  const classeResultado = resultado === 1 ? 'falha' : 'sucesso';

  return (
    <div className={`resultado-container ${classeResultado}`}>
      <h3>Resultado da Previsão:</h3>
      <p className="resultado-texto">{mensagem}</p>
    </div>
  );
};

export default Result;
