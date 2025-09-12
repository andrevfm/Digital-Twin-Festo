import Banner from './componentes/Banner';
import Header from './componentes/Header';
import Dashboard from './componentes/Dashboard'; // Importando o componente correto

function App() {
  // A lógica de formulário foi removida, o App.js fica mais simples
  return (
    <div className="App">
      <Banner /> 
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;