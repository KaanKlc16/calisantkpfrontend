import { get,post, postJSON } from './request';
/* */
export const IsEkle = (veri) => postJSON(`https://localhost:44331/Yonetici/IsEkle`,veri)
export const CalisanIsleriniGetir = (personelid) => get(`https://localhost:44331/Yonetici/CalisanIsleriniGetir?PersonelId=${personelid}`)
export const Tamamla = (isId) => postJSON(`https://localhost:44331/Calisan/Tamamla`, { isId });//deneme