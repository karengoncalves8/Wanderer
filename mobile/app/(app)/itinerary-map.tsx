import { useLocalSearchParams } from 'expo-router/build/hooks';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';
import Toast from 'react-native-toast-message';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { atividadeService } from '@/services/atividadeService';
import { Atividade } from '@/interfaces/Atividade';
import MaIcons from 'react-native-vector-icons/MaterialIcons';
import FonIcons from 'react-native-vector-icons/Fontisto';
import { colors } from '@/styles/globalStyles';

export default function ItineraryMap() {
  const { viagemId, data } = useLocalSearchParams();

  const [atividades, setAtividades] = useState<Atividade[] | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; long: number } | null>(null);
  const [selectedAtividade, setSelectedAtividade] = useState<Atividade | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch activities
  const fetchItineraryData = async (viagemId: string, data: string) => {
    try {
      const response = await atividadeService.getAtividadesByData(Number(viagemId), data);
      if (response instanceof Error) {
        console.error("Error fetching itinerary data:", response.message);
      } else {
        setAtividades(response);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Unexpected error:", error);
    }
  };

  useEffect(() => {
    fetchItineraryData(viagemId as string, data as string);
  }, [viagemId, data]);

  // User location
  useEffect(() => {
    (async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        const response = await Location.requestForegroundPermissionsAsync();
        if (response.status !== "granted") {
          Toast.show({
            type: 'error',
            text1: 'Erro',
            text2: 'Permissão para acessar localização negada.'
          });
          return;
        }
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      });
    })();
  }, []);

  // --- GOOGLE MAPS ACTIONS ---
  const openInGoogleMaps = (lat: number, lng: number, name?: string) => {
    const label = encodeURIComponent(name || "Location");
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${label}`;
    Linking.openURL(url);
  };

  const traceRouteGoogleMaps = (fromLat: number, fromLng: number, toLat: number, toLng: number) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${fromLat},${fromLng}&destination=${toLat},${toLng}&travelmode=driving`;
    Linking.openURL(url);
  };

  const openUber = (lat: number, lng: number, name?: string) => {
    const label = encodeURIComponent(name || "Destination");

    const url = `https://m.uber.com/ul/?action=setPickup&dropoff[latitude]=${lat}&dropoff[longitude]=${lng}&dropoff[nickname]=${label}`;

    Linking.openURL(url);
  };

  const initialLat = Number(atividades?.[0]?.atividadeLocal?.lat ?? NaN);
  const initialLng = Number(atividades?.[0]?.atividadeLocal?.long ?? NaN);

  return (
    <View style={styles.container}>
      {isLoading || !atividades?.length ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <MapView
            showsUserLocation
            style={styles.map}
            initialRegion={{
              latitude: Number.isFinite(initialLat) ? initialLat : 37.78825,
              longitude: Number.isFinite(initialLng) ? initialLng : -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {atividades!.map((atv, index) => {
              const lat = Number(atv.atividadeLocal?.lat);
              const lng = Number(atv.atividadeLocal?.long);

              if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

              return (
                <Marker
                  key={index}
                  coordinate={{ latitude: lat, longitude: lng }}
                  onPress={() => setSelectedAtividade(atv)}
                >
                  <View style={styles.pinContainer}>
                    <View style={styles.pin}>
                      <Text style={styles.pinText}>{index + 1}</Text>
                    </View>
                  </View>
                </Marker>
              );
            })}
          </MapView>

          {/* --- BOTTOM CARD --- */}
          {selectedAtividade && (
            <View style={styles.bottomCard}>
              <View style={styles.bottomHeader}>
                <Text style={styles.bottomTitle}>{selectedAtividade.nome}</Text>

                <Pressable style={styles.bottomClose} onPress={() => setSelectedAtividade(null)}>
                  <MaIcons name="close" size={24} color={colors.gray500} />
                </Pressable>
              </View>

              <Text style={styles.bottomSubtitle}>
                {`${selectedAtividade.hora_inicio} - ${selectedAtividade.hora_fim}`}
              </Text>

              <Text style={styles.bottomLocation}>
                {selectedAtividade.atividadeLocal?.localizacao ?? 'Local indefinido'}
              </Text>

              {/* ACTION BUTTONS */}
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#ffffffff', borderColor: '#EA4435', borderWidth: 1}]}
                  onPress={() =>
                    openInGoogleMaps(
                      Number(selectedAtividade.atividadeLocal?.lat),
                      Number(selectedAtividade.atividadeLocal?.long),
                      selectedAtividade.nome
                    )
                  }
                >
                  <FonIcons name="google" size={12} color="#EA4435" />
                  <Text style={[styles.actionButtonText, { color: '#EA4435' }]}>Maps</Text>
                </TouchableOpacity>

                {userLocation && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() =>
                      traceRouteGoogleMaps(
                        userLocation.lat,
                        userLocation.long,
                        Number(selectedAtividade.atividadeLocal?.lat),
                        Number(selectedAtividade.atividadeLocal?.long)
                      )
                    }
                  >
                    <MaIcons name="navigation" size={12} color="white" />
                    <Text style={styles.actionButtonText}>Rota</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#000' }]}
                  onPress={() =>
                    openUber(
                      Number(selectedAtividade.atividadeLocal?.lat),
                      Number(selectedAtividade.atividadeLocal?.long),
                      selectedAtividade.nome
                    )
                  }
                >
                  <FonIcons name="uber" size={12} color="white" />
                  <Text style={styles.actionButtonText}>Uber</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
}

/* -------------------- STYLES -------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  pinContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  pin: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FF6B00",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
    elevation: 4,
  },
  pinText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },

  bottomCard: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 24,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 16,
    elevation: 6,
    gap: 6,
  },

  bottomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomClose: {
    padding: 3,
  },

  bottomTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  bottomSubtitle: {
    fontSize: 14,
    color: "#555",
  },
  bottomLocation: {
    fontSize: 13,
    color: "#777",
  },

  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.sky500,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    elevation: 4,
    gap: 6,
  },
  actionButtonText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
  },
});
