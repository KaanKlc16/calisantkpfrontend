import { get,postJSON } from './request';
/* */
export const YoneticiIcinTakiptekiler = () => get(`https://localhost:7108/api/Yonetici/takip`)
export const YoneticiIcinTakiptekiler2 = (yid,bid) => get(`https://localhost:7108/api/Yonetici/takip2?yid=${yid}&bid=${bid}`)

export const SecilenPersonelGorevlerGetir = (yetkiid,personelid) => get(`https://localhost:7108/api/Yonetici/Listele2?yetkiId=${yetkiid}&personelId=${personelid}`)