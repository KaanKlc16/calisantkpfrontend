import React, { useState, useEffect } from "react";
import axios from "axios";
import { LoginService, YoneticiService } from "./services";

const YoneticiTakip = () => {
  const [calisanlar, setCalisanlar] = useState([]);
  const [selectedPersonel, setSelectedPersonel] = useState(null);
  const [personelTasks, setPersonelTasks] = useState([]);
  axios.defaults.withCredentials = true;

 
  useEffect(() => {
    const personelId = sessionStorage.getItem("personelId");

    console.log("Personel ID:", personelId);

    LoginService.YoneticininPersonelleriGetir(personelId)
      .then(response => {
        setCalisanlar(response);
      });

  }, []);

  const handlePersonelSelect = (personelId) => {
    setSelectedPersonel(personelId);
    
    YoneticiService.CalisanIsleriniGetir(personelId)
      .then(response => {
        setPersonelTasks(response);
      });
  };

 
  const handleAnaSayfaGit = () => {
    window.history.back(); 
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">Yönetici Takip Sayfası</h3>
      <button
        onClick={handleAnaSayfaGit}
        className="mb-4 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
      >
        Ana Sayfa
      </button>
      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-2">Çalışanlar</h4>
        <ul className="border border-gray-300 rounded-md shadow-md">
          {calisanlar.map((personel) => (
            <li 
              key={personel.personelId} 
              onClick={() => handlePersonelSelect(personel.personelId)} 
              className="cursor-pointer p-3 hover:bg-gray-100 transition duration-200"
            >
              {personel.personelAdSoyad}
            </li>
          ))}
        </ul>
      </div>

      {selectedPersonel && (
        <div>
          <h4 className="text-xl font-semibold mb-2">Seçilen Personelin Görevleri</h4>
          {personelTasks.length > 0 ? (
            <ul className="border border-gray-300 rounded-md shadow-md">
              {personelTasks.map((task) => (
                <li key={task.isId} className="p-4 border-b border-gray-200 last:border-b-0">
                  <h5 className="font-bold text-lg">{task.isBaslik}</h5>
                  <p className="text-gray-700">{task.isAciklama}</p>
                  <p className="text-sm text-gray-500">Başlangıç: {task.isBaslangicString}</p>
                  <p className="text-sm text-gray-500">Bitiş: {task.isBitirmeSure}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-600">Bu personelin henüz atanmış görevi yok.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default YoneticiTakip;
