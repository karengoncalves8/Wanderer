import FlightCard from '@/components/Cards/FlightCard';
import { useSession } from '@/context/AuthContext';
import { Voo, VooAPISearch } from '@/interfaces/VooAPI';
import { vooAPIService } from '@/services/vooAPIService';
import { colors } from '@/styles/globalStyles';
import { useLocalSearchParams, useRouter } from 'expo-router/build/hooks';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

export default function BookingFlights() {
    const router = useRouter();
    const { origem, destino, dataPartida, classe } = useLocalSearchParams(); 
    const { session } = useSession();
    const { t, i18n } = useTranslation();

    const [voos, setVoos] = useState<Voo[] | null>(null);

    const fetchResults = async (params: VooAPISearch) => {
        try {
            const data = await vooAPIService.searchVoo(params);
            
            if (Array.isArray(data)) {
                setVoos(data);
            } else {
                console.warn(t('flights.searchError'), data);
                setVoos([]);
            }
        } catch (error) {
            console.log(error);
            setVoos([]);
        }
    };
    
    useEffect(() => {
        fetchResults({
            iataOrigem: String(origem ?? ''),
            iataDestino: String(destino ?? ''),
            dataPartida: String(dataPartida ?? ''),
            classe: Number(classe ?? 0),
            idaEVolta: false,
            usuarioPais: session!.user.pais,
            idioma: session!.user.preferencias.idioma
        });
    }, [origem, destino, dataPartida, classe]);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 12 }}>
            {dataPartida &&
                <Text style={styles.subtitle}>
                    {format(parseISO(dataPartida as string), t('flights.dateFormat'), { locale: i18n.language === 'pt' ? ptBR : undefined })}
                </Text>
            }
            {voos && voos.length > 0 ? (
                <FlatList
                    data={voos}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                    renderItem={({ item }) => (
                        <FlightCard voo={item} />
                    )}
                    contentContainerStyle={{ paddingVertical: 8 }}
                />
            ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: colors.gray300 }}>{t('flights.noFlightsFound')}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    title: {
        flex: 1,
        fontSize: 28,
        color: colors.gray100,
        fontWeight: 'bold',
        textAlignVertical: 'center'
    },
    subtitle: {
        fontSize: 20,
        color: colors.sky500,
        fontWeight: 'bold'
    },
    card: {
        flex: 3,
        backgroundColor: colors.gray200, 
        display: 'flex',
        justifyContent: 'space-around',
        padding: 12,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
    },
    form: {
        display: 'flex',
        gap: 20,
        flexDirection: 'column'
    },
    Button: {

    },
});

