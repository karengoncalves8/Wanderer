
import { useSession } from '@/context/AuthContext';
import { AcomodacaoAPI, AcomodacaoAPISearch } from '@/interfaces/acomodacaoAPI';
import { acomodacaoAPIService } from '@/services/acomodacaoAPIService';
import { colors } from '@/styles/globalStyles';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MaIcon from 'react-native-vector-icons/MaterialIcons';



export default function BookingFlights() {
    const { cidade, checkin, checkout, hospedes } = useLocalSearchParams(); 
    const { session } = useSession();

    const [acomocodacoes, setAcomodacoes] = useState<AcomodacaoAPI[] | null>(null);
    
    const formatBRL = useMemo(() => {
        // Try Intl first; fallback if not available
        try {
            const f = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
            return (value: number) => f.format(value);
        } catch {
            return (value: number) => `R$ ${value
                .toFixed(2)
                .replace('.', ',')
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
        }
    }, []);
    
    const fetchResults = async (params: AcomodacaoAPISearch) => {
        try{
            const data = await acomodacaoAPIService.searchAcomodacao(params);
            if (Array.isArray(data)) {
                setAcomodacoes(data);
            } else {
                console.warn('Erro na busca de acomodações:', data);
                setAcomodacoes([]);
            }
        } catch (error) {
            console.log(error);
            setAcomodacoes([]);
        }
    }
    
    useEffect(() => {
        fetchResults({
            cidade: String(cidade ?? ''),
            checkin: String(checkin ?? ''),
            checkout: String(checkout ?? ''),
            hospedes: Number(hospedes ?? 0),
            usuarioPais: session!.user.pais,
            idioma: session!.user.preferencias.idioma
        })
    }, [cidade, checkin, checkout, hospedes])
    

    return (
        <View style={{ flex: 1, backgroundColor: colors.gray100, padding: 12 }}>
            {cidade &&
                <Text style={styles.subtitle}>Acomodações em {cidade}</Text>
            }
            {acomocodacoes && acomocodacoes.length > 0 ? (
                <FlatList
                    data={acomocodacoes}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                    renderItem={({ item }) => (
                        <Pressable
                            style={styles.card}
                            android_ripple={{ color: '#eee' }}
                            onPress={() => {
                                router.push({
                                    pathname: '/hotel-details',
                                    params: {
                                        hotelData: JSON.stringify(item),
                                        checkin,
                                        checkout,
                                        hospedes
                                    }
                                });
                            }}
                            accessibilityRole="button"
                            accessibilityLabel={`Abrir detalhes de ${item.name}`}
                        >
                            {typeof item.images?.[0] === 'string' && item.images[0].startsWith('http') ? (
                                <Image
                                    source={{ uri: item.images[0] }}
                                    style={styles.cardImage}
                                    resizeMode="cover"
                                    onError={(e) => {
                                        console.warn('Falha ao carregar imagem da acomodação:', item.name, item.images?.[0], e?.nativeEvent);
                                    }}
                                />
                            ) : (
                                <View style={[styles.cardImage, styles.imagePlaceholder]}>
                                    <MaIcon name="image" size={28} color={colors.gray400} />
                                </View>
                            )}
                            <View style={styles.cardBody}>
                                <View style={styles.titleRow}>
                                    <Text style={styles.titleText} numberOfLines={1}>
                                        {item.name}
                                    </Text>
                                    <View style={styles.ratingRow}>
                                        <MaIcon name="star" size={16} color="#FFB800" />
                                        <Text style={styles.ratingText}>{item.ratings?.toFixed?.(1) ?? item.ratings}</Text>
                                        <Text style={styles.reviewCountText}>({item.reviews})</Text>
                                    </View>
                                </View>

                                {item.info && item.info.length > 0 && (
                                    <Text style={styles.infoRow} numberOfLines={1}>
                                        {item.info.filter(Boolean).slice(0, 3).join('  •  ')}
                                    </Text>
                                )}

                                <Text style={styles.priceText}>{formatBRL(item.prices)}</Text>
                            </View>
                        </Pressable>
                    )}
                    contentContainerStyle={{ paddingVertical: 8 }}
                />
            ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: colors.gray300 }}>Nenhuma acomodação encontrada</Text>
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
        backgroundColor: colors.gray100,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: 170,
    },
    imagePlaceholder: {
        backgroundColor: colors.gray200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardBody: {
        paddingHorizontal: 14,
        paddingVertical: 12,
        gap: 8,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
    },
    titleText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: colors.gray800,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.gray700,
    },
    reviewCountText: {
        fontSize: 12,
        color: colors.gray500,
    },
    infoRow: {
        fontSize: 13,
        color: colors.gray600,
    },
    priceText: {
        marginTop: 4,
        fontSize: 16,
        fontWeight: '700',
        color: colors.blue800,
    },
    form: {
        display: 'flex',
        gap: 20,
        flexDirection: 'column'
    },
    Button: {

    },
});

