import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';  // Login bileşeniniz
import Yonetici from './Yonetici';  // Yönetici sayfası
import Calisan from './Calisan';  // Çalışan sayfası
import YoneticiTakip from './YoneticiTakip';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Yonetici/Index" element={<Yonetici />} />
        <Route path="/Calisan/Index" element={<Calisan />} />
        <Route path="/Yonetici/Takip" element={<YoneticiTakip />} />
      </Routes>
    </Router>
  );
};

export default App;
