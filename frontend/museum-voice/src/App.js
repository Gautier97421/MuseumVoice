import './App.css';
import ArtMovementSelector from './components/art_movement_selector/ArtMovementSelector';
import InterestSelector from './components/interest/Interest';
import ResumeTypeSelector from './components/resume_type_style/ResumeTypeSelector';
import ThemeAndSeasonsSelector from './components/theme_and_seasons/ThemeAndSeasons';
import TimeRegulator from './components/time_regulator/TimeRegulator';
import VisitStyleSelector from './components/visit_style/VisitStyleSelector';
import Accueil from './pages/accueil/Accueil';


function App() {
  return (
    <>
    <Accueil /> 
    <TimeRegulator />
    <VisitStyleSelector />
    <ResumeTypeSelector />
    <ArtMovementSelector />
    <ThemeAndSeasonsSelector />
    <InterestSelector />
    </>
  );
}

export default App;
