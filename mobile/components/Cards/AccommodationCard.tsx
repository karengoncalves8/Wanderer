import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/globalStyles';
import { useTranslation } from 'react-i18next';

interface AccommodationCardProps {
    name: string;
    dates: string;
    checkIn: string;
    localization: string;
    checkOut: string;
}

export default function AccommodationCard({ name, dates, checkIn, localization, checkOut }: AccommodationCardProps) {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.hotelName}>{name}</Text>
                <Text style={styles.dates}>{dates}</Text>
            </View>
            
            <View style={styles.details}>
                <Text style={styles.address}>{localization}</Text>
                
                <View style={styles.checkInfo}>
                    <View style={styles.checkItem}>
                        <Text style={styles.checkLabel}>{t('booking.checkIn')} {checkIn}</Text>
                    </View>
                    <View style={styles.checkItem}>
                        <Text style={styles.checkLabel}>{t('booking.checkOut')} {checkOut}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },
    header: {
        marginBottom: 8,
    },
    hotelName: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.gray800,
        marginBottom: 4,
    },    dates: {
        fontSize: 14,
        color: colors.lblue500,
        fontWeight: '500',
    },
    details: {
        gap: 8,
    },
    address: {
        fontSize: 14,
        color: colors.gray600,
        lineHeight: 18,
    },
    checkInfo: {
        flexDirection: 'row',
        gap: 16,
    },
    checkItem: {
        flex: 1,
    },
    checkLabel: {
        fontSize: 12,
        color: colors.gray500,
    },
});
