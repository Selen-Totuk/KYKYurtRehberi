import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card, IconButton, useTheme, Text } from 'react-native-paper';
import { AdMobBanner } from '@react-native-admob/admob';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { getAllYurtlar, getFilteredYurtlar } from '../api/yurtApi';
import YurtCard from '../components/YurtCard';

const HomeScreen = ({ navigation }) => {
  const [yurtlar, setYurtlar] = useState([]);
  const [filteredYurtlar, setFilteredYurtlar] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const { colors } = useTheme();

  useEffect(() => {
    fetchYurtlar();
  }, [filters]);

  useEffect(() => {
    if (searchText === '') {
      setFilteredYurtlar(yurtlar);
    } else {
      const filtered = yurtlar.filter(yurt =>
        yurt.ad.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredYurtlar(filtered);
    }
  }, [searchText, yurtlar]);

  const fetchYurtlar = async () => {
    try {
      setLoading(true);
      let data;
      
      if (Object.keys(filters).length > 0) {
        data = await getFilteredYurtlar(filters);
      } else {
        data = await getAllYurtlar();
      }
      
      setYurtlar(data);
      setFilteredYurtlar(data);
    } catch (error) {
      console.error('Hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterPress = () => {
    navigation.navigate('Filter', {
      currentFilters: filters,
      onApplyFilters: (newFilters) => {
        setFilters(newFilters);
      }
    });
  };

  const renderItem = ({ item, index }) => {
    if (index > 0 && index % 5 === 0) {
      return (
        <View>
          <AdMobBanner
            adSize="banner"
            adUnitID="ca-app-pub-3940256099942544/6300978111"
            onAdFailedToLoad={(error) => console.error(error)}
          />
          <YurtCard yurt={item} onPress={() => navigation.navigate('Detail', { id: item.id })} />
        </View>
      );
    }
    
    return <YurtCard yurt={item} onPress={() => navigation.navigate('Detail', { id: item.id })} />;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: colors.surface, color: colors.text }]}
          placeholder="Yurt adı ara..."
          placeholderTextColor={colors.placeholder}
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity 
          onPress={handleFilterPress} 
          style={[styles.filterButton, { backgroundColor: colors.primary }]}
        >
          <Icon name="filter" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : filteredYurtlar.length === 0 ? (
        <View style={styles.noResults}>
          <Text style={{ color: colors.text }}>Sonuç bulunamadı</Text>
          <TouchableOpacity onPress={() => setFilters({})}>
            <Text style={{ color: colors.primary }}>Filtreleri temizle</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredYurtlar}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  filterButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;