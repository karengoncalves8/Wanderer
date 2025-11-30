import * as Location from "expo-location";

import ViagemCard from '@/components/Cards/ViagemCard';
import { ApiException } from '@/config/apiException';
import { useSession } from '@/context/AuthContext';
import { Viagem } from '@/interfaces/Viagem';
import { viagemService } from '@/services/viagemService';
import { is } from 'date-fns/locale';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import { destinoService } from "@/services/destinoSevice";
import { Destino } from "@/interfaces/Destino";
import DestinationCard from "@/components/Cards/DestinationCard";
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function Home() {
    const { signOut, session } = useSession();
    const router = useRouter();
    
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
                text1: 'Erro',
                text2: response.message || 'Erro ao consultar viagens.'
            });
            return;
        }
        // sort by start date (dataIda) descending so most recent/upcoming appear first
        let sorted = response.sort((a, b) => (new Date(b.dataIda).getTime() - new Date(a.dataIda).getTime()));

        setViagens(sorted);
    }

    const fetchDestinos = async () => {
        const response = await destinoService.getPopularDestinations('pt');
        if (response instanceof ApiException) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: response.message || 'Erro ao consultar destinos populares.'
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
                    text1: 'Erro',
                    text2: 'Permissão para acessar localização negada. Por favor, habilite nas configurações do dispositivo.'
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
                    <Text style={styles.title}>Carregando...</Text>
                </View>
            ) : (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Olá, {session?.user.nome}</Text>
                        <Text 
                            onPress={() => {
                                signOut();
                            }}
                            style={{ color: 'red', fontWeight: 'bold' }}
                        >
                            Sair
                        </Text>
                    </View>

                    <View style={styles.contentPlanning}>
                        <Text style={styles.subTitle}>Continue Planejando</Text>
                        {viagens && viagens.length > 0 ? (
                            <ViagemCard viagem={viagens[0]} onPress={() => handleViagemPress(viagens[0])} />
                        ) : (
                            <Text style={styles.title}>Nenhuma viagem encontrada</Text>
                        )}
                    </View>

                    <View style={styles.contentPlanning}>
                        <Text style={styles.subTitle}>Destinos Populares</Text>
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