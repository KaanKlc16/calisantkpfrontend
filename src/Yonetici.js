import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const YoneticiIndex = () => {
  const [kullaniciAd, setKullaniciAd] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedKullaniciAd = sessionStorage.getItem('kullaniciAd');
    if (storedKullaniciAd) {
      setKullaniciAd(storedKullaniciAd);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('kullaniciAd'); 
    navigate('/'); 
  };

  return (
    <div className="min-h-screen bg-blue-100 p-4">
  
      <nav className="bg-blue-600 w-full p-4 shadow-md">
        <ul className="flex justify-between items-center">
          <li className="text-white text-2xl font-bold">
            <Link to="/">Yönetici Görev Takip</Link>
          </li>
          <li className="space-x-4">
            <Link to="/Yonetici/Takip" className="text-white hover:bg-blue-500 px-3 py-2 rounded transition">Takip Et</Link> 
            <Link to="/Yonetici/Ata" className="text-white hover:bg-blue-500 px-3 py-2 rounded transition">Görev Ata</Link> 
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
              Çıkış Yap
            </button>
          </li>
        </ul>
      </nav>

      <h1 className="text-2xl font-bold mb-2">Hoşgeldiniz, {kullaniciAd}!</h1>
      <p className="mb-4">Bu yönetici paneli sayfasıdır.</p>


      <div className="bg-blue-200 p-8 text-center rounded-lg shadow-lg mb-6 transition-transform transform hover:scale-105">
        <Link to="/Yonetici/Ata" className="block">
          <h2 className="text-3xl font-bold mb-4">Görevlerinizi Kolayca Yönetin</h2>
          <p className="text-lg text-gray-700 mb-6">
            Yönetici paneliniz üzerinden çalışanlarınıza görev atayabilir ve ilerlemeyi takip edebilirsiniz. 
            Hedeflerinize ulaşmak için ihtiyacınız olan her şey burada!
          </p>
          <span className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
            Görev Ata
          </span>
      
          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-2">Neden Görev Yönetimi?</h3>
            <p className="text-gray-600 mb-4">
              Görevlerinizi etkin bir şekilde yönetmek, ekip içinde sorumluluk dağılımını kolaylaştırır.
            </p>
            <p className="text-gray-600">
              Ayrıca, zamanında yapılan görevler, projelerin başarıyla tamamlanmasını sağlar.
            </p>
          </div>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4">Ekstra Bilgiler</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Görevlerinizi zamanında tamamlayarak ekip verimliliğinizi artırabilirsiniz.</li>
          <li>Çalışanlarınızın performansını düzenli olarak takip edin.</li>
          <li>Hedeflerinizi belirleyin ve bunlara ulaşmak için stratejiler geliştirin.</li>
        </ul>
        <p className="text-gray-600">Herhangi bir sorunuz varsa, lütfen destek ekibimizle iletişime geçin.</p>
      </div>

      <footer className="text-center mt-8 mb-4 text-gray-600">
        <p>Tüm hakları saklıdır. © 2024 Görev Takip</p>
      </footer>
    </div>
  );
};

export default YoneticiIndex;
