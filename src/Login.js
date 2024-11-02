import React, { useState } from 'react';
import axios from 'axios';
import { LoginService } from './services';

const Login = () => {
  const [kullaniciAd, setKullaniciAd] = useState('');
  const [parola, setParola] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin2 = () => {
    let veri = {
      KullaniciAd: kullaniciAd,
      Parola: parola
    };
    
    LoginService.KullaniciGiris(veri)
      .then(response => {
        if (response.Sonuc.Sonuc) {
          sessionStorage.setItem('kullaniciAd', response.Personel.personelKullaniciAd);
          sessionStorage.setItem('personelAdSoyad', response.Personel.personelAdSoyad || '');
          sessionStorage.setItem('personelId', response.Personel.personelId || '');
          sessionStorage.setItem('personelBirimId', response.Personel.personelBirimId || '');
          sessionStorage.setItem('personelYetkiTurId', response.Personel.personelYetkiTurId || '');

          window.location.href = response.Url;
        } else {
          setErrorMessage(response.Sonuc.SonucAciklama);
        }
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7108/api/login/login', {
        kullaniciAd,
        parola
      });

      if (response.data.redirectUrl) {
        sessionStorage.setItem('kullaniciAd', kullaniciAd);
        sessionStorage.setItem('personelAdSoyad', response.data.personelAdSoyad || '');
        sessionStorage.setItem('personelId', response.data.personelId || '');
        sessionStorage.setItem('personelBirimId', response.data.personelBirimId || '');
        sessionStorage.setItem('personelYetkiTurId', response.data.personelYetkiTurId || '');

        window.location.href = response.data.redirectUrl;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Görev Takip Sistemi</h2>
        <p className="text-center text-gray-600 mb-4">Hesabınıza giriş yapın</p>
        
        <input
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Kullanıcı Adı"
          value={kullaniciAd}
          onChange={(e) => setKullaniciAd(e.target.value)}
          required
        />
        <input
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:border-blue-500"
          type="password"
          placeholder="Parola"
          value={parola}
          onChange={(e) => setParola(e.target.value)}
          required
        />
        
        <button
          className="bg-blue-600 text-white w-full py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
          onClick={handleLogin2}
          type="button"
        >
          Giriş Yap
        </button>

        {errorMessage && <p className="mt-4 text-center text-red-600 font-medium">{errorMessage}</p>}
        
        <p className="text-center text-gray-500 mt-6 text-sm">
          Şifrenizi mi unuttunuz? <a href="#" className="text-blue-600 hover:underline">Yardım Alın</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
