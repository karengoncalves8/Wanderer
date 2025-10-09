import { Voo } from '@/interfaces/VooAPI';
import { colors } from '@/styles/globalStyles';
import React from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export type FlightCardProps = {
  voo: Voo;
  style?: ViewStyle;
  onPressBuy?: (voo: Voo) => void;
};

const formatDuration = (totalMinutes: number) => {
  if (Number.isNaN(totalMinutes) || totalMinutes == null) return '';
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const hStr = h > 0 ? `${h}h` : '';
  const mStr = `${m}min`;
  return `${hStr}${mStr}`;
};

const formatCurrencyBRL = (value: number) => {
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  } catch {
    return `R$ ${value.toFixed(2)}`;
  }
};

export default function FlightCard({ voo, style, onPressBuy }: FlightCardProps) {
  const depCode = voo.departure_airport?.id ?? '';
  const arrCode = voo.arrival_airport?.id ?? '';
  const depTime = voo.departure_airport?.time ?? '';
  const arrTime = voo.arrival_airport?.time ?? '';
  const duration = formatDuration(Number(voo.duration));
  const price = formatCurrencyBRL(Number(voo.price ?? 0));

  const handlePress = async (link: string) => {
    const url = link; // Replace with your desired external URL
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error(`Don't know how to open this URL: ${url}`);
      // Optionally, provide user feedback, e.g., an alert
    }
  };

  return (
    <View style={[styles.card, style]}> 
      {/* Top row: IATAs and line with airplane */}
      <View style={styles.headerRow}>
        <Text style={styles.iata}>{depCode}</Text>
        <View style={styles.routeContainer}>
          <View style={styles.dot} />
          <View style={styles.routeLine} />
          <View style={styles.planeIconWrapper}>
            <MaIcon name="airplane" size={16} color={colors.sky500} />
          </View>
          <View style={styles.routeLine} />
          <View style={styles.dot} />
        </View>
        <Text style={styles.iata}>{arrCode}</Text>
      </View>

      {/* Times and duration */}
      <View style={styles.subHeaderRow}>
        <Text style={styles.timeText}>{depTime}</Text>
        <Text style={styles.durationText}>{duration}</Text>
        <Text style={styles.timeText}>{arrTime}</Text>
      </View>

      {/* Airline, price and buy */}
      <View style={styles.footerRow}>
        <View style={styles.airlineInfo}>
          {voo.airline_logo ? (
            <Image source={{ uri: voo.airline_logo }} style={styles.logo} resizeMode="contain" />
          ) : (
            <View style={[styles.logo, styles.logoFallback]} />
          )}
          <Text style={styles.airlineName}>{voo.airline}</Text>
        </View>

        <View style={styles.ctaArea}>
          <Text style={styles.price}>{price}</Text>
          <TouchableOpacity style={styles.buyButton} onPress={() => handlePress(voo.booking_url!)}>
            <Text style={styles.buyButtonText}>Comprar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iata: {
    color: colors.gray800,
    fontWeight: 'bold',
    fontSize: 22,
  },
  routeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginHorizontal: 12,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: colors.sky500,
    borderRadius: 999,
  },
  routeLine: {
    flex: 1,
    height: 2,
    backgroundColor:  colors.sky500 ?? '#D9D9D9',
  },
  planeIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.sky500 ?? '#D9D9D9',
  },
  subHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeText: {
    color: colors.gray800 ?? '#9E9E9E',
    fontSize: 14,
  },
  durationText: {
    color: colors.gray800 ?? '#9E9E9E',
    fontSize: 14,
  },
  footerRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  airlineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  logoFallback: {
    backgroundColor: colors.gray800,
  },
  airlineName: {
    color: colors.gray800,
    fontSize: 16,
  },
  ctaArea: {
    alignItems: 'flex-end',
    gap: 8,
  },
  price: {
    color: colors.blue800 ?? '#143E66',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buyButton: {
    backgroundColor: colors.lblue500 ?? '#1C8ABF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
