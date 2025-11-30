import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { Viagem } from '@/interfaces/Viagem';
import { viagemService } from '@/services/viagemService';
import { ApiException } from '@/config/apiException';
import { colors } from '@/styles/globalStyles';
import TripInfoCard from '@/components/Cards/TripInfoCard';
import VisaoGeralView from '@/components/ViewsList/VisaoGeralView';
import ItineraryView from '@/components/ViewsList/ItineraryView';
import GenericModal from '@/components/Modals/GenericModal/Modal';
import AtividadeForm from '@/components/Forms/AtividadeForm';
import { atividadeService } from '@/services/atividadeService';
import { Atividade } from '@/interfaces/Atividade';
import GastosView from '@/components/ViewsList/GastosView';
import ListasView from '@/components/ViewsList/ListasView';

export default function TripDetails() {
    const { id } = useLocalSearchParams();
    const [viagem, setViagem] = useState<Viagem | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<string>('visao');
    const [atividadeModalOpen, setAtividadeModalOpen] = useState(false);
    const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);

    const fetchViagemDetails = async () => {
        if (!id) return;
        
        setLoading(true);
        const response = await viagemService.getViagemById(Number(id));
        
        if (response instanceof ApiException) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: response.message || 'Erro ao carregar detalhes da viagem.'
            });
            return;
        }

        console.log("viagem", response)
        
        setViagem(response);
        setLoading(false);
    };

    useEffect(() => {
        fetchViagemDetails();
    }, [id]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    if (!viagem) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text>Viagem não encontrada</Text>
            </View>
        );
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'visao':
                return <VisaoGeralView viagem={viagem} />;
            case 'itinerario':
                return <ItineraryView viagem={viagem} acomodacoes={viagem.acomodacoes} atividades={viagem.atividades} passagens={viagem.passagens} setDataSelecionada={setDataSelecionada} />;
            case 'gastos':
                return <GastosView viagem={viagem} onCreated={() => fetchViagemDetails()}/>;
            case 'listas':
                return <ListasView viagem={viagem} onCreated={() => fetchViagemDetails()} />;
            default:
                return <VisaoGeralView viagem={viagem} />;
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color={colors.lblue500} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{viagem.nome}</Text>
                <TouchableOpacity style={styles.shareButton}>
                    <Ionicons name="share-outline" size={24} color={colors.lblue500} />
                </TouchableOpacity>
            </View>

            {/* Trip Info Card */}
            <TripInfoCard viagem={viagem} activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Content */}
            {renderTabContent()}

            {activeTab === 'itinerario' && (
                <View style={styles.floatButtons}>
                    <TouchableOpacity
                        style={styles.fab}
                        onPress={() => router.push({
                            pathname: '/itinerary-map',
                            params: { viagemId: viagem.id, data: dataSelecionada }
                        })}
                        accessibilityLabel="Visualizar atividade no mapa"
                    >
                        <FontAwesomeIcon name="map-marked-alt" size={28} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.fab}
                        onPress={() => setAtividadeModalOpen(true)}
                        accessibilityLabel="Adicionar atividade"
                    >
                        <Ionicons name="add" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}

            <GenericModal
                visible={atividadeModalOpen}
                title="Nova Atividade"
                onClose={() => setAtividadeModalOpen(false)}
            >
                {viagem && (
                    <AtividadeForm
                        viagemId={viagem.id!}
                        dataIda={new Date(viagem.dataIda)}
                        dataVolta={new Date(viagem.dataVolta)}
                        onClose={() => setAtividadeModalOpen(false)}
                        onCreated={() => { fetchViagemDetails(); }}
                    />
                )}
            </GenericModal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray200,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.gray800,
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 16,
    },
    shareButton: {
        padding: 8,
    },
    section: {
        marginTop: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.gray800,
        marginLeft: 8,
    },
    accordionTitle: {
        backgroundColor: colors.gray200
    },
    accordionContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 5,
        marginLeft: -20,
    },
    flightCard: {
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginBottom: 8,
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },
    flightHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    flightNumber: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.gray800,
    },
    flightDate: {
        fontSize: 14,
        color: colors.lblue500,
        fontWeight: '500',
    },
    flightRoute: {
        gap: 4,
    },
    flightInfo: {
        fontSize: 14,
        color: colors.gray600,
    },
    tabContent: {
        padding: 16,
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,
    },
    floatButtons: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },  
    fab: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.lblue500,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
});