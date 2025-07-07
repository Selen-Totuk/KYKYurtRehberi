import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';

const FeatureIcon = ({ name, size = 24 }) => {
  const { colors } = useTheme();
  
  return (
    <View style={styles.container}>
      <Icon 
        name={name} 
        size={size} 
        color={colors.primary} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
  },
});

export default FeatureIcon;