import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Viagem } from '@/interfaces/Viagem';
import { colors } from '@/styles/globalStyles';
import TabSelector, { TabItem } from '@/components/Tabs/Tabs';
import { formatDateStringToStringWithBar } from '@/utils/formatters/formatDateToString';
import { formatCurrency } from '@/utils/formatters/formatMoney';
import { useTranslation } from 'react-i18next';

interface TripInfoCardProps {
    viagem: Viagem;
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function TripInfoCard({ viagem, activeTab, onTabChange }: TripInfoCardProps) {
    const { t } = useTranslation();
    const tabs: TabItem[] = [
        { label: t('tabs.overview'), value: 'visao' },
        { label: t('tabs.itinerary'), value: 'itinerario' },
        { label: t('tabs.expenses'), value: 'gastos' },
        { label: t('tabs.lists'), value: 'listas' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.dateRange}>
                    <Text style={styles.dateText}>
                        {formatDateStringToStringWithBar(viagem.dataIda)} - {formatDateStringToStringWithBar(viagem.dataVolta)}
                    </Text>
                </View>
                
                <View style={styles.tripInfo}>
                    <Text style={styles.duration}>{t('tripInfoCard.duration', { days: viagem.duracao })}</Text>
                    <Text style={styles.totalCost}>{t('tripInfoCard.totalSpent', { value: formatCurrency(viagem.gastos?.total || 0) })}</Text>
                </View>
            </View>

            <TabSelector
                tabs={tabs}
                value={activeTab}
                onChange={onTabChange}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    header: {
        padding: 16,
    },
    dateRange: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    dateText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.gray800,
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },    shareText: {
        fontSize: 14,
        color: colors.lblue500,
        fontWeight: '500',
    },
    tripInfo: {
        gap: 4,
    },
    duration: {
        fontSize: 14,
        color: colors.gray600,
    },
    totalCost: {
        fontSize: 14,
        color: colors.gray600,
    },
    tabs: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: colors.lblue500,
    },
    tabText: {
        fontSize: 14,
        color: colors.gray600,
        fontWeight: '500',
    },    activeTabText: {
        color: colors.lblue500,
        fontWeight: '600',
    },
});
