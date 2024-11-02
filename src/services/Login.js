import { get,post, postJSON } from './request';
/* */
export const KullaniciGiris = (veri) => postJSON(`https://localhost:44331/Login/KullaniciGiris`,veri)
export const YoneticininPersonelleriGetir = (personelid) => get(`https://localhost:44331/Login/YoneticininPersonelleriGetir?PersonelId=${personelid}`)