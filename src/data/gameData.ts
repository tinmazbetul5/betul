export type ElementType =
  | 'Yüklem'
  | 'Gerçek Özne'
  | 'Belirtili Nesne'
  | 'Belirtisiz Nesne'
  | 'Dolaylı Tümleç'
  | 'Zarf Tümleci'
  | 'Ara Söz';

export interface SentenceItem {
  id: string;
  order: number;
  fullSentence: string;
  highlightedText: string;
  correctElement: ElementType;
  questionToFind: string;
  explanation: string;
  charactersInvolved: string[];
}

export interface TeamArena {
  id: string;
  teamNumber: 1 | 2 | 3;
  teamName: string;
  arenaName: string;
  themeColor: string;
  accentColor: string;
  imagePath: string;
  lore: string;
  sentences: SentenceItem[];
  matchingPool: ElementType[]; // Shuffled pool of 5 options
}

export const HOST_INTRO = {
  title: "Büyük Şifre Avı: Cümlenin Ögeleri Kaçış Odası",
  subtitle: "8. Sınıf LGS Dil Bilgisi Meydan Okuması",
  speech: `“Dikkat, dikkat! Saygıdeğer dil kaşifleri, 8. sınıfın usta dedektifleri! 

Bugün sıradan bir Türkçe dersinde değilsiniz; tarihin ve bilimin tozlu sayfalarına gömülmüş kadim bir gizemi aydınlatmak üzere görevlendirildiniz! Sınıfımız üç seçkin ekibe ayrıldı: 1. Takım 'Gizli Kütüphane'nin gizemli koridorlarında, 2. Takım patlamanın eşiğindeki 'Terk Edilmiş Laboratuvar'da, 3. Takım ise yerin yedi kat altındaki 'Karanlık Mahzen'de mahsur kaldı!

Önünüzdeki demir kapıları ve dijital kilitleri açmanın tek bir kuralı var: Mekanınızdaki 5 zorlu cümlenin BÜYÜK HARFLERLE kilitlenmiş ögelerini doğru çözmek ve altınızdaki 'Eşleştirme Havuzu' ile kusursuzca eşleştirmek! 

Unutmayın; yanlış bir hamle şifreyi kilitler, doğru bir analiz ise ekibinizi zafere bir adım daha yaklaştırır. Yüklemi bulun, doğru soruları sorun, ögeyi yakalayın! 

Süre başlıyor, kalemlerinizi ve zekanızı kuşanın... KAZANAN İLK TAKIM TARİHE GEÇECEK!”`,
  rules: [
    "Her takım kendi mekanındaki 5 şifreli cümleyi inceler.",
    "Cümlelerde yalnızca BÜYÜK HARFLE yazılmış kısım bir ögedir.",
    "Takımlar mekanın altındaki 'Eşleştirme Havuzu'ndaki 5 farklı ögeyi cümlelerle eşleştirir.",
    "Tüm eşleştirmeleri ilk olarak hatasız tamamlayan ve kapıyı açan takım yarışmayı kazanır."
  ]
};

export const TEAMS_DATA: TeamArena[] = [
  {
    id: "team-1",
    teamNumber: 1,
    teamName: "1. Takım (Bilge Muhafızlar)",
    arenaName: "Gizli Kütüphane",
    themeColor: "amber",
    accentColor: "border-amber-500/40 text-amber-400 bg-amber-500/10",
    imagePath: "/src/assets/images/secret_library_arena_1792711237764.jpg",
    lore: "Bin yıllık tozlu parşömenlerin, dönen gizli kitaplıkların ve kehribar fenerlerin ışığında saklı antik kütüphane.",
    sentences: [
      {
        id: "t1-s1",
        order: 1,
        fullSentence: "Tozlu raflar arasındaki eski parşömeni dikkatle inceleyen HUN, kütüphanenin gizli geçidini nihayet bulmuştu.",
        highlightedText: "Tozlu raflar arasındaki eski parşömeni dikkatle inceleyen HUN",
        correctElement: "Gerçek Özne",
        questionToFind: "Kütüphanenin gizli geçidini nihayet bulan kim?",
        explanation: "Yüklem olan 'bulmuştu' eylemini bizzat gerçekleştiren varlık bir sıfat-fiil grubuyla nitelenmiş ve cümlede açıkça belirtilmiştir: 'Tozlu raflar arasındaki eski parşömeni dikkatle inceleyen HUN'.",
        charactersInvolved: ["Hun"]
      },
      {
        id: "t1-s2",
        order: 2,
        fullSentence: "Doruk, asırlık meşe masanın üzerinde parıldayan KIRIK PUSULAYI ceketinin derin cebine usulca koydu.",
        highlightedText: "KIRIK PUSULAYI",
        correctElement: "Belirtili Nesne",
        questionToFind: "Doruk ceketinin derin cebine usulca neyi koydu?",
        explanation: "'Koydu' yüklemine sorulan 'Neyi?' sorusuna yanıt verir ve belirtme hâl eki (-ı) almıştır: 'KIRIK PUSULAYI'.",
        charactersInvolved: ["Doruk"]
      },
      {
        id: "t1-s3",
        order: 3,
        fullSentence: "Ece, şifreli kitabın kapağını aralarken SAMED'E merak dolu gözlerle baktı.",
        highlightedText: "SAMED'E",
        correctElement: "Dolaylı Tümleç",
        questionToFind: "Ece kime merak dolu gözlerle baktı?",
        explanation: "'Baktı' yüklemine sorulan 'Kime?' sorusuna yanıt verir ve yönelme hâl eki (-e) almış yer tamlayıcısıdır: 'SAMED'E'.",
        charactersInvolved: ["Ece", "Samed"]
      },
      {
        id: "t1-s4",
        order: 4,
        fullSentence: "Elif, kütüphanenin duvarındaki antik yıldız haritasını GÜNEŞ BATMADAN ÖNCE çözmek istiyordu.",
        highlightedText: "GÜNEŞ BATMADAN ÖNCE",
        correctElement: "Zarf Tümleci",
        questionToFind: "Elif yıldız haritasını ne zaman çözmek istiyordu?",
        explanation: "'İstiyordu / çözmek istiyordu' fiiline sorulan 'Ne zaman?' sorusuna zaman anlamı katarak cevap verir: 'GÜNEŞ BATMADAN ÖNCE'.",
        charactersInvolved: ["Elif"]
      },
      {
        id: "t1-s5",
        order: 5,
        fullSentence: "Can —EN SEVDİĞİ ÇOCUKLUK ARKADAŞI— Nur'un fısıltısını duyunca hızla arkasını döndü.",
        highlightedText: "EN SEVDİĞİ ÇOCUKLUK ARKADAŞI",
        correctElement: "Ara Söz",
        questionToFind: "İki kısa çizgi arasında cümlenin öznesi olan Can'ı açıklayan ifade nedir?",
        explanation: "Cümlede iki kısa çizgi arasında yer almış, özne olan 'Can' hakkında ek açıklama sağlayan ara sözdür.",
        charactersInvolved: ["Can", "Nur"]
      }
    ],
    // Shuffled pool for Team 1
    matchingPool: [
      "Zarf Tümleci",
      "Gerçek Özne",
      "Ara Söz",
      "Belirtili Nesne",
      "Dolaylı Tümleç"
    ]
  },
  {
    id: "team-2",
    teamNumber: 2,
    teamName: "2. Takım (Simya Kaşifleri)",
    arenaName: "Terk Edilmiş Laboratuvar",
    themeColor: "cyan",
    accentColor: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10",
    imagePath: "/src/assets/images/abandoned_lab_arena_1792711238151.jpg",
    lore: "Fokurdayan cam beherlerin, bakır boruların ve esrarengiz basınç saatlerinin çalıştığı terk edilmiş araştırma üssü.",
    sentences: [
      {
        id: "t2-s1",
        order: 1,
        fullSentence: "Laboratuvardaki tehlikeli kimyasal sızıntıyı önlemek için Nur ve Mustafa BÜYÜK BİR DİKKATLE ana vanayı kapattılar.",
        highlightedText: "BÜYÜK BİR DİKKATLE",
        correctElement: "Zarf Tümleci",
        questionToFind: "Ana vanayı nasıl kapattılar?",
        explanation: "'Kapattılar' yükleminin yapılma tarzını ve durumunu belirten zarf tümlecidir ('BÜYÜK BİR DİKKATLE').",
        charactersInvolved: ["Nur", "Mustafa"]
      },
      {
        id: "t2-s2",
        order: 2,
        fullSentence: "Doruk ile Elif, reaktör odasında mahsur kalan CAN'A uzatma kablosunu uzattı.",
        highlightedText: "CAN'A",
        correctElement: "Dolaylı Tümleç",
        questionToFind: "Kabloyu kime uzattı?",
        explanation: "'Uzattı' eylemine yönelen kişiyi bildiren, yönelme hâl eki (-a) almış yer tamlayıcısıdır ('CAN'A').",
        charactersInvolved: ["Doruk", "Elif", "Can"]
      },
      {
        id: "t2-s3",
        order: 3,
        fullSentence: "Samed, deney tüplerinin arkasında bulduğu KOBALT MAVİSİ ŞİŞEYİ sevinçle havaya kaldırdı.",
        highlightedText: "KOBALT MAVİSİ ŞİŞEYİ",
        correctElement: "Belirtili Nesne",
        questionToFind: "Samed sevinçle havaya neyi kaldırdı?",
        explanation: "'Kaldırdı' yüklemine sorulan 'Neyi?' sorusuna yanıt veren ve belirtme hâl eki (-i) taşıyan belirtili nesnedir: 'KOBALT MAVİSİ ŞİŞEYİ'.",
        charactersInvolved: ["Samed"]
      },
      {
        id: "t2-s4",
        order: 4,
        fullSentence: "Hun, titreyen soğuk parmaklarıyla konsoldaki şifre ekranına BİRKAÇ RAKAM yazdı.",
        highlightedText: "BİRKAÇ RAKAM",
        correctElement: "Belirtisiz Nesne",
        questionToFind: "Hun şifre ekranına ne yazdı? (Özne bulunduktan sonraki yalın 'Ne?')",
        explanation: "Özne 'Hun' bulunduktan sonra yükleme sorulan yalın durumdaki 'Ne?' sorusunun cevabıdır: 'BİRKAÇ RAKAM' (Belirtisiz nesne).",
        charactersInvolved: ["Hun"]
      },
      {
        id: "t2-s5",
        order: 5,
        fullSentence: "Ece, alarm sirenleri tüm koridorlarda yankılanırken acil durum çıkış kapısını nihayet AÇABİLDİ.",
        highlightedText: "AÇABİLDİ",
        correctElement: "Yüklem",
        questionToFind: "Cümlede bildirilen temel iş, oluş ve çekimli eylem nedir?",
        explanation: "Cümleyi yargıya bağlayan, kurallı cümlenin sonunda yer alan kurallı birleşik fiil (yeterlilik fiili) ve cümlenin Yüklemidir.",
        charactersInvolved: ["Ece"]
      }
    ],
    // Shuffled pool for Team 2
    matchingPool: [
      "Yüklem",
      "Dolaylı Tümleç",
      "Belirtisiz Nesne",
      "Zarf Tümleci",
      "Belirtili Nesne"
    ]
  },
  {
    id: "team-3",
    teamNumber: 3,
    teamName: "3. Takım (Kripto Avcıları)",
    arenaName: "Karanlık Mahzen",
    themeColor: "emerald",
    accentColor: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
    imagePath: "/src/assets/images/dark_vault_arena_1792711238657.jpg",
    lore: "Yerin derinliklerinde meşalelerin aydınlattığı kemerli taş salonlar ve demir parmaklıklı sırlar mahzeni.",
    sentences: [
      {
        id: "t3-s1",
        order: 1,
        fullSentence: "Karanlık mahzenin nemli zemininde cesurca ilerleyen ELİF VE DORUK, duvardaki antik kabartmaları hayranlıkla inceledi.",
        highlightedText: "ELİF VE DORUK",
        correctElement: "Gerçek Özne",
        questionToFind: "Duvardaki antik kabartmaları hayranlıkla inceleyen kim?",
        explanation: "'İnceledi' fiilini gerçekleştiren açık öznedir ('ELİF VE DORUK').",
        charactersInvolved: ["Elif", "Doruk"]
      },
      {
        id: "t3-s2",
        order: 2,
        fullSentence: "Mustafa —EKİBİN EN BECERİKLİ ELEKTRİKÇİSİ— mahzenin kilitli demir kapısını açmak için devreyi onardı.",
        highlightedText: "EKİBİN EN BECERİKLİ ELEKTRİKÇİSİ",
        correctElement: "Ara Söz",
        questionToFind: "İki kısa çizgi arasında yer alan ve özneyi açıklayan ara söz grubu hangisidir?",
        explanation: "İki kısa çizgi arasında cümlenin öznesi olan Mustafa'yı niteleyip açıklayan ara söz öbeğidir.",
        charactersInvolved: ["Mustafa"]
      },
      {
        id: "t3-s3",
        order: 3,
        fullSentence: "Samed ve Hun, meşalelerin gölgeler oluşturduğu dehlizden geçip ESKİ DEMİR KAPIDAN içeriye süzüldüler.",
        highlightedText: "ESKİ DEMİR KAPIDAN",
        correctElement: "Dolaylı Tümleç",
        questionToFind: "Samed ve Hun nereden içeriye süzüldüler?",
        explanation: "'Süzüldüler' eylemine sorulan 'Nereden?' sorusuna ayrılma/çıkma hâl eki (-dan) ile yanıt veren yer tamlayıcısıdır: 'ESKİ DEMİR KAPIDAN'.",
        charactersInvolved: ["Samed", "Hun"]
      },
      {
        id: "t3-s4",
        order: 4,
        fullSentence: "Can, kilit mekanizmasının gizli yuvasında paslanmış madeni bir kutuyu açınca BİR GİZLİ MEKTUP buldu.",
        highlightedText: "BİR GİZLİ MEKTUP",
        correctElement: "Belirtisiz Nesne",
        questionToFind: "Can kilit yuvasında ne buldu? (Yalın durumdaki nesne)",
        explanation: "'Buldu' yüklemine özne 'Can' bulunduktan sonra sorulan eksiz 'Ne?' sorusuna karşılık gelen belirtisiz nesnedir: 'BİR GİZLİ MEKTUP'.",
        charactersInvolved: ["Can"]
      },
      {
        id: "t3-s5",
        order: 5,
        fullSentence: "Nur, labirentin çıkış şifresini çözebilmek amacıyla taş sütundaki sembolleri BÜYÜTEÇLE DİKKATLE inceledi.",
        highlightedText: "BÜYÜTEÇLE DİKKATLE",
        correctElement: "Zarf Tümleci",
        questionToFind: "Nur taş sütundaki sembolleri nasıl / ne ile inceledi?",
        explanation: "'İnceledi' fiiline 'Nasıl / ne ile?' sorularıyla yöneltilen durum ve vasıta zarf tümlecidir: 'BÜYÜTEÇLE DİKKATLE'.",
        charactersInvolved: ["Nur"]
      }
    ],
    // Shuffled pool for Team 3
    matchingPool: [
      "Belirtisiz Nesne",
      "Dolaylı Tümleç",
      "Gerçek Özne",
      "Zarf Tümleci",
      "Ara Söz"
    ]
  }
];

export const GRAMMAR_HINTS = [
  {
    element: "Yüklem",
    description: "Cümlenin temelidir; iş, oluş, hareket veya yargı bildirir. Diğer tüm sorular yükleme sorulur.",
    sampleQuestion: "Yargıyı bildiren sözcük veya tamlama nedir?"
  },
  {
    element: "Özne (Gerçek / Gizli)",
    description: "Yüklemdeki işi yapan veya yargının konusu olan ögedir.",
    sampleQuestion: "Yükleme sorulan: 'Kim?' veya 'Ne?' (Yapan kim / Olan ne?)"
  },
  {
    element: "Belirtili Nesne",
    description: "Yüklemdeki işten doğrudan etkilenen ve mutlaka belirtme hâl eki (-i, -ı, -u, -ü) alan ögedir.",
    sampleQuestion: "Yükleme sorulan: 'Neyi?' veya 'Kimi?'"
  },
  {
    element: "Belirtisiz Nesne",
    description: "Özne bulunduktan sonra yükleme sorulan eksiz (yalın haldeki) nesnedir.",
    sampleQuestion: "Özneyi bulduktan sonra yükleme sorulan: 'Ne?'"
  },
  {
    element: "Dolaylı Tümleç (Yer Tamlayıcısı)",
    description: "Cümlede yönelme (-e), bulunma (-de) ve ayrılma (-den) bildiren sözcük grubudur.",
    sampleQuestion: "'Kime/Kimde/Kimden?', 'Nereye/Nerede/Nereden?', 'Neye/Neyde/Neyden?'"
  },
  {
    element: "Zarf Tümleci",
    description: "Yüklemi zaman, durum, miktar, sebep, vasıta veya yön yönünden tamamlar.",
    sampleQuestion: "'Nasıl?', 'Ne zaman?', 'Neden / Niçin?', 'Ne kadar?', 'Ne ile?'"
  },
  {
    element: "Ara Söz",
    description: "Cümlede iki virgül ya da iki kısa çizgi arasına giren, bir ögenin açıklayıcısı olan veya ek bilgi veren söz grubudur.",
    sampleQuestion: "İki virgül veya kısa çizgi arasındaki açıklama grubu nedir?"
  }
];
