import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/styles/globalStyles';
import { Atracao, AtracaoResult } from '@/interfaces/Atracao';

type Props = {
  atracao: AtracaoResult;
};

const AttractionCard = ({ atracao }: Props) => {
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: atracao.imgUrl || 'https://via.placeholder.com/300x150' }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {atracao.name}
        </Text>
        
        {atracao.full_address && (
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={16} color={colors.gray400} />
            <Text style={styles.address} numberOfLines={1}>
              {atracao.full_address}
            </Text>
          </View>
        )}
        
        {atracao.short_description && (
          <Text style={styles.description} numberOfLines={2}>
            {atracao.short_description}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.gray100,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    maxWidth: 280,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginRight: 20,
  },
  image: {
    width: 280,
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: colors.gray200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray800,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  address: {
    marginLeft: 4,
    color: colors.gray600,
    fontSize: 14,
  },
  description: {
    color: colors.gray600,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default AttractionCard;