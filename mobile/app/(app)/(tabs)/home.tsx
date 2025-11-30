import * as Location from "expo-location";

import ViagemCard from '@/components/Cards/ViagemCard';
import { ApiException } from '@/config/apiException';
import { useSession } from '@/context/AuthContext';
import { Viagem } from '@/interfaces/Viagem';
import { viagemService } from '@/services/viagemService';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import { destinoService } from "@/services/destinoSevice";
import { Destino } from "@/interfaces/Destino";
import DestinationCard from "@/components/Cards/DestinationCard";
import { useRouter } from 'expo-router';
import { colors } from "@/styles/globalStyles";
import { useTranslation } from 'react-i18next';

export default function Home() {
    const { signOut, session } = useSession();
    const router = useRouter();
    const { t } = useTranslation();
    
    const [viagens, setViagens] = useState<Viagem[] | null>(null);
    const [viagemSelecionada, setViagemSelecionada] = useState(null);
    const [destinos, setDestinos] = useState<Destino[] | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; long: number } | null>(null);

    const [showFormModal, setShowFormModal] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const fetchViagens = async () => {
        setIsLoading(true);
        const response = await viagemService.getAllViagens(session?.user.id!);
        if (response instanceof ApiException) {
            Toast.show({
                type: 'error',
                text1: t('common.error'),
                text2: response.message || t('home.tripsFetchError')
            });
            return;
        }
        // sort by start date (dataIda) descending so most recent/upcoming appear first
        let sorted = response.sort((a, b) => (new Date(b.dataIda).getTime() - new Date(a.dataIda).getTime()));

        setViagens(sorted);
    }

    const fetchDestinos = async () => {
        const response = await destinoService.getPopularDestinations(session?.user?.preferencias?.idioma || 'pt');
        if (response instanceof ApiException) {
            Toast.show({
                type: 'error',
                text1: t('common.error'),
                text2: response.message || t('home.destinationsFetchError')
            });
            setIsLoading(false);
            return;
        }
        setDestinos(response);
        setIsLoading(false);
    };

    useEffect(() => {
        if (session?.user?.id) {
            fetchViagens();
            fetchDestinos();
        }   
    }, [session]);

    useEffect(() => {
        (async () => {
            const { status } = await Location.getForegroundPermissionsAsync();
            if (status === 'granted') return;

            const response  = await Location.requestForegroundPermissionsAsync();
            if (response.status !== "granted") {
                console.warn("Permission denied");
                Toast.show({
                    type: 'error',
                    text1: t('common.error'),
                    text2: t('home.locationPermissionDenied')
                });
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setUserLocation({ lat: location.coords.latitude, long: location.coords.longitude });
        })();
    }, []);

    const handleViagemPress = (viagem: Viagem) => {
        router.push({
            pathname: '/trips/[id]',
            params: { id: viagem.id!.toString() }
        } as any);
    };

    useEffect(() => {
        console.log("User location updated:", userLocation);
    }, [userLocation]);

        
    return (
        <>
            {isLoading ? (
                <View style={[styles.container, { justifyContent: 'center' }]}>
                    <ActivityIndicator size="large" color="#000" />
                    <Text style={styles.title}>{t('home.loadingTrips')}</Text>
                </View>
            ) : (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{t('home.greeting', { name: session?.user.nome })}</Text>
                        <Text 
                            onPress={() => {
                                signOut();
                            }}
                            style={{ color: 'red', fontWeight: 'bold' }}
                        >
                            {t('common.logout')}
                        </Text>
                    </View>

                    <View style={styles.contentPlanning}>
                        <Text style={styles.subTitle}>{t('home.continuePlanning')}</Text>
                        {viagens && viagens.length > 0 ? (
                            <ViagemCard viagem={viagens[0]} onPress={() => handleViagemPress(viagens[0])} />
                        ) : (
                            <Text style={styles.notFoundText}>{t('home.noTripsFound')}</Text>
                        )}
                    </View>

                    <View style={styles.contentPlanning}>
                        <Text style={styles.subTitle}>{t('home.popularDestinations')}</Text>
                        <FlatList
                            data={destinos || []}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={{ marginRight: 20 }}
                                onPress={() => router.push({
                                    pathname: '/(app)/destination-details',
                                    params: { id: item._id }
                                })}
                            >
                                <DestinationCard
                                    imageURL={item.imgsUrl[0]}
                                    label={item.name}
                                />
                            </TouchableOpacity>
                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 20 }}
                        />
                    </View>

                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        gap: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    notFoundText: {
        fontSize: 14,
        color: colors.gray500,
        marginTop: 10,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 60,
    },
    contentPlanning: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },

});