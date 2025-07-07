import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const featureIcons = {
  yemek: 'food',
  etut: 'book-open-variant',
  wifi: 'wifi',
  kantin: 'store',
  camasir: 'washing-machine',
  spor: 'dumbbell',
  kutuphane: 'library-shelves',
};

const YurtCard = ({ yurt, onPress }) => {
  const { colors } = useTheme();

  const getFeatureIcons = () => {
    return yurt.ozellikler.slice(0, 4).map((ozellik, index) => (
      <Icon 
        key={index} 
        name={featureIcons[ozellik] || 'checkbox-marked-circle'} 
        size={20} 
        color={colors.primary} 
        style={styles.featureIcon} 
      />
    ));
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <Card.Content>
          <Text style={[styles.title, { color: colors.primary }]}>{yurt.ad}</Text>
          <View style={styles.location}>
            <Icon name="map-marker" size={16} color={colors.text} />
            <Text style={[styles.locationText, { color: colors.text }]}>
              {yurt.sehir}, {yurt.ilce}
            </Text>
          </View>
          <View style={styles.gender}>
            <Icon 
              name={yurt.cinsiyet === 'Kız' ? 'gender-female' : 'gender-male'} 
              size={16} 
              color={colors.text} 
            />
            <Text style={[styles.genderText, { color: colors.text }]}>
              {yurt.cinsiyet} Yurdu
            </Text>
          </View>
          <View style={styles.features}>
            {getFeatureIcons()}
            {yurt.ozellikler.length > 4 && (
              <Text style={[styles.moreText, { color: colors.primary }]}>
                +{yurt.ozellikler.length - 4}
              </Text>
            )}
          </View>
        </Card.Content>
        <Card.Actions>
          <Text style={[styles.detailButton, { color: colors.primary }]}>
            Detayları Gör
          </Text>
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  locationText: {
    marginLeft: 5,
    fontSize: 14,
  },
  gender: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  genderText: {
    marginLeft: 5,
    fontSize: 14,
  },
  features: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  featureIcon: {
    marginRight: 8,
  },
  moreText: {
    fontSize: 14,
    marginLeft: 5,
  },
  detailButton: {
    fontWeight: 'bold',
  },
});

export default YurtCard;