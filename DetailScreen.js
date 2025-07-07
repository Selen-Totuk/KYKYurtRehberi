import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, Linking } from 'react-native';
import { Text, useTheme, Divider, ActivityIndicator, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { getYurtById } from '../api/yurtApi';

const featureIcons = {
  yemek: { icon: 'food', label: 'Yemek Hizmeti' },
  etut: { icon: 'book-open-variant', label: 'Etüt Odası' },
  wifi: { icon: 'wifi', label: 'WiFi' },
  kantin: { icon: 'store', label: 'Kantin' },
  camasir: { icon: 'washing-machine', label: 'Çamaşırhane' },
  spor: { icon: 'dumbbell', label: 'Spor Salonu' },
  kutuphane: { icon: 'library-shelves', label: 'Kütüphane' },
};

const DetailScreen = ({ route }) => {
  const { id } = route.params;
  const { colors } = useTheme();
  
  const [yurt, setYurt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchYurtDetails = async () => {
      try {
        setLoading(true);
        const data = await getYurtById(id);
        setYurt(data);
      } catch (error) {
        console.error('Hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchYurtDetails();
  }, [id]);

  const handleCallPress = () => {
    if (yurt?.iletisim) {
      Linking.openURL(`tel:${yurt.iletisim}`);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!yurt) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Yurt bilgileri alınamadı</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {yurt.gorsel && (
        <Image 
          source={{ uri: yurt.gorsel }} 
          style={styles.image} 
          resizeMode="cover"
        />
      )}
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.primary }]}>{yurt.ad}</Text>
        
        <View style={styles.infoRow}>
          <Icon name="map-marker" size={20} color={colors.text} />
          <Text style={[styles.infoText, { color: colors.text }]}>
            {yurt.sehir} / {yurt.ilce}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Icon 
            name={yurt.cinsiyet === 'Kız' ? 'gender-female' : 'gender-male'} 
            size={20} 
            color={colors.text} 
          />
          <Text style={[styles.infoText, { color: colors.text }]}>
            {yurt.cinsiyet} Yurdu
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Icon name="account-group" size={20} color={colors.text} />
          <Text style={[styles.infoText, { color: colors.text }]}>
            Kapasite: {yurt.kapasite} öğrenci
          </Text>
        </View>
        
        {yurt.adres && (
          <View style={styles.infoRow}>
            <Icon name="home-map-marker" size={20} color={colors.text} />
            <Text style={[styles.infoText, { color: colors.text }]}>
              {yurt.adres}
            </Text>
          </View>
        )}
        
        <Divider style={[styles.divider, { backgroundColor: colors.primary }]} />
        
        {yurt.aciklama && (
          <>
            <Text style={[styles.sectionTitle, { color: colors.primary }]}>Açıklama</Text>
            <Text style={[styles.description, { color: colors.text }]}>{yurt.aciklama}</Text>
          </>
        )}
        
        <Text style={[styles.sectionTitle, { color: colors.primary }]}>Özellikler</Text>
        <View style={styles.featuresContainer}>
          {yurt.ozellikler.map((ozellik, index) => (
            <View key={index} style={styles.featureItem}>
              <Icon 
                name={featureIcons[ozellik]?.icon || 'checkbox-marked-circle'} 
                size={24} 
                color={colors.primary} 
              />
              <Text style={[styles.featureText, { color: colors.text }]}>
                {featureIcons[ozellik]?.label || ozellik}
              </Text>
            </View>
          ))}
        </View>
        
        {yurt.iletisim && (
          <>
            <Divider style={[styles.divider, { backgroundColor: colors.primary }]} />
            <Text style={[styles.sectionTitle, { color: colors.primary }]}>İletişim</Text>
            <View style={styles.infoRow}>
              <Icon name="phone" size={20} color={colors.text} />
              <Text style={[styles.infoText, { color: colors.text }]}>
                {yurt.iletisim}
              </Text>
            </View>
            <Button 
              mode="contained" 
              onPress={handleCallPress}
              style={styles.callButton}
              color={colors.primary}
            >
              Ara
            </Button>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
  },
  divider: {
    marginVertical: 15,
    height: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 8,
  },
  callButton: {
    marginTop: 10,
    width: 100,
  },
});

export default DetailScreen;