import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';  
import Yonetici from './Yonetici';  
import Calisan from './Calisan';  
import YoneticiTakip from './YoneticiTakip';
import YoneticiAta from './YoneticiAta';
import CalisanTamamla from './CalisanTamamla';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Yonetici/Index" element={<Yonetici />} />
        <Route path="/Calisan/Index" element={<Calisan />} />
        <Route path="/Yonetici/Takip" element={<YoneticiTakip />} />
        <Route path="/Yonetici/Ata" element={<YoneticiAta/>} />
        <Route path="/Calisan/Tamamla" element={<CalisanTamamla/>} />
      </Routes>
    </Router>
  );
};

export default App;
