export const CITIES = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 
  'Antalya', 'Artvin', 'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 
  'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 
  'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan',
  'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari',
  'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu',
  'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya',
  'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş',
  'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt',
  'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa',
  'Uşak', 'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman',
  'Kırıkkale', 'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova',
  'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
];

export const FEATURES = [
  { id: 'yemek', label: 'Yemek Hizmeti', icon: 'food' },
  { id: 'etut', label: 'Etüt Odası', icon: 'book-open-variant' },
  { id: 'wifi', label: 'WiFi', icon: 'wifi' },
  { id: 'kantin', label: 'Kantin', icon: 'store' },
  { id: 'camasir', label: 'Çamaşırhane', icon: 'washing-machine' },
  { id: 'spor', label: 'Spor Salonu', icon: 'dumbbell' },
  { id: 'kutuphane', label: 'Kütüphane', icon: 'library-shelves' },
  { id: 'servis', label: 'Servis', icon: 'bus' },
  { id: 'guvenlik', label: '24 Saat Güvenlik', icon: 'security' },
  { id: 'klima', label: 'Klima', icon: 'snowflake' }
];

export const GENDER_OPTIONS = [
  { value: 'Kız', label: 'Kız Yurdu', icon: 'gender-female' },
  { value: 'Erkek', label: 'Erkek Yurdu', icon: 'gender-male' }
];

export const AD_CONFIG = {
  banner: 'ca-app-pub-3940256099942544/6300978111', // Test ID
  interstitial: 'ca-app-pub-3940256099942544/1033173712',
  rewarded: 'ca-app-pub-3940256099942544/5224354917'
};

export const API_CONFIG = {
  baseUrl: 'https://kyk-api.example.com/v1',
  endpoints: {
    yurtlar: '/yurtlar',
    yurtDetay: '/yurtlar/:id',
    filtrele: '/yurtlar/filtrele'
  },
  timeout: 15000
};