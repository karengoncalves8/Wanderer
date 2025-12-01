import InputWithIcon from '@/components/Inputs/InputWithIcon/InputWithIcon';
import { Acomodacao } from '@/interfaces/Acomodacao';
import { colors } from '@/styles/globalStyles';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { StyleSheet, View } from "react-native";
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import InputDateWithIcon from '../Inputs/InputDate/InputDate';
import InputTimeWithIcon from '../Inputs/InputTime/InputTime';
import SelectWithLabel from '../SelectWithLabel/SelectWithLabel';
import { ApiException } from '@/config/apiException';
import { viagemService } from '@/services/viagemService';
import { ViagemStatus } from '@/enums/ViagemStatus';
import { useSession } from '@/context/AuthContext';
import Toast from 'react-native-toast-message';
import Button from '../Buttons/Button';
import { acomodacaoService } from '@/services/acomodacaoService';
import { parseTime } from '@/utils/timeRelated/parseTimeString';
import { SelectList } from 'react-native-dropdown-select-list';
import { useTranslation } from 'react-i18next';

type AcomodacaoFormProps = {
    data: Acomodacao
    onClose: () => void
}

const AcomodacaoForm = ({data, onClose}: AcomodacaoFormProps) => {
    const { session } = useSession();
    const { t } = useTranslation();

    const [viagens, setViagens] = useState<Array<{ key: string; value: string }>>([])

    const [nome, setNome ] = useState(data.nome || '')
    const [localizacao, setLocalizacao ] = useState(data.localizacao || '')


    const [checkIn, setCheckIn] = useState<Date | null>(() => {
        if (!data.check_in) return null;
        try {
            return parseTime(data.check_in) || null;
        } catch (e) {
            console.warn('Error parsing check-in time:', e);
            return null;
        }
    });
    const [checkOut, setCheckOut] = useState<Date | null>(() => {
        if (!data.check_out) return null;
        try {
            return parseTime(data.check_out) || null;
        } catch (e) {
            console.warn('Error parsing check-out time:', e);
            return null;
        }
    });
    const [dataEntrada, setDataEntrada] = useState(data.data_entrada || new Date())
    const [dataSaida, setDataSaida] = useState(data.data_saida || new Date())
    const [preco, setPreco ] = useState(data.preco ? data.preco.toString() : '')
    const [gps_lat, setGpsLat ] = useState(data.gps_lat ? data.gps_lat.toString() : '')
    const [gps_long, setGpsLong ] = useState(data.gps_long ? data.gps_long.toString() : '')
    const [dias, setDias ] = useState(data.dias ? data.dias.toString() : '')
    const [viagemId, setViagemId ] = useState(data.viagemId || 0)
    
    const fetchViagens = async () => {
        const response = await viagemService.getAllViagens(session?.user.id!);
        if (response instanceof ApiException) {
            Toast.show({
                type: 'error',
                text1: t('common.error'),
                text2: response.message || t('acomodacaoForm.fetchTripsError')
            });
            return;
        }
        let viagensAtuais = response.filter(v => v.status === ViagemStatus.ATUAL);
        // react-native-dropdown-select-list expects items shaped as { key: string, value: string }
        let formattedViagens = viagensAtuais.map(v => ({ key: v.id!.toString(), value: v.nome }));
        setViagens(formattedViagens);
    }

    useEffect(() => {
        fetchViagens();
    }, [session]);

    const handleSubmit = async () => {
        // Format time values as "HH:mm:ss" strings expected by the API
        let formattedCheckIn = '';
        let formattedCheckOut = '';
        
        try {
            formattedCheckIn = checkIn ? format(new Date(checkIn), 'HH:mm:ss') : '';
            formattedCheckOut = checkOut ? format(new Date(checkOut), 'HH:mm:ss') : '';
        } catch (e) {
            console.error('Error formatting time:', e);
            Toast.show({
                type: 'error',
                text1: t('common.error'),
                text2: t('acomodacaoForm.timeFormatError')
            });
            return;
        }

        let acomodacaoData: Acomodacao = {
            nome,
            localizacao,
            check_in: formattedCheckIn,
            check_out: formattedCheckOut,
            data_entrada: dataEntrada, 
            data_saida: dataSaida,
            tipo: data.tipo,
            preco: Number(preco),
            gps_lat: Number(gps_lat),
            gps_long: Number(gps_long),
            dias: Number(dias),
            viagemId: Number(viagemId)
        };

        try {
            const response = await acomodacaoService.createAcomodacao(acomodacaoData);
            Toast.show({
                type: 'success',
                text1: t('common.success'),
                text2: t('acomodacaoForm.created')
            });
            onClose();
        } catch (error) {
            if (error instanceof ApiException) {
                Toast.show({
                    type: 'error',
                    text1: t('common.error'),
                    text2: error.message || t('acomodacaoForm.createError')
                });
            }
        }
    }

    return (
         <View style={styles.form}>
            <SelectList
                setSelected={(val: string) => setViagemId(Number(val))}
                data={viagens}
                save="key"
                placeholder={t('acomodacaoForm.selectTrip')}
                searchPlaceholder={t('common.search')}
            />  

            <InputWithIcon 
                label={t('acomodacaoForm.name')}
                placeholder={t('acomodacaoForm.namePlaceholder')}
                Icon={SimpleIcon} 
                iconProps={{ name: 'location-pin' }} 
                inputType="default"
                onChangeText={setNome}
                value={nome}
            />
            <InputWithIcon 
                label={t('acomodacaoForm.location')}
                placeholder={t('acomodacaoForm.locationPlaceholder')}
                Icon={SimpleIcon} 
                iconProps={{ name: 'location-pin' }} 
                inputType="default"
                onChangeText={setLocalizacao}
                value={localizacao}
            />
            <View style={styles.inputGroup}>
                <View style={styles.halfInput}>
                    <InputDateWithIcon 
                        label={t('acomodacaoForm.entryDate')}
                        placeholder={t('acomodacaoForm.entryDatePlaceholder')}
                        Icon={MaIcon} 
                        iconProps={{ name: 'calendar-month-outline' }} 
                        onChange={setDataEntrada}
                        value={typeof dataEntrada === 'string' ? new Date(dataEntrada) : dataEntrada}  
                    />
                </View>
                <View style={styles.halfInput}>
                    <InputDateWithIcon 
                        label={t('acomodacaoForm.exitDate')}
                        placeholder={t('acomodacaoForm.exitDatePlaceholder')}
                        Icon={MaIcon} 
                        iconProps={{ name: 'calendar-month-outline' }} 
                        onChange={setDataSaida}
                        value={typeof dataSaida === 'string' ? new Date(dataSaida) : dataSaida}  
                    />
                </View>
            </View>
            <View style={styles.inputGroup}>
                <View style={styles.halfInput}>
                    <InputTimeWithIcon 
                        label={t('acomodacaoForm.checkIn')}
                        placeholder={t('acomodacaoForm.checkInPlaceholder')}
                        Icon={MaIcon} 
                        iconProps={{ name: 'calendar-month-outline' }} 
                        onChange={setCheckIn}
                        value={checkIn}  
                    />
                </View>
                <View style={styles.halfInput}>
                    <InputTimeWithIcon 
                        label={t('acomodacaoForm.checkOut')}
                        placeholder={t('acomodacaoForm.checkOutPlaceholder')}
                        Icon={MaIcon} 
                        iconProps={{ name: 'calendar-month-outline' }} 
                        onChange={setCheckOut}
                        value={checkOut}  
                    />
                </View>
            </View>
            <View style={styles.inputGroup}>
                <View style={styles.halfInput}>
                    <InputWithIcon 
                        label={t('acomodacaoForm.price')}
                        placeholder={t('acomodacaoForm.pricePlaceholder')}
                        Icon={SimpleIcon} 
                        iconProps={{ name: 'location-pin' }} 
                        inputType="numeric"
                        onChangeText={setPreco}
                        value={preco as string}
                    />
                </View>
                <View style={styles.halfInput}>
                    <InputWithIcon 
                        label={t('acomodacaoForm.days')}
                        placeholder={t('acomodacaoForm.daysPlaceholder')}
                        Icon={SimpleIcon} 
                        iconProps={{ name: 'location-pin' }} 
                        inputType="numeric"
                        onChangeText={setDias}
                        value={dias as string}
                    />
                </View>
            </View>
            <Button 
                label={t('common.save')}
                onPress={() => handleSubmit()}
            />
        </View>
    )
}

export default AcomodacaoForm;

const styles = StyleSheet.create({
    form: {
        display: 'flex',
        gap: 20,
        flexDirection: 'column',
        paddingHorizontal: 16,
    },
    inputGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: 12,
    },
    halfInput: {
        flex: 1,
    },
    selectBox: {
        borderWidth: 1,
        borderColor: colors.gray300,
        borderRadius: 8,
    },
})