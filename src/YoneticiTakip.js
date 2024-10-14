import React, { useState, useEffect } from "react";
import axios from "axios";

const YoneticiTakip = () => {
  const [calisanlar, setCalisanlar] = useState([]);
  const [selectedPersonel, setSelectedPersonel] = useState(null);
  const [personelTasks, setPersonelTasks] = useState([]);
  axios.defaults.withCredentials = true;

  // Çalışanları çekme
  useEffect(() => {
    // Kullanıcı bilgilerini sessionStorage'dan alma
    const kullaniciAd = sessionStorage.getItem("kullaniciAd");
    const personelAdSoyad = sessionStorage.getItem("personelAdSoyad");
    const personelId = sessionStorage.getItem("personelId");
    const personelBirimId = sessionStorage.getItem("personelBirimId");
    const personelYetkiTurId = sessionStorage.getItem("personelYetkiTurId");

    // Kullanıcı bilgilerini konsolda gösterme
    console.log("Kullanıcı Adı:", kullaniciAd);
    console.log("Personel Ad Soyad:", personelAdSoyad);
    console.log("Personel ID:", personelId);
    console.log("Birim ID:", personelBirimId);
    console.log("Yetki Tür ID:", personelYetkiTurId);

    axios
      .get("https://localhost:7108/api/Yonetici/takip", { withCredentials: true }) // Takip endpoint'i
      .then((response) => {
        setCalisanlar(response.data.Personeller);
      })
      .catch((error) => {
        console.error("Çalışanlar yüklenirken hata oluştu:", error);
      });
  }, []);

  // Seçilen personelin görevlerini listeleme
  const handlePersonelSelect = (personelId) => {
    setSelectedPersonel(personelId);

    axios
      .get(`https://localhost:7108/api/Yonetici/listele`, { withCredentials: true }) // Listele endpoint'i
      .then((response) => {
        setPersonelTasks(response.data.Isler);
      })
      .catch((error) => {
        console.error("Görevler yüklenirken hata oluştu:", error);
      });
  };

  return (
    <div>
      <h3>Yönetici Takip Sayfası</h3>

      <div>
        <h4>Çalışanlar</h4>
        <ul>
          {calisanlar.map((personel) => (
            <li key={personel.PersonelId} onClick={() => handlePersonelSelect(personel.PersonelId)}>
              {personel.PersonelAdSoyad}
            </li>
          ))}
        </ul>
      </div>

      {selectedPersonel && (
        <div>
          <h4>Seçilen Personelin Görevleri</h4>
          {personelTasks.length > 0 ? (
            <ul>
              {personelTasks.map((task) => (
                <li key={task.IsId}>
                  <h5>{task.IsBaslik}</h5>
                  <p>{task.IsAciklama}</p>
                  <p>Başlangıç: {task.IsBaslangic}</p>
                  <p>Bitiş: {task.IsBitirmeSure}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Bu personelin henüz atanmış görevi yok.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default YoneticiTakip;
