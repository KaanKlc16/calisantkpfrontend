import React, { useState, useEffect } from "react";
import axios from "axios";
import { YoneticiService } from "./services";
import { Link } from 'react-router-dom';

const Calisan = () => {
  const [personelTasks, setPersonelTasks] = useState([]);
  const [kullaniciAd, setKullaniciAd] = useState('');
  axios.defaults.withCredentials = true;

 

  useEffect(() => {
    const personelId = sessionStorage.getItem("personelId");
    const storedKullaniciAd = sessionStorage.getItem('kullaniciAd');
    setKullaniciAd(storedKullaniciAd); 

    console.log("Personel ID:", personelId);

    if (personelId) {
      YoneticiService.CalisanIsleriniGetir(personelId) 
        .then(response => {
          setPersonelTasks(response);
        });
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-blue-50 p-4">
    <nav className="flex items-center justify-between bg-gray-800 p-4 mb-6 rounded-lg shadow-md">
      <div className="text-white font-bold text-xl">
        Çalışan Görev Takip
      </div>
      <div>
        <Link to="/Calisan/Tamamla" className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mr-2 transition">
          Görev Tamamla
        </Link>
        <Link to="/" className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mr-2 transition">
          Çıkış
        </Link>
        
      </div>
    </nav>

     
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold mb-2">Hoşgeldiniz, {kullaniciAd}!</h1>
        <p className="text-gray-600 mb-4">Aşağıda atanmış görevlerinizi bulabilirsiniz.</p>
      </div>

    
      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-2">Görevleriniz</h4>
        {personelTasks.length > 0 ? (
          <ul className="border-2 border-gray-300 rounded-md shadow-md">
            {personelTasks.map((task) => (
              <li key={task.isId} className="p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-100 transition mb-2"> {/* Boşluk için mb-2 eklendi */}
                <h5 className="font-bold text-lg">{task.isBaslik}</h5>
                <p className="text-gray-700">{task.isAciklama}</p>
                <p className="text-sm text-gray-500">Başlangıç: {task.isBaslangicString}</p>
                <p className="text-sm text-gray-500">Bitiş: {task.isBitirmeString}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-gray-600">Bu personelin henüz atanmış görevi yok.</p>
        )}
      </div>
    </div>
  );
};

export default Calisan;
