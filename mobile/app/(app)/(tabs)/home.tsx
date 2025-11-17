import ViagemCard from '@/components/Cards/ViagemCard';
import { ApiException } from '@/config/apiException';
import { useSession } from '@/context/AuthContext';
import { Viagem } from '@/interfaces/Viagem';
import { viagemService } from '@/services/viagemService';
import { is } from 'date-fns/locale';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

export default function Home() {
    const { signOut, session } = useSession();
    
    const [viagens, setViagens] = useState<Viagem[] | null>(null);
    const [viagemSelecionada, setViagemSelecionada] = useState(null);

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
            setIsLoading(false);
            return;
        }
        // sort by start date (dataIda) descending so most recent/upcoming appear first
        let sorted = response.sort((a, b) => (new Date(b.dataIda).getTime() - new Date(a.dataIda).getTime()));

        setViagens(sorted);
        setIsLoading(false);
    }

    useEffect(() => {
        // fetch viagens when component mounts or when session changes
        if (session?.user?.id) fetchViagens();
    }, [session]);

    const handleViagemPress = (viagem: Viagem) => {
        router.push({
            pathname: '/trips/[id]',
            params: { id: viagem.id!.toString() }
        } as any);
    };

        
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