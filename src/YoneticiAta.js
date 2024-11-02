import React, { useState } from 'react';
import { YoneticiService } from './services'; 

const YoneticiAta = () => {
    const [formData, setFormData] = useState({
        isBaslik: '',
        isAciklama: '',
        isPersonelId: 0,
        isBaslangic: '',
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData); 
    
        try {
            const response = await YoneticiService.IsEkle(formData);
            console.log(response);
            setResult(response);
        } catch (error) {
            console.error('Görev eklenirken hata:', error);
            setResult({ Sonuc: false, SonucAciklama: 'Görev eklenirken bir hata oluştu.' });
        }
    };
    
    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-center">Görev Ekle</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="isBaslik">Görev Başlığı</label>
                    <input type="text" id="isBaslik" name="isBaslik" placeholder="Görev Başlığı" 
                        onChange={handleChange} required 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="isAciklama">Görev Açıklaması</label>
                    <textarea id="isAciklama" name="isAciklama" placeholder="Görev Açıklaması" 
                        onChange={handleChange} required 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="isPersonelId">Personel ID</label>
                    <input type="number" id="isPersonelId" name="isPersonelId" placeholder="Personel ID" 
                        onChange={handleChange} required 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="isBaslangic">Başlangıç Tarihi</label>
                    <input type="date" id="isBaslangic" name="isBaslangic" 
                        onChange={handleChange} required 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300" />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-300">Görevi Ekle</button>
            </form>

            {result && (
                <div className="mt-4">
                    <h3 className={`text-lg font-semibold ${result.Sonuc ? 'text-green-600' : 'text-red-600'}`}>{result.Sonuc ? 'Başarılı' : 'Başarısız'}</h3>
                    <p>{result.SonucAciklama}</p>
                </div>
            )}
        </div>
    );
};

export default YoneticiAta;
