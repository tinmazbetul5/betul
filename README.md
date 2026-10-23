# Cümlenin Ögeleri — İnteraktif 3D Öğrenme Macerası (LGS)

8. sınıf Türkçe LGS "Cümlenin Ögeleri" konusunu 3 farklı mekanda (Antik Kütüphane, Bilim Laboratuvarı, Uzay İstasyonu) 15 MEB çıkmış sorusuyla öğreten rekabetçi ve eğitsel 3D web oyunu.

## Özellikler

- **3 Tematik Mekan:** 
  - 1. Aşama (Sorular 1–5): Antik Büyülü Kütüphane
  - 2. Aşama (Sorular 6–10): Bilim Laboratuvarı
  - 3. Aşama (Sorular 11–15): Uzay Kontrol İstasyonu
- **Rehber Karakter (Aylin):** Claymorphism 3D hacimli, hakem düdüğü çalan ve doğru/yanlış dönütleri veren sevimli karakter.
- **Web Audio API:** Harici ses dosyası gerektirmeyen, tarayıcıda doğrudan sentezlenen çift tonlu hakem düdüğü ve neşeli zafer sesleri.
- **Dairesel 60sn Sayaç:** `Date.now()` tabanlı yüksek hassasiyetli geri sayım.
- **Kutlama Konfetisi:** Oyun bitiminde hafif ve performanslı CSS konfeti efekti.
- **Tek Dosya Dışa Aktarma:** "HTML İndir" butonuyla internet gerektirmeyen tek bir `.html` dosyası olarak çalışma.

## Kurulum ve Çalıştırma

Projeyi bilgisayarınızda çalıştırmak için:

```bash
# 1. Bağımlılıkları yükleyin
npm install

# 2. Geliştirme sunucusunu başlatın
npm run dev

# 3. Canlı üretim derlemesi (Build) almak için
npm run build
```

## GitHub ve GitHub Pages Dağıtımı

Proje `vite.config.ts` dosyasında `base: './'` olarak yapılandırılmıştır. GitHub Pages veya herhangi bir alt dizinde (subdirectory) 404 hatası almadan sorunsuz çalışır.
