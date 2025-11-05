import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/accueil/Accueil';
import MesChoix from './pages/mes_choix/MesChoix';
import ResumeProgressBar from './components/resume_progress_bar/ResumeProgressBar';
import ResumeArt from './components/resume_art/ResumeArt';

function App() {
  return (
    <>
    <ResumeProgressBar completed={3} total={10} timeLeft={"05:23"} > </ResumeProgressBar>
    <ResumeArt/>
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/mes-choix" element={<MesChoix />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
