import './App.css';
import ArtMovementSelector from './components/art_movement_selector/ArtMovementSelector';
import ResumeTypeSelector from './components/resume_type_style/ResumeTypeSelector';
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
    </>
  );
}

export default App;
