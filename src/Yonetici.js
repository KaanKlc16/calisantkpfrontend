import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const YoneticiIndex = () => {
  const [kullaniciAd, setKullaniciAd] = useState('');
  const navigate = useNavigate(); // Yönlendirme için useNavigate kullanılıyor

  useEffect(() => {
    // Sayfa yüklendiğinde session'dan kullanıcı adını alıyoruz
    const storedKullaniciAd = sessionStorage.getItem('kullaniciAd');
    if (storedKullaniciAd) {
      setKullaniciAd(storedKullaniciAd);
    } else {
      // Eğer kullanıcı adı yoksa, login sayfasına yönlendirin
      navigate('/login');
    }
  }, [navigate]);

  // Oturum kapatma işlemi
  const handleLogout = () => {
    sessionStorage.removeItem('kullaniciAd'); // Session'dan kullanıcı bilgisini temizle
    navigate('/'); // Login sayfasına yönlendir
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <ul style={styles.navList}>
          <li>
            <Link to="/Yonetici/Takip" style={styles.navLink}>Takip Et</Link> {/* Takip sayfasına yönlendirme */}
          </li>
          <li>
            <button onClick={handleLogout} style={styles.logoutButton}>Çıkış Yap</button>
          </li>
        </ul>
      </nav>

      <h1>Hoşgeldiniz, {kullaniciAd}!</h1>
      <p>Bu yönetici paneli sayfasıdır.</p>
    </div>
  );
};

// Basit stil objeleri
const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0,
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    fontSize: '16px',
    cursor: 'pointer',
  }
};

export default YoneticiIndex;
