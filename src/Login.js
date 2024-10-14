import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [kullaniciAd, setKullaniciAd] = useState('');
  const [parola, setParola] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7108/api/login/login', {
        kullaniciAd,
        parola
      });

      // Giriş başarılı ise session'da kullanıcı adını saklayın
      if (response.data.redirectUrl) {
        sessionStorage.setItem('kullaniciAd', kullaniciAd); // Kullanıcı adını session'a kaydediyoruz
        sessionStorage.setItem('personelAdSoyad', response.data.personelAdSoyad || ''); // Personel ad soyadını kaydediyoruz
        sessionStorage.setItem('personelId', response.data.personelId || ''); // Personel ID'sini kaydediyoruz
        sessionStorage.setItem('personelBirimId', response.data.personelBirimId || ''); // Personel Birim ID'sini kaydediyoruz
        sessionStorage.setItem('personelYetkiTurId', response.data.personelYetkiTurId || ''); // Personel Yetki Tür ID'sini kaydediyoruz

        window.location.href = response.data.redirectUrl; // Yönlendirme
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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={kullaniciAd}
          onChange={(e) => setKullaniciAd(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Parola"
          value={parola}
          onChange={(e) => setParola(e.target.value)}
          required
        />
        <button type="submit">Giriş Yap</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
