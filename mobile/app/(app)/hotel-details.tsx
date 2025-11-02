import Button from '@/components/Buttons/Button';
import GenericModal from '@/components/Modals/GenericModal/Modal';
import { AcomodacaoAPI } from '@/interfaces/acomodacaoAPI';
import { colors } from '@/styles/globalStyles';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import {
    Dimensions,
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import MaIcon from 'react-native-vector-icons/MaterialIcons';


const { width } = Dimensions.get('window');

const HotelDetails = () => {
    const { hotelData, checkin, checkout, hospedes } = useLocalSearchParams();

    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    
    const hotel: AcomodacaoAPI = useMemo(() => {
        try {
            return JSON.parse(hotelData as string);
        } catch {
            return {} as AcomodacaoAPI;
        }
    }, [hotelData]);

    const formatBRL = useMemo(() => {
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

    const handleBooking = async () => {
        if (hotel.link) {
            try {
                const supported = await Linking.canOpenURL(hotel.link);
                if (supported) {
                    await Linking.openURL(hotel.link);
                    setOpenConfirmationModal(true);
                } else {
                    console.warn('Não foi possível abrir a URL:', hotel.link);
                }
            } catch (error) {
                console.warn('Erro ao abrir a URL:', hotel.link, error);
            }
        }
    };

    if (!hotel.name) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Erro ao carregar detalhes do hotel</Text>
            </View>
        );
    }

    return (
        <>
            <Stack.Screen 
                options={{
                    title: hotel.name,
                    headerShown: true,
                    headerBackTitle: 'Voltar',
                    headerTitleStyle: { fontSize: 16 },
                }}
            />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Hotel Images */}
                {hotel.images && hotel.images.length > 0 && (
                    <ScrollView 
                        horizontal 
                        pagingEnabled 
                        showsHorizontalScrollIndicator={false}
                        style={styles.imageContainer}
                    >
                        {hotel.images.map((image, index) => (
                            <Image
                                key={index}
                                source={{ uri: image }}
                                style={styles.hotelImage}
                                resizeMode="cover"
                            />
                        ))}
                    </ScrollView>
                )}

                <View style={styles.content}>
                    {/* Hotel Header */}
                    <View style={styles.header}>
                        <Text style={styles.hotelName}>{hotel.name}</Text>
                        <View style={styles.ratingContainer}>
                            <MaIcon name="star" size={20} color="#FFB800" />
                            <Text style={styles.rating}>{hotel.ratings?.toFixed(1)}</Text>
                            <Text style={styles.reviewCount}>({hotel.reviews} avaliações)</Text>
                        </View>
                    </View>

                    {/* Price */}
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>{formatBRL(hotel.prices)}</Text>
                        <Text style={styles.priceSubtext}>por noite</Text>
                    </View>

                    {/* Booking Info */}
                    <View style={styles.bookingInfo}>
                        <View style={styles.bookingRow}>
                            <MaIcon name="event" size={20} color={colors.gray600} />
                            <Text style={styles.bookingText}>
                                Check-in: {checkin} • Check-out: {checkout}
                            </Text>
                        </View>
                        <View style={styles.bookingRow}>
                            <MaIcon name="people" size={20} color={colors.gray600} />
                            <Text style={styles.bookingText}>{hospedes} hóspede(s)</Text>
                        </View>
                    </View>

                    {/* Description */}
                    {hotel.description && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Descrição</Text>
                            <Text style={styles.description}>{hotel.description}</Text>
                        </View>
                    )}

                    {/* Check-in/Check-out Times */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Horários</Text>
                        <View style={styles.timeContainer}>
                            <View style={styles.timeRow}>
                                <Text style={styles.timeLabel}>Check-in:</Text>
                                <Text style={styles.timeValue}>{hotel.check_in_time || 'Não informado'}</Text>
                            </View>
                            <View style={styles.timeRow}>
                                <Text style={styles.timeLabel}>Check-out:</Text>
                                <Text style={styles.timeValue}>{hotel.check_out_time || 'Não informado'}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Amenities */}
                    {hotel.amenities && hotel.amenities.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Comodidades</Text>
                            <View style={styles.amenitiesContainer}>
                                {hotel.amenities.map((amenity, index) => (
                                    <View key={index} style={styles.amenityItem}>
                                        <MaIcon name="check-circle" size={16} color={colors.gray600} />
                                        <Text style={styles.amenityText}>{amenity}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Additional Info */}
                    {hotel.info && hotel.info.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Informações Adicionais</Text>
                            {hotel.info.map((info, index) => (
                                <Text key={index} style={styles.infoItem}>• {info}</Text>
                            ))}
                        </View>
                    )}

                    {/* Location */}
                    {/* <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Localização</Text>
                        <View style={styles.locationContainer}>
                            <MaIcon name="location-on" size={20} color={colors.red500} />
                            <Text style={styles.locationText}>
                                Lat: {hotel.gps_latitude?.toFixed(6)}, Lng: {hotel.gps_longtitude?.toFixed(6)}
                            </Text>
                        </View>
                    </View> */}
                </View>
            </ScrollView>

            {/* Booking Button */}
            <View style={styles.bookingButtonContainer}>
                <TouchableOpacity style={styles.bookingButton} onPress={handleBooking}>
                    <Text style={styles.bookingButtonText}>Reservar Agora</Text>
                </TouchableOpacity>
            </View>

            
            <GenericModal
                visible={openConfirmationModal}
                onClose={() => setOpenConfirmationModal(false)}
                title="Deseja salvar as informações de sua acomodação?"
                footerButtons={
                    <>
                        <Button label="Cancelar" style={styles.modalButton} onPress={() => setOpenConfirmationModal(false)} />
                        <Button label="Salvar" style={styles.modalButton} onPress={() => setOpenConfirmationModal(false)} />
                    </>
                }
            >
                <Text>
                    Vimos que você selecionou a acomodação {hotel.name}, dia {checkin} até {checkout}, para {hospedes} hóspede(s). Caso tenha de fato agendado, podemos salva-lá a sua viagem.
                </Text>
            </GenericModal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray100,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray100,
    },
    errorText: {
        fontSize: 16,
        color: colors.gray600,
    },
    imageContainer: {
        height: 250,
    },
    hotelImage: {
        width: width,
        height: 250,
    },
    content: {
        padding: 20,
        paddingBottom: 100, // Space for booking button
    },
    header: {
        marginBottom: 16,
    },
    hotelName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.gray800,
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    rating: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.gray700,
    },
    reviewCount: {
        fontSize: 14,
        color: colors.gray500,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 20,
        gap: 8,
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.blue800,
    },
    priceSubtext: {
        fontSize: 16,
        color: colors.gray600,
    },
    bookingInfo: {
        backgroundColor: colors.gray200,
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        gap: 8,
    },
    bookingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    bookingText: {
        fontSize: 14,
        color: colors.gray700,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.gray800,
        marginBottom: 12,
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        color: colors.gray700,
    },
    timeContainer: {
        gap: 8,
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeLabel: {
        fontSize: 14,
        color: colors.gray600,
    },
    timeValue: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.gray800,
    },
    amenitiesContainer: {
        gap: 8,
    },
    amenityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    amenityText: {
        fontSize: 14,
        color: colors.gray700,
    },
    infoItem: {
        fontSize: 14,
        color: colors.gray700,
        marginBottom: 4,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    locationText: {
        fontSize: 14,
        color: colors.gray700,
    },
    bookingButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.gray100,
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: colors.gray300,
    },
    bookingButton: {
        backgroundColor: colors.sky500,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    bookingButtonText: {
        color: colors.gray100,
        fontSize: 16,
        fontWeight: '600',
    },
    modalButton: {
        width: 120,
        height: 40,
        fontSize: 12,
        paddingVertical: 2,
    }
});

export default HotelDetails;
