export interface MEBQuestion {
  id: number;
  stageIndex: 0 | 1 | 2; // 0: Kütüphane, 1: Laboratuvar, 2: Uzay İstasyonu
  groupName: string;
  stageName: string;
  stageTheme: 'library' | 'lab' | 'space';
  questionText: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export const STAGES = [
  {
    index: 0,
    name: "Unutulmuş Antik Kütüphane",
    group: "1. Grup (Kütüphane Muhafızları)",
    theme: "library" as const,
    color: "#f59e0b",
    tagline: "Antik parşömenlerin tozlu odalarında ilk 5 sorunun şifresini çöz!",
  },
  {
    index: 1,
    name: "Gizli Bilim Laboratuvarı",
    group: "2. Grup (Simya Kaşifleri)",
    theme: "lab" as const,
    color: "#06b6d4",
    tagline: "Fokurdayan tüpler arasında 6-10. soruları yanıtlayarak reaktörü durdur!",
  },
  {
    index: 2,
    name: "Uzay Kontrol İstasyonu",
    group: "3. Grup (Yıldız Öncüleri)",
    theme: "space" as const,
    color: "#a855f7",
    tagline: "Yörüngedeki istasyonda 11-15. soruları çözerek Dünya'ya güvenli dönüş yap!",
  }
];

export const MEB_QUESTIONS: MEBQuestion[] = [
  // --- 1. AŞAMA: UNUTULMUŞ ANTİK KÜTÜPHANE (Sorular 1-5) ---
  {
    id: 1,
    stageIndex: 0,
    groupName: "1. Grup",
    stageName: "Unutulmuş Antik Kütüphane",
    stageTheme: "library",
    questionText: "Aşağıdaki cümlelerin hangisi sadece özne ve yüklemden oluşmuştur?",
    options: [
      { key: "A", text: "Sakız ağaçları, doğanın insana sunduğu en lezzetli armağanlardan biridir." },
      { key: "B", text: "Hava iyice kararınca yıldızlar fenerimiz oluyordu." },
      { key: "C", text: "Karadeniz'in batı kıyıcığında cana yakın bir memleket vardır." },
      { key: "D", text: "Yemyeşil yosunların üzerinden akan su, güzel görüntüler sunuyor." }
    ],
    correctAnswer: "A",
    explanation: "'Doğanın insana sunduğu en lezzetli armağanlardan biridir' tamlama olduğu için bölünemez yüklemdir. 'Sakız ağaçları' ise öznedir (Özne + Yüklem)."
  },
  {
    id: 2,
    stageIndex: 0,
    groupName: "1. Grup",
    stageName: "Unutulmuş Antik Kütüphane",
    stageTheme: "library",
    questionText: "Yazar, doğup büyüdüğü coğrafyada yaşananları canlı bir atmosfer içinde anlatmış. Bu cümlenin öge dizilişi hangisidir?",
    options: [
      { key: "A", text: "Özne - Yer tamlayıcısı - Zarf tamlayıcısı - Yüklem" },
      { key: "B", text: "Özne - Nesne - Zarf tamlayıcısı - Yüklem" },
      { key: "C", text: "Nesne - Zarf tamlayıcısı - Yer tamlayıcısı - Yüklem" },
      { key: "D", text: "Yer tamlayıcısı - Nesne - Yer tamlayıcısı - Yüklem" }
    ],
    correctAnswer: "B",
    explanation: "Anlatmış (Yüklem), Yazar (Özne), doğup büyüdüğü coğrafyada yaşananları (Belirtili Nesne), canlı bir atmosfer içinde (Zarf tamlayıcısı)."
  },
  {
    id: 3,
    stageIndex: 0,
    groupName: "1. Grup",
    stageName: "Unutulmuş Antik Kütüphane",
    stageTheme: "library",
    questionText: "Bereketli sofralar sunardı bize yıldızı bol gökler. Bu dizede aşağıdaki ögelerden hangisi yoktur?",
    options: [
      { key: "A", text: "Zarf tamlayıcısı" },
      { key: "B", text: "Belirtisiz nesne" },
      { key: "C", text: "Özne" },
      { key: "D", text: "Yer tamlayıcısı" }
    ],
    correctAnswer: "A",
    explanation: "Sunardı (Yüklem), yıldızı bol gökler (Özne), bize (Yer tamlayıcısı), bereketli sofralar (Belirtisiz nesne). Zarf tamlayıcısı bulunmamaktadır."
  },
  {
    id: 4,
    stageIndex: 0,
    groupName: "1. Grup",
    stageName: "Unutulmuş Antik Kütüphane",
    stageTheme: "library",
    questionText: "Aşağıdaki cümlelerin hangisi ögelerine yanlış ayrılmıştır?",
    options: [
      { key: "A", text: "Gri, parlak elbisesi / akşam vakti / kızılımsı / görünüyordu." },
      { key: "B", text: "Okuduğum kitapların birinde / sevmek / sözcüğünün altının çizildiğini / gördüm." },
      { key: "C", text: "Koridora girdiğimde / beni / sevimli bir hasta bakıcı / karşıladı." },
      { key: "D", text: "Antalyada başlayan fuar / şehrin görüntüsünü / iyiden iyiye / değiştirdi." }
    ],
    correctAnswer: "B",
    explanation: "'sevmek sözcüğünün altının çizildiğini' tek bir tamlama öbeğidir, ayrılamaz. Doğru ayrım: 'sevmek sözcüğünün altının çizildiğini / gördüm' şeklinde tek nesne olmalıydı."
  },
  {
    id: 5,
    stageIndex: 0,
    groupName: "1. Grup",
    stageName: "Unutulmuş Antik Kütüphane",
    stageTheme: "library",
    questionText: "Başlamakta olan yeni günün soluk ışığı panjurların dar aralıklarından şerit şerit içeri süzülüp karşı duvarda titreşiyordu. Bu cümlede hangisi yoktur?",
    options: [
      { key: "A", text: "Yer tamlayıcısı" },
      { key: "B", text: "Zarf tamlayıcısı" },
      { key: "C", text: "Belirtisiz nesne" },
      { key: "D", text: "Özne" }
    ],
    correctAnswer: "C",
    explanation: "Başlamakta olan yeni günün soluk ışığı (Özne), panjurların dar aralıklarından (Yer tamlayıcısı), şerit şerit içeri süzülüp (Zarf tamlayıcısı), karşı duvarda (Yer tamlayıcısı), titreşiyordu (Yüklem). Cümlede belirtisiz nesne yoktur."
  },

  // --- 2. AŞAMA: GİZLİ BİLİM LABORATUVARI (Sorular 6-10) ---
  {
    id: 6,
    stageIndex: 1,
    groupName: "2. Grup",
    stageName: "Gizli Bilim Laboratuvarı",
    stageTheme: "lab",
    questionText: "Aşağıdaki cümlelerden hangisi yalnızca özne ve yüklemden oluşmaktadır?",
    options: [
      { key: "A", text: "Vitrinde güzel oyuncaklar vardı." },
      { key: "B", text: "Bu kadar çabalaması herkesi şaşırtmıştı." },
      { key: "C", text: "Yaşamdan beklentisi her geçen gün artmıştı." },
      { key: "D", text: "Bilgi, insanoğlunun en büyük ihtiyaçlarındandır." }
    ],
    correctAnswer: "D",
    explanation: "'İnsanoğlunun en büyük ihtiyaçlarındandır' ek fiil almış tamlama grubudur (Yüklem). 'Bilgi' ise öznedir (Özne + Yüklem)."
  },
  {
    id: 7,
    stageIndex: 1,
    groupName: "2. Grup",
    stageName: "Gizli Bilim Laboratuvarı",
    stageTheme: "lab",
    questionText: "Aşağıdaki cümlelerden hangisi yalnızca özne ve yüklemden oluşmaktadır?",
    options: [
      { key: "A", text: "Beyefendi içini çekerek bir sıraya oturdu." },
      { key: "B", text: "Tombul, mavimtırak bir güvercin hızla yola indi." },
      { key: "C", text: "Altmış yaşlarındaki zayıf ve esmer adam geldi." },
      { key: "D", text: "Akşam yemeğinden hemen sonra herkes dağıldı." }
    ],
    correctAnswer: "C",
    explanation: "Geldi (Yüklem), 'Altmış yaşlarındaki zayıf ve esmer adam' sıfat tamlamasıdır, bölünemez (Özne). Sadece Özne ve Yüklemden oluşmuştur."
  },
  {
    id: 8,
    stageIndex: 1,
    groupName: "2. Grup",
    stageName: "Gizli Bilim Laboratuvarı",
    stageTheme: "lab",
    questionText: "Yakın arkadaşım ... köşe yazarlığı yaptı. Bu cümlede üç nokta ile belirtilen yere hangisi getirilirse cümle yer tamlayıcısı kazanır?",
    options: [
      { key: "A", text: "gençlik yıllarında" },
      { key: "B", text: "geçen sene" },
      { key: "C", text: "başarıyla" },
      { key: "D", text: "bir dergide" }
    ],
    correctAnswer: "D",
    explanation: "'Bir dergide' sözcüğü nerede yapıldığını belirten bulunma hâl eki (-de) almıştır ve Yer Tamlayıcısıdır. (A ve B: Zarf tümleci, C: Durum zarfı)."
  },
  {
    id: 9,
    stageIndex: 1,
    groupName: "2. Grup",
    stageName: "Gizli Bilim Laboratuvarı",
    stageTheme: "lab",
    questionText: "\"Hızlı adımlarla işe gidenler, fabrikanın önünde biraz dinlenirlerdi.\" cümlesinin öznesi hangisidir?",
    options: [
      { key: "A", text: "Gidenler" },
      { key: "B", text: "Adımlarla işe gidenler" },
      { key: "C", text: "İşe gidenler" },
      { key: "D", text: "Hızlı adımlarla işe gidenler" }
    ],
    correctAnswer: "D",
    explanation: "Dinlenirlerdi (Yüklem). 'Dinlenen kim?' sorusunun cevabı sıfat-fiil grubuyla birbirine bağlı olan 'Hızlı adımlarla işe gidenler'dir."
  },
  {
    id: 10,
    stageIndex: 1,
    groupName: "2. Grup",
    stageName: "Gizli Bilim Laboratuvarı",
    stageTheme: "lab",
    questionText: "Eserini tamamlamak için ne kadar çabaladığını şimdi herkes biliyordu. Bu cümlede hangisi yoktur?",
    options: [
      { key: "A", text: "Özne" },
      { key: "B", text: "Zarf tamlayıcısı" },
      { key: "C", text: "Belirtili nesne" },
      { key: "D", text: "Yer tamlayıcısı" }
    ],
    correctAnswer: "D",
    explanation: "Biliyordu (Yüklem), herkes (Özne), şimdi (Zarf tamlayıcısı), eserini tamamlamak için ne kadar çabaladığını (Belirtili Nesne). Yer tamlayıcısı yoktur."
  },

  // --- 3. AŞAMA: UZAY KONTROL İSTASYONU (Sorular 11-15) ---
  {
    id: 11,
    stageIndex: 2,
    groupName: "3. Grup",
    stageName: "Uzay Kontrol İstasyonu",
    stageTheme: "space",
    questionText: "Aşağıdaki sıralı cümlelerin hangisinde özne, ortak öge olarak kullanılmamıştır?",
    options: [
      { key: "A", text: "Yanında getirdiği şiir kitabını çıkardı, okumaya başladı." },
      { key: "B", text: "Köşede oturan ihtiyar gazetesini bıraktı, söze karıştı." },
      { key: "C", text: "Yayladan inmiş, ovanın enginliğinde yol almaya başlamıştı." },
      { key: "D", text: "Kar kalkmış, hava açmış, ayaz gevşemişti." }
    ],
    correctAnswer: "D",
    explanation: "Kar kalkmış (Özne: Kar), hava açmış (Özne: Hava), ayaz gevşemişti (Özne: Ayaz). Her cümlenin öznesi ayrıdır, ortak değildir."
  },
  {
    id: 12,
    stageIndex: 2,
    groupName: "3. Grup",
    stageName: "Uzay Kontrol İstasyonu",
    stageTheme: "space",
    questionText: "\"Gökyüzüne bakan biri, Güneş'i yaklaşık altı milyar yıl sonra, çok daha farklı görecek.\" cümlenin ögelerinin sıralanışı hangisidir?",
    options: [
      { key: "A", text: "Nesne - özne - zarf tamlayıcısı - yüklem" },
      { key: "B", text: "Özne - nesne - zarf tamlayıcısı - yer tamlayıcısı - yüklem" },
      { key: "C", text: "Nesne - zarf tamlayıcısı - yüklem" },
      { key: "D", text: "Özne - nesne - zarf tamlayıcısı - zarf tamlayıcısı - yüklem" }
    ],
    correctAnswer: "D",
    explanation: "Görecek (Yüklem), Gökyüzüne bakan biri (Özne), Güneş'i (Belirtili Nesne), yaklaşık altı milyar yıl sonra (Zarf tamlayıcısı), çok daha farklı (Zarf tamlayıcısı)."
  },
  {
    id: 13,
    stageIndex: 2,
    groupName: "3. Grup",
    stageName: "Uzay Kontrol İstasyonu",
    stageTheme: "space",
    questionText: "Bir gün adanın sahiline gıda yüklü bir tekne demirlendi. Bu cümlenin öge dizilişi hangisidir?",
    options: [
      { key: "A", text: "Zarf tamlayıcısı / Yer tamlayıcısı / Özne / Yüklem" },
      { key: "B", text: "Yer tamlayıcısı / Zarf tamlayıcısı / Belirtili nesne / Yüklem" },
      { key: "C", text: "Özne / Yer tamlayıcısı / Belirtisiz nesne / Yüklem" },
      { key: "D", text: "Yer tamlayıcısı / Özne / Yüklem" }
    ],
    correctAnswer: "A",
    explanation: "Demirlendi (Yüklem), Bir gün (Zarf tamlayıcısı), adanın sahiline (Yer tamlayıcısı), gıda yüklü bir tekne (Sözde Özne)."
  },
  {
    id: 14,
    stageIndex: 2,
    groupName: "3. Grup",
    stageName: "Uzay Kontrol İstasyonu",
    stageTheme: "space",
    questionText: "Aşağıdaki cümlelerden hangisi sadece özne ve yüklemden oluşmuştur?",
    options: [
      { key: "A", text: "Başını iki yana sallayarak biraz bekledi." },
      { key: "B", text: "Güneşin gözüme girmeyeceği bir köşeye kaçtım." },
      { key: "C", text: "İki çocuk, köyün dışındaki zeytinlikler arasına daldı." },
      { key: "D", text: "Otelin kırmızı kadifeli küçücük salonu dopdoluydu." }
    ],
    correctAnswer: "D",
    explanation: "Dopdoluydu (Yüklem), 'Otelin kırmızı kadifeli küçücük salonu' tamlama öbeğidir, bölünemez (Özne). Sadece Özne ve Yüklemden oluşmuştur."
  },
  {
    id: 15,
    stageIndex: 2,
    groupName: "3. Grup",
    stageName: "Uzay Kontrol İstasyonu",
    stageTheme: "space",
    questionText: "Sissiz bir gecede gökyüzünde ay ve yıldızın cümbüşü vardı. Aşağıdakilerden hangisi bu cümlenin öge dizilişiyle aynıdır?",
    options: [
      { key: "A", text: "Arslan Bey güçlü, kuvvetli, atılgan ve korkusuzdur." },
      { key: "B", text: "Hasat bittiğinde çiftçiler büyük bir mutluluk yaşadı." },
      { key: "C", text: "Duygularını hiçbir zaman çevresindekilere belli etmezdi." },
      { key: "D", text: "Bir yaz günü yaylada iki eski dost karşılaşmış." }
    ],
    correctAnswer: "D",
    explanation: "Öncül cümle: Sissiz bir gecede (Zarf T.) / gökyüzünde (Yer T.) / ay ve yıldızın cümbüşü (Özne) / vardı (Yüklem). D şıkkı: Bir yaz günü (Zarf T.) / yaylada (Yer T.) / iki eski dost (Özne) / karşılaşmış (Yüklem) -> Birebir aynı öge dizilişidir."
  }
];
