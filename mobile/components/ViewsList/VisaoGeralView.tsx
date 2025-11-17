import { useState } from "react";
import { Viagem } from "@/interfaces/Viagem"
import { View, Text, StyleSheet } from "react-native";
import AccommodationCard from '@/components/Cards/AccommodationCard';
import { List } from 'react-native-paper';
import { formatDateStringToStringWithBar } from '@/utils/formatters/formatDateToString';
import { format } from 'date-fns';
import { colors } from '@/styles/globalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';


type VisaoGeralViewProps = {
    viagem: Viagem;
}

const VisaoGeralView = ({ viagem }: VisaoGeralViewProps) => {

    const [expandedAcomodacoes, setExpandedAcomodacoes] = useState(true);
    const [expandedPassagens, setExpandedPassagens] = useState(true);

    return (
        <View>
            {/* Accommodations Section */}
            <List.Section>
                <List.Accordion
                    title="Acomodações"
                    style={styles.accordionTitle}
                    theme={{ colors: { primary: colors.sky500 } }}
                    left={props => <List.Icon {...props} icon="home-city-outline" />}
                    expanded={expandedAcomodacoes}
                    onPress={() => setExpandedAcomodacoes(!expandedAcomodacoes)}>
                    <View style={styles.accordionContent}>
                        {viagem?.acomodacoes?.map(acomodacao => (
                            <AccommodationCard 
                                key={acomodacao.id}
                                name={acomodacao.nome}
                                dates={`${formatDateStringToStringWithBar(acomodacao.data_entrada)} - ${formatDateStringToStringWithBar(acomodacao.data_saida)}`}
                                checkIn={acomodacao.check_in && typeof acomodacao.check_in === 'string' ? acomodacao.check_in.substring(0, 5) : ''}
                                checkOut={acomodacao.check_out && typeof acomodacao.check_out === 'string' ? acomodacao.check_out.substring(0, 5) : ''}
                            />
                        ))}
                    </View>
                </List.Accordion>
            </List.Section>

            {/* Flights Section */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="chevron-down" size={20} color={colors.gray600} />
                    <Text style={styles.sectionTitle}>Passagens</Text>
                </View>
                <View style={styles.flightCard}>
                    <View style={styles.flightHeader}>
                        <Text style={styles.flightNumber}>Voo 123 - Azul</Text>
                        <Text style={styles.flightDate}>20/05</Text>
                    </View>
                    <View style={styles.flightRoute}>
                        <Text style={styles.flightInfo}>Partida: GRU - 13:40</Text>
                        <Text style={styles.flightInfo}>Chegada: Copacabana - JFK - 16:40</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default VisaoGeralView;

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
});