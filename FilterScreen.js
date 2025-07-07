import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Checkbox, Text, TextInput, useTheme, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const cities = [
  'Adana', 'Adıyaman', 'Afyon', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
  'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa',
  'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ',
  'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari',
  'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri',
  'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa',
  'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize',
  'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon',
  'Tunceli', 'Şanlıurfa', 'Uşak', 'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt',
  'Karaman', 'Kırıkkale', 'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova',
  'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
];

const features = [
  { id: 'yemek', label: 'Yemek Hizmeti', icon: 'food' },
  { id: 'etut', label: 'Etüt Odası', icon: 'book-open-variant' },
  { id: 'wifi', label: 'WiFi', icon: 'wifi' },
  { id: 'kantin', label: 'Kantin', icon: 'store' },
  { id: 'camasir', label: 'Çamaşırhane', icon: 'washing-machine' },
  { id: 'spor', label: 'Spor Salonu', icon: 'dumbbell' },
  { id: 'kutuphane', label: 'Kütüphane', icon: 'library-shelves' },
];

const FilterScreen = ({ route, navigation }) => {
  const { currentFilters, onApplyFilters } = route.params;
  const { colors } = useTheme();
  
  const [sehir, setSehir] = useState(currentFilters.sehir || '');
  const [cinsiyet, setCinsiyet] = useState(currentFilters.cinsiyet || '');
  const [ozellikler, setOzellikler] = useState(currentFilters.ozellikler || []);
  const [searchCity, setSearchCity] = useState('');

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(searchCity.toLowerCase())
  );

  const handleFeatureToggle = (featureId) => {
    if (ozellikler.includes(featureId)) {
      setOzellikler(ozellikler.filter(id => id !== featureId));
    } else {
      setOzellikler([...ozellikler, featureId]);
    }
  };

  const applyFilters = () => {
    const newFilters = {};
    if (sehir) newFilters.sehir = sehir;
    if (cinsiyet) newFilters.cinsiyet = cinsiyet;
    if (ozellikler.length > 0) newFilters.ozellikler = ozellikler;
    
    onApplyFilters(newFilters);
    navigation.goBack();
  };

  const clearFilters = () => {
    setSehir('');
    setCinsiyet('');
    setOzellikler([]);
    setSearchCity('');
    onApplyFilters({});
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.sectionTitle, { color: colors.primary }]}>Şehir</Text>
        <TextInput
          label="Şehir ara..."
          value={searchCity}
          onChangeText={setSearchCity}
          style={[styles.input, { backgroundColor: colors.surface }]}
          theme={{ colors: { text: colors.text } }}
        />
        <View style={styles.cityList}>
          {filteredCities.map(city => (
            <Button
              key={city}
              mode={sehir === city ? 'contained' : 'outlined'}
              onPress={() => setSehir(city)}
              style={styles.cityButton}
              color={sehir === city ? colors.primary : undefined}
            >
              {city}
            </Button>
          ))}
        </View>

        <Divider style={[styles.divider, { backgroundColor: colors.primary }]} />

        <Text style={[styles.sectionTitle, { color: colors.primary }]}>Cinsiyet</Text>
        <View style={styles.genderContainer}>
          <Button
            mode={cinsiyet === 'Kız' ? 'contained' : 'outlined'}
            onPress={() => setCinsiyet('Kız')}
            style={styles.genderButton}
            color={cinsiyet === 'Kız' ? colors.primary : undefined}
          >
            Kız Yurdu
          </Button>
          <Button
            mode={cinsiyet === 'Erkek' ? 'contained' : 'outlined'}
            onPress={() => setCinsiyet('Erkek')}
            style={styles.genderButton}
            color={cinsiyet === 'Erkek' ? colors.primary : undefined}
          >
            Erkek Yurdu
          </Button>
        </View>

        <Divider style={[styles.divider, { backgroundColor: colors.primary }]} />

        <Text style={[styles.sectionTitle, { color: colors.primary }]}>Özellikler</Text>
        {features.map(feature => (
          <View key={feature.id} style={styles.featureItem}>
            <Checkbox.Android
              status={ozellikler.includes(feature.id) ? 'checked' : 'unchecked'}
              onPress={() => handleFeatureToggle(feature.id)}
              color={colors.primary}
            />
            <Icon name={feature.icon} size={24} color={colors.primary} style={styles.featureIcon} />
            <Text style={{ color: colors.text }}>{feature.label}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.buttonContainer, { backgroundColor: colors.surface }]}>
        <Button
          mode="outlined"
          onPress={clearFilters}
          style={styles.button}
          labelStyle={{ color: colors.primary }}
        >
          Filtreleri Temizle
        </Button>
        <Button
          mode="contained"
          onPress={applyFilters}
          style={styles.button}
          color={colors.primary}
        >
          Uygula
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  input: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  cityList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  cityButton: {
    margin: 4,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  genderButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  featureIcon: {
    marginHorizontal: 8,
  },
  divider: {
    marginVertical: 15,
    height: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    padding: 10,
    borderRadius: 10,
    elevation: 4,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default FilterScreen;