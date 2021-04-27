import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
// import { LoginContext } from '../../context/LoginContext';

function App() {
  // const { activeLogin } = useContext(LoginContext); <-- Data from context file

  return (
    <div className="app">
      <Header />
      <Sidebar />
      <main>main</main>
    </div>
  );
}

export default App;
