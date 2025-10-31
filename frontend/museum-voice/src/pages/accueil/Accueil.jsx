import React from 'react';
import Header from '../../components/header/Header';
import WelcomeMsg from '../../components/welcome_msg/WelcomeMsg';
import LangSelector from '../../components/lang-selector/LangSelector';
import WelcomeBgImg from '../../components/welcome_bg_img/WelcomeBgImg';
import StartMsg from '../../components/start_msg/StartMsg';
import GenParcours from '../../components/gen_parcours/GenParcours';
import { useNavigate } from 'react-router-dom';


const Accueil = () => {
  const navigate = useNavigate();
  const goToMesChoix = () => {
    navigate('/mes-choix');
  }
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header />
      <WelcomeMsg />
      <LangSelector />
      <div style={{ flex: 1 }}>
        <WelcomeBgImg
          imageUrl="/assets/images/testmuseum.png"
          altText="Museum Welcome Background"
        />
      </div>
      <StartMsg />
      <GenParcours onClick={goToMesChoix } />
    </div>
  );
};

export default Accueil;
