import './App.css';
import Header from './components/header/Header';
import WelcomeMsg from './components/welcome_msg/WelcomeMsg';
import LangSelector from './lang-selector/LangSelector';
function App() {
  return (
    <>
    <Header />
    <WelcomeMsg />
    <LangSelector />
    </>
  );
}

export default App;
