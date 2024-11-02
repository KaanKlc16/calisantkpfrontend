import { get,post, postJSON } from './request';
/* */
export const IsEkle = (veri) => postJSON(`https://localhost:44331/Yonetici/IsEkle`,veri)
export const CalisanIsleriniGetir = (personelid) => get(`https://localhost:44331/Yonetici/CalisanIsleriniGetir?PersonelId=${personelid}`)
export const GorevDurumuDegistir = (veri) => postJSON(`https://localhost:44331/Calisan/GorevDurumDegistir`,veri)