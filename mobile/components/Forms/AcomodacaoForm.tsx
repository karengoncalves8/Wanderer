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

type AcomodacaoFormProps = {
    data: Acomodacao
    onClose: () => void
}

const AcomodacaoForm = ({data, onClose}: AcomodacaoFormProps) => {
    const { session } = useSession();

    const [viagens, setViagens] = useState<Array<{ key: string; value: string }>>([])

    const [nome, setNome ] = useState(data.nome || '')
    const [localizacao, setLocalizacao ] = useState(data.localizacao || '')


    const [checkIn, setCheckIn] = useState<Date | null>(parseTime(data.check_in) || null);
    const [checkOut, setCheckOut] = useState<Date | null>(parseTime(data.check_out) || null);
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
                text1: 'Erro',
                text2: response.message || 'Erro ao consultar viagens.'
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
        const formattedCheckIn = checkIn ? format(checkIn, 'HH:mm:ss') : '';
        const formattedCheckOut = checkOut ? format(checkOut, 'HH:mm:ss') : '';

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
                text1: 'Sucesso',
                text2: 'Acomodação criada com sucesso.'
            });
            onClose();
        } catch (error) {
            if (error instanceof ApiException) {
                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    text2: error.message || 'Erro ao criar acomodação.'
                });
            }
        }
    }

    return (
         <View style={styles.form}>
            <SelectList
                // setSelected receives the saved property (we'll save the key which is the id as string)
                setSelected={(val: string) => setViagemId(Number(val))}
                data={viagens}
                // data items are { key: string, value: string } so save the key to get the id
                save="key"
                placeholder='Selecione uma viagem'
                searchPlaceholder='Pesquisar'
            />  

            <InputWithIcon 
                label='Nome'
                placeholder='Nome da acomodacao'
                Icon={SimpleIcon} 
                iconProps={{ name: 'location-pin' }} 
                inputType="default"
                onChangeText={setNome}
                value={nome}
            />
            <InputWithIcon 
                label='Localização'
                placeholder='Localização da acomodacao'
                Icon={SimpleIcon} 
                iconProps={{ name: 'location-pin' }} 
                inputType="default"
                onChangeText={setLocalizacao}
                value={localizacao}
            />
            <View style={styles.inputGroup}>
                <View style={styles.halfInput}>
                    <InputDateWithIcon 
                        label="Data de Entrada"
                        placeholder="10/10/2025"
                        Icon={MaIcon} 
                        iconProps={{ name: 'calendar-month-outline' }} 
                        onChange={setDataEntrada}
                        value={typeof dataEntrada === 'string' ? new Date(dataEntrada) : dataEntrada}  
                    />
                </View>
                <View style={styles.halfInput}>
                    <InputDateWithIcon 
                        label="Data de Saida"
                        placeholder="10/10/2025"
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
                        label="Check-in"
                        placeholder="10:00"
                        Icon={MaIcon} 
                        iconProps={{ name: 'calendar-month-outline' }} 
                        onChange={setCheckIn}
                        value={checkIn}  
                    />
                </View>
                <View style={styles.halfInput}>
                    <InputTimeWithIcon 
                        label="Check-out"
                        placeholder="10:00"
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
                        label='Preço'
                        placeholder='Preço da acomodacao'
                        Icon={SimpleIcon} 
                        iconProps={{ name: 'location-pin' }} 
                        inputType="numeric"
                        onChangeText={setPreco}
                        value={preco as string}
                    />
                </View>
                <View style={styles.halfInput}>
                    <InputWithIcon 
                        label='Dias'
                        placeholder='Dias da acomodacao'
                        Icon={SimpleIcon} 
                        iconProps={{ name: 'location-pin' }} 
                        inputType="numeric"
                        onChangeText={setDias}
                        value={dias as string}
                    />
                </View>
            </View>
            <Button 
                label="Salvar"
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