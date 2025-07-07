import { ScrollView } from 'react-native';
import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Text, TextInput, Divider, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CITIES, FEATURES, GENDER_OPTIONS } from '../utils/constants';

const FilterModal = ({ visible, onClose, onApply, initialFilters }) => {
  const { colors } = useTheme();
  const [sehir, setSehir] = useState(initialFilters.sehir || '');
  const [cinsiyet, setCinsiyet] = useState(initialFilters.cinsiyet || '');
  const [ozellikler, setOzellikler] = useState(initialFilters.ozellikler || []);
  const [citySearch, setCitySearch] = useState('');

  const filteredCities = CITIES.filter(city =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const toggleOzellik = (ozellikId) => {
    if (ozellikler.includes(ozellikId)) {
      setOzellikler(ozellikler.filter(id => id !== ozellikId));
    } else {
      setOzellikler([...ozellikler, ozellikId]);
    }
  };

  const handleApply = () => {
    const filters = {};
    if (sehir) filters.sehir = sehir;
    if (cinsiyet) filters.cinsiyet = cinsiyet;
    if (ozellikler.length > 0) filters.ozellikler = ozellikler;
    onApply(filters);
    onClose();
  };

  const resetFilters = () => {
    setSehir('');
    setCinsiyet('');
    setOzellikler([]);
    onApply({});
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.primary }]}>Filtrele</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Şehir Filtresi */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Şehir</Text>
          <TextInput
            label="Şehir ara..."
            value={citySearch}
            onChangeText={setCitySearch}
            style={[styles.input, { backgroundColor: colors.surface }]}
            theme={{ colors: { text: colors.text } }}
            left={<TextInput.Icon name="magnify" />}
          />
          <View style={styles.cityContainer}>
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

          {/* Cinsiyet Filtresi */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Cinsiyet</Text>
          <View style={styles.genderContainer}>
            {GENDER_OPTIONS.map(option => (
              <Button
                key={option.value}
                mode={cinsiyet === option.value ? 'contained' : 'outlined'}
                onPress={() => setCinsiyet(option.value)}
                style={styles.genderButton}
                color={cinsiyet === option.value ? colors.primary : undefined}
                icon={option.icon}
              >
                {option.label}
              </Button>
            ))}
          </View>

          <Divider style={[styles.divider, { backgroundColor: colors.primary }]} />

          {/* Özellikler Filtresi */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Özellikler</Text>
          <View style={styles.featuresContainer}>
            {FEATURES.map(feature => (
              <TouchableOpacity
                key={feature.id}
                style={[
                  styles.featureItem,
                  { 
                    backgroundColor: ozellikler.includes(feature.id) 
                      ? colors.primary 
                      : colors.surface,
                    borderColor: colors.primary
                  }
                ]}
                onPress={() => toggleOzellik(feature.id)}
              >
                <Icon 
                  name={feature.icon} 
                  size={20} 
                  color={ozellikler.includes(feature.id) ? '#fff' : colors.primary} 
                />
                <Text 
                  style={[
                    styles.featureText,
                    { color: ozellikler.includes(feature.id) ? '#fff' : colors.text }
                  ]}
                >
                  {feature.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={[styles.footer, { backgroundColor: colors.surface }]}>
          <Button
            mode="outlined"
            onPress={resetFilters}
            style={styles.footerButton}
            color={colors.primary}
          >
            Sıfırla
          </Button>
          <Button
            mode="contained"
            onPress={handleApply}
            style={styles.footerButton}
            color={colors.primary}
          >
            Uygula
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    marginBottom: 10,
  },
  cityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  cityButton: {
    margin: 4,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  genderButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 8,
  },
  divider: {
    marginVertical: 15,
    height: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    elevation: 4,
  },
  footerButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default FilterModal;