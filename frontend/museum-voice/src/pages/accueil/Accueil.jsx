import React from 'react';
import Header from '../../components/header/Header';
import WelcomeMsg from '../../components/welcome_msg/WelcomeMsg';
import LangSelector from '../../components/lang-selector/LangSelector';
import WelcomeBgImg from '../../components/welcome_bg_img/WelcomeBgImg';
import StartMsg from '../../components/start_msg/StartMsg';
import GenParcours from '../../components/gen_parcours/GenParcours';

const Accueil = () => {
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
      <GenParcours onClick={() => alert('Parcours généré!')} />
    </>
  );
};

export default Accueil;
