import './App.css';
import Header from './components/header/Header';
import WelcomeMsg from './components/welcome_msg/WelcomeMsg';
import LangSelector from './components/lang-selector/LangSelector';
import WelcomeBgImg from './components/welcome_bg_img/WelcomeBgImg';
import StartMsg from './components/start_msg/StartMsg';

function App() {
  return (
    <>
    <Header />
    <WelcomeMsg />
    <LangSelector />
    <WelcomeBgImg 
      imageUrl="/assets/images/testmuseum.png" 
      altText="Museum Welcome Background" 
    />
    <StartMsg />
    </>
  );
}

export default App;
