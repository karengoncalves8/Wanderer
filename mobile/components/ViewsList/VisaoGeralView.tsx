import { useEffect, useState } from "react";
import { Viagem } from "@/interfaces/Viagem";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import AccommodationCard from '@/components/Cards/AccommodationCard';
import { List, ActivityIndicator } from 'react-native-paper';
import { formatDateStringToStringWithBar } from '@/utils/formatters/formatDateToString';
import { format } from 'date-fns';
import { colors } from '@/styles/globalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { useSession } from "@/context/AuthContext";
import { Destino } from "@/interfaces/Destino";
import { destinoService } from '@/services/destinoSevice';
import { ApiException } from '@/config/apiException';
import Toast from 'react-native-toast-message';

type VisaoGeralViewProps = {
    viagem: Viagem;
};

const VisaoGeralView = ({ viagem }: VisaoGeralViewProps) => {
    const { t } = useTranslation();
    const { session } = useSession();

    const [expandedAcomodacoes, setExpandedAcomodacoes] = useState(true);
    const [expandedPassagens, setExpandedPassagens] = useState(true);
    const [destinationGuide, setDestinationGuide] = useState<Destino | null>(null);
    const [expandedDestinationGuide, setExpandedDestinationGuide] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDestinationGuide = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await destinoService.getDestinationGuide(
                viagem?.destino_cidade || viagem?.destino_pais || '',
                session?.user?.pais || 'br',
                session?.user?.preferencias?.idioma || 'pt'
            );
            
            if (response instanceof ApiException) {
                throw new Error(response.message || t('destinationDetails.fetchError'));
            }
            setDestinationGuide(response);
        } catch (err) {
            setError(t('destinationDetails.errorLoadingData'));
            console.error('Error fetching destination guide:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDestinationGuide();
    }, [viagem]);

    const renderDestinationGuide = () => {
        if (loading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color={colors.blue800} />
                    <Text style={styles.loadingText}>{t('common.loading')}...</Text>
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.errorContainer}>
                    <Ionicons name="warning-outline" size={24} color={colors.gray600} />
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity 
                        style={styles.retryButton}
                        onPress={fetchDestinationGuide}
                    >
                        <Text style={styles.retryButtonText}>{t('destinationDetails.retry')}</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        if (!destinationGuide?.results) {
            return (
                <View style={styles.noDataContainer}>
                    <Ionicons name="information-circle-outline" size={24} color={colors.gray500} />
                    <Text style={styles.noDataText}>{t('destinationDetails.noGuideAvailable')}</Text>
                </View>
            );
        }

        return (
            <View style={styles.guideContent}>
                {/* General Tips Section */}
                {destinationGuide.results.general_tips?.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="bulb-outline" size={20} color={colors.blue800} />
                            <Text style={styles.sectionTitle}>
                                {t('destinationDetails.generalTips')}
                            </Text>
                        </View>
                        <View style={styles.tipsContainer}>
                            {destinationGuide.results.general_tips.map((tip, index) => (
                                <View key={`tip-${index}`} style={styles.tipCard}>
                                    <Text style={styles.tipTitle}>{tip.title}</Text>
                                    <Text style={styles.tipContent}>{tip.content}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Safety Information Section */}
                {destinationGuide.results.safety_info?.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="shield-checkmark-outline" size={20} color={colors.blue800} />
                            <Text style={styles.sectionTitle}>
                                {t('destinationDetails.safetyInfo')}
                            </Text>
                        </View>
                        <View style={styles.tipsContainer}>
                            {destinationGuide.results.safety_info.map((safety, index) => (
                                <View key={`safety-${index}`} style={[styles.tipCard, styles.safetyCard]}>
                                    <Text style={styles.tipTitle}>{safety.title}</Text>
                                    <Text style={styles.tipContent}>{safety.content}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Climate Section */}
                {destinationGuide.results.climate?.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="partly-sunny-outline" size={20} color={colors.blue800} />
                            <Text style={styles.sectionTitle}>
                                {t('destinationDetails.climate')}
                            </Text>
                        </View>
                        <View style={styles.climateContainer}>
                            {destinationGuide.results.climate.map((season, index) => (
                                <View key={`climate-${index}`} style={styles.climateCard}>
                                    <Text style={styles.climateSeason}>
                                        {season.season} {season.period && `(${season.period})`}
                                    </Text>
                                    <Text style={styles.climateDescription}>
                                        {season.characteristics}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Documents Section */}
                {destinationGuide.results.documents?.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="document-text-outline" size={20} color={colors.blue800} />
                            <Text style={styles.sectionTitle}>
                                {t('destinationDetails.documentsRequired')}
                            </Text>
                        </View>
                        <View style={styles.documentsContainer}>
                            {destinationGuide.results.documents.map((doc, index) => (
                                <View key={`doc-${index}`} style={styles.documentCard}>
                                    <Text style={styles.docName}>{doc.name}</Text>
                                    {doc.description && (
                                        <Text style={styles.docDescription}>{doc.description}</Text>
                                    )}
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            </View>
        );
    };

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            {/* Accommodations Section */}
            <List.Section style={styles.sectionContainer}>
                <List.Accordion
                    title={t('overview.accommodations')}
                    style={styles.accordion}
                    titleStyle={styles.accordionTitle}
                    descriptionStyle={styles.accordionDescription}
                    theme={{ colors: { primary: colors.blue800 } }}
                    left={props => <List.Icon {...props} icon="home-city-outline" color={colors.blue800} />}
                    expanded={expandedAcomodacoes}
                    onPress={() => setExpandedAcomodacoes(!expandedAcomodacoes)}
                >
                    <View style={styles.accordionContent}>
                        {viagem?.acomodacoes?.map(acomodacao => (
                            <AccommodationCard 
                                key={acomodacao.id}
                                name={acomodacao.nome}
                                localization={acomodacao.localizacao}
                                dates={`${formatDateStringToStringWithBar(acomodacao.data_entrada)} - ${formatDateStringToStringWithBar(acomodacao.data_saida)}`}
                                checkIn={acomodacao.check_in && typeof acomodacao.check_in === 'string' ? acomodacao.check_in.substring(0, 5) : ''}
                                checkOut={acomodacao.check_out && typeof acomodacao.check_out === 'string' ? acomodacao.check_out.substring(0, 5) : ''}
                            />
                        ))}
                    </View>
                </List.Accordion>
            </List.Section>

            {/* Flights Section */}
            <List.Section style={styles.sectionContainer}>
                <List.Accordion
                    title={t('overview.flights')}
                    style={styles.accordion}
                    titleStyle={styles.accordionTitle}
                    descriptionStyle={styles.accordionDescription}
                    theme={{ colors: { primary: colors.blue800 } }}
                    left={props => <List.Icon {...props} icon="airplane" color={colors.blue800} />}
                    expanded={expandedPassagens}
                    onPress={() => setExpandedPassagens(!expandedPassagens)}
                >
                    <View style={styles.accordionContent}>
                        {viagem?.passagens?.map((passagem, index) => {
                            const rawDate1 = passagem?.passagemLocais?.[0]?.data;
                            const displayDate1 = rawDate1
                                ? (typeof rawDate1 === 'string' ? format(new Date(rawDate1), 'dd/MM') : format(rawDate1, 'dd/MM'))
                                : '--/--';
                            const rawDate2 = passagem?.passagemLocais?.[1]?.data;
                            const displayDate2 = rawDate2
                                ? (typeof rawDate2 === 'string' ? format(new Date(rawDate2), 'dd/MM') : format(rawDate2, 'dd/MM'))
                                : '--/--';
                            return (
                                <View key={passagem.id ?? `flight-${index}`} style={styles.flightCard}>
                                    <View style={styles.flightHeader}>
                                        <Text style={styles.flightNumber}>{passagem.numero || `Flight ${index + 1}`}</Text>
                                    </View>
                                    <View style={styles.flightRoute}>
                                        <View style={styles.flightLeg}>
                                            <Ionicons name="airplane" size={16} color={colors.blue800} style={styles.flightIcon} />
                                            <View>
                                                <Text style={styles.flightLocation}>{passagem.passagemLocais?.[0]?.localizacao || '--'}</Text>
                                                <Text style={styles.flightIata}>{passagem.passagemLocais?.[0]?.iata || '---'}</Text>
                                            </View>
                                            <Text style={styles.flightDate}>{displayDate1}</Text>
                                        </View>
                                        <View style={styles.flightLeg}>
                                            <Ionicons name="airplane-land" size={16} color={colors.blue800} style={styles.flightIcon} />
                                            <View>
                                                <Text style={styles.flightLocation}>{passagem.passagemLocais?.[1]?.localizacao || '--'}</Text>
                                                <Text style={styles.flightIata}>{passagem.passagemLocais?.[1]?.iata || '---'}</Text>
                                            </View>
                                            <Text style={styles.flightDate}>{displayDate2}</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </List.Accordion>
            </List.Section>

            {/* Destination Guide Section */}
            <List.Section style={styles.sectionContainer}>
                <List.Accordion
                    title={t('destinationDetails.destinationGuide')}
                    style={styles.accordion}
                    titleStyle={styles.accordionTitle}
                    descriptionStyle={styles.accordionDescription}
                    theme={{ colors: { primary: colors.blue800 } }}
                    left={props => <List.Icon {...props} icon="map-outline" color={colors.blue800} />}
                    expanded={expandedDestinationGuide}
                    onPress={() => setExpandedDestinationGuide(!expandedDestinationGuide)}
                >
                    {renderDestinationGuide()}
                </List.Accordion>
            </List.Section>

            {/* Add some bottom padding to ensure content isn't hidden by navigation */}
            <View style={{ height: 30 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContent: {
        paddingBottom: 24,
    },
    sectionContainer: {
        marginTop: 16,
        paddingHorizontal: 16,
    },
    accordion: {
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 8,
    },
    accordionTitle: {
        fontWeight: '600',
        color: colors.gray800,
    },
    accordionDescription: {
        color: colors.gray600,
        fontSize: 13,
        marginTop: 2,
    },
    accordionContent: {
        padding: 8,
    },
    // Flight Card Styles
    flightCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 3,
        borderLeftColor: colors.blue800,
    },
    flightHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray200,
    },
    flightNumber: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.blue800,
    },
    flightRoute: {
        gap: 12,
    },
    flightLeg: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    flightIcon: {
        width: 24,
        textAlign: 'center',
    },
    flightLocation: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
        color: colors.gray800,
    },
    flightIata: {
        fontSize: 12,
        color: colors.gray600,
        width: 40,
    },
    flightDate: {
        fontSize: 13,
        color: colors.gray700,
        fontWeight: '500',
        width: 50,
        textAlign: 'right',
    },
    // Guide Content Styles
    guideContent: {
        padding: 8,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.gray800,
        marginLeft: 8,
    },
    tipsContainer: {
        marginTop: 8,
    },
    tipCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 3,
        borderLeftColor: colors.blue800,
    },
    safetyCard: {
        borderLeftColor: '#dc3545',
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.gray800,
        marginBottom: 6,
    },
    tipContent: {
        fontSize: 14,
        color: colors.gray600,
        lineHeight: 20,
    },
    climateContainer: {
        marginTop: 8,
    },
    climateCard: {
        backgroundColor: '#f0f7ff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    climateSeason: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.blue800,
        marginBottom: 4,
    },
    climateDescription: {
        fontSize: 14,
        color: colors.gray700,
        lineHeight: 20,
    },
    documentsContainer: {
        marginTop: 8,
    },
    documentCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    docName: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.gray800,
        marginBottom: 4,
    },
    docDescription: {
        fontSize: 13,
        color: colors.gray600,
        lineHeight: 18,
    },
    // Loading and Error States
    loadingContainer: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 8,
        color: colors.gray600,
    },
    errorContainer: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff8f8',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ffebee',
    },
    errorText: {
        color: colors.gray800,
        marginTop: 8,
        marginBottom: 12,
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: colors.blue800,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    retryButtonText: {
        color: '#fff',
        fontWeight: '500',
    },
    noDataContainer: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
    },
    noDataText: {
        color: colors.gray600,
        marginTop: 8,
        textAlign: 'center',
    },
});

export default VisaoGeralView;