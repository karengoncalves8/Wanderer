import InputDateWithIcon from '@/components/Inputs/InputDate/InputDate';
import InputWithIcon from '@/components/Inputs/InputWithIcon/InputWithIcon';
import Toggle from '@/components/Toggle/Toggle';
import { colors } from '@/styles/globalStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Buttons/Button';
import { useRouter } from 'expo-router';
import { SelectList } from 'react-native-dropdown-select-list';
import FeIcon from 'react-native-vector-icons/Feather';
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import { useTranslation } from 'react-i18next';

export default function Booking() {
    const { t } = useTranslation();

    // Passagens
    const [origem, setOrigem] = useState('');
    const [destino, setDestino] = useState('');
    const [dataPartida, setDataPartida] = useState(new Date());
    const [classe, setClasse] = useState(1);

    // Acomodações
    const [cidade, setCidade] = useState('');
    const [hospedes, setHospedes] = useState(2);
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());

    const [tabOption, setTabOption] = useState(t('booking.tickets'));

    const router = useRouter();

    const handleToggle = (selectedOption: string) => {
        setTabOption(selectedOption);
    };

    const classesOptions = [
        { key: '1', value: t('booking.economy') },
        { key: '2', value: t('booking.premium') },
        { key: '3', value: t('booking.business') },
        { key: '4', value: t('booking.firstClass') },
    ];

    const handleSubmit = async () => {
        try {
            if (tabOption === t('booking.tickets')) {
                const params = {
                    origem,
                    destino,
                    dataPartida: dataPartida.toISOString().split('T')[0],
                    classe,
                };
                router.push({
                    pathname: '/booking-flights',
                    params: params,
                });
            } else {
                const params = {
                    cidade,
                    checkin: checkIn.toISOString().split('T')[0],
                    checkout: checkOut.toISOString().split('T')[0],
                    hospedes,
                };
                router.push({
                    pathname: '/booking-hotel',
                    params: params,
                });
            }
        } catch {
            return;
        }
    };

    return (
        <>
            <LinearGradient
                colors={[colors.lblue500, '#1C8ABF']}
                style={styles.background}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0, 1]}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>{t('booking.title')}</Text>
                    <View style={styles.card}>
                        <Toggle options={[t('booking.tickets'), t('booking.accommodations')]} onToggle={handleToggle} />

                        {tabOption === t('booking.tickets') ? (
                            <View style={styles.form}>
                                <InputWithIcon
                                    label={t('booking.origin')}
                                    placeholder={t('booking.originPlaceholder')}
                                    Icon={FeIcon}
                                    iconProps={{ name: 'circle' }}
                                    inputType="default"
                                    onChangeText={setOrigem}
                                    value={origem}
                                />
                                <InputWithIcon
                                    label={t('booking.destination')}
                                    placeholder={t('booking.destinationPlaceholder')}
                                    Icon={SimpleIcon}
                                    iconProps={{ name: 'location-pin' }}
                                    inputType="default"
                                    onChangeText={setDestino}
                                    value={destino}
                                />
                                <InputDateWithIcon
                                    label={t('booking.departureDate')}
                                    placeholder="2025/08/02"
                                    Icon={MaIcon}
                                    iconProps={{ name: 'calendar-month-outline' }}
                                    onChange={setDataPartida}
                                    value={dataPartida}
                                />
                                <SelectList
                                    setSelected={(val: number) => setClasse(val)}
                                    data={classesOptions}
                                    save="key"
                                    placeholder={t('booking.selectClass')}
                                    searchPlaceholder={t('booking.search')}
                                />
                            </View>
                        ) : (
                            <View style={styles.form}>
                                <InputWithIcon
                                    label={t('booking.city')}
                                    placeholder={t('booking.cityPlaceholder')}
                                    Icon={SimpleIcon}
                                    iconProps={{ name: 'location-pin' }}
                                    inputType="default"
                                    onChangeText={setCidade}
                                    value={cidade}
                                />
                                <InputWithIcon
                                    label={t('booking.guests')}
                                    placeholder={t('booking.guestsPlaceholder')}
                                    Icon={FeIcon}
                                    iconProps={{ name: 'users' }}
                                    inputType="default"
                                    onChangeText={(text: string) => setHospedes(Number(text))}
                                    value={hospedes.toString()}
                                />
                                <InputDateWithIcon
                                    label={t('booking.checkIn')}
                                    placeholder="2025/08/02"
                                    Icon={MaIcon}
                                    iconProps={{ name: 'calendar-month-outline' }}
                                    onChange={setCheckIn}
                                    value={checkIn}
                                />
                                <InputDateWithIcon
                                    label={t('booking.checkOut')}
                                    placeholder="2025/08/02"
                                    Icon={MaIcon}
                                    iconProps={{ name: 'calendar-month-outline' }}
                                    onChange={setCheckOut}
                                    value={checkOut}
                                />
                            </View>
                        )}
                        <Button label={t('booking.search')} style={styles.Button} onPress={() => handleSubmit()} />
                    </View>
                </View>
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        flex: 1,
        fontSize: 28,
        color: colors.gray100,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        marginLeft: 30,
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
        flexDirection: 'column',
    },
    Button: {},
});

