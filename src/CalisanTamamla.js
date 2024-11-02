import React, { useState, useEffect } from "react";
import axios from "axios";
import { YoneticiService } from "./services";
import { Link } from "react-router-dom"; 

const CalisanTamamla = () => {
  const [personelTasks, setPersonelTasks] = useState([]);
  const [kullaniciAd, setKullaniciAd] = useState('');
  const [comments, setComments] = useState({}); 
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const personelId = sessionStorage.getItem("personelId");
    const storedKullaniciAd = sessionStorage.getItem('kullaniciAd');
    setKullaniciAd(storedKullaniciAd); 

    if (personelId) {
      YoneticiService.CalisanIsleriniGetir(personelId)
        .then(response => {
          setPersonelTasks(response);
        });
    }
  }, []);

  const handleCommentChange = (isId, comment) => {
    setComments(prevComments => ({ ...prevComments, [isId]: comment }));
  };
 
  const handleCompleteTask = (isId) => {
    const comment = comments[isId] || ""; 

    let veri ={
        isId : isId,
        isYorum:"deneme"
    };
  console.log(veri);

      YoneticiService.GorevDurumuDegistir(veri)
      .then(response => {
        if (response.Sonuc) {
          setPersonelTasks(prevTasks => prevTasks.filter(task => task.isId !== isId));
          alert("Görev başarıyla tamamlandı!");
        } else {
          alert("Görev tamamlanırken bir hata oluştu.");
        }
      })
      .catch(error => console.error("Görev tamamlama hatası:", error));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-green-400 to-blue-500 p-6 flex flex-col items-center">
      <nav className="flex items-center justify-between bg-gray-800 p-4 mb-6 rounded-lg shadow-md w-full max-w-3xl">
        <div className="text-white font-bold text-xl">Çalışan Görev Tamamlama</div>
        <div>
          <Link to="/Calisan/Index" className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mr-2 transition">
            Görev Takip
          </Link>
        </div>
      </nav>

      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">{kullaniciAd} Görevleri!</h1>
        <p className="text-gray-600 mb-8">Tamamlanması gereken görevleriniz aşağıda listelenmiştir.</p>
      </div>

      <div className="w-full max-w-3xl mt-6">
        <h4 className="text-2xl font-semibold text-white mb-4">Görevleriniz</h4>
        {personelTasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {personelTasks.map((task) => (
              <div key={task.isId} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                <h5 className="text-xl font-bold text-blue-700 mb-2">{task.isBaslik}</h5>
                <p className="text-gray-700 mb-2">{task.isAciklama}</p>
                <p className="text-sm text-gray-500">Başlangıç: {task.isBaslangicString}</p>
                <p className="text-sm text-gray-500 mb-4">Bitiş: {task.isBitirmeString}</p>

                <input
                  type="text"
                  placeholder="Yorum ekleyin..."
                  value={comments[task.isId] || ""}
                  onChange={(e) => handleCommentChange(task.isId, e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-lg mb-4"
                />
                
                //tamamla butonuna basınca modal açılsın yorum yazıp modalla güncelle 

                <button
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
                  onClick={() => handleCompleteTask(task.isId)}
                >
                  Tamamla
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-white text-center text-lg">Henüz tamamlanacak bir göreviniz bulunmamaktadır.</p>
        )}
      </div>
    </div>
  );
};

export default CalisanTamamla;
