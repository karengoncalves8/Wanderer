import InputWithIcon from '@/components/Inputs/InputWithIcon/InputWithIcon';
import { Acomodacao } from '@/interfaces/Acomodacao';
import { colors } from '@/styles/globalStyles';
import { useState } from 'react';
import { StyleSheet, View } from "react-native";
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import InputDateWithIcon from '../Inputs/InputDate/InputDate';
import InputTimeWithIcon from '../Inputs/InputTime/InputTime';
import SelectWithLabel from '../SelectWithLabel/SelectWithLabel';

type AcomodacaoFormProps = {
    data: Acomodacao
}

const AcomodacaoForm = ({data}: AcomodacaoFormProps) => {
    const [nome, setNome ] = useState(data.nome || '')
    const [localizacao, setLocalizacao ] = useState(data.localizacao || '')
    const [checkIn, setCheckIn] = useState(data.check_in || new Date())
    const [checkOut, setCheckOut] = useState(data.check_out || new Date())
    const [preco, setPreco ] = useState(data.preco || '')
    const [gps_lat, setGpsLat ] = useState(data.gps_lat || '')
    const [gps_long, setGpsLong ] = useState(data.gps_long || '')
    const [dias, setDias ] = useState(data.dias || '')
    const [viagemId, setViagemId ] = useState(data.viagemId || 0)
    
    const viagens = [
        { label: 'Viagem 1', value: 1 },
        { label: 'Viagem 2', value: 2 },
        { label: 'Viagem 3', value: 3 },
    ]
    
    return (
         <View style={styles.form}>
                <SelectWithLabel
                    label='Viagem'
                    placeholder='Selecione uma viagem'
                    options={viagens}
                    onChangeOption={(val: number) => setViagemId(val)}
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
                    <InputDateWithIcon 
                        label="Data de Entrada"
                        placeholder="10/10/2025"
                        Icon={MaIcon} 
                        iconProps={{ name: 'calendar-month-outline' }} 
                        onChange={setCheckIn}
                        value={typeof checkIn === 'string' ? new Date(checkIn) : checkIn}  
                    />
                    <InputDateWithIcon 
                        label="Data de Saida"
                        placeholder="10/10/2025"
                        Icon={MaIcon} 
                        iconProps={{ name: 'calendar-month-outline' }} 
                        onChange={setCheckOut}
                        value={typeof checkOut === 'string' ? new Date(checkOut) : checkOut}  
                    />
                </View>
                <View style={styles.inputGroup}>
                    <InputTimeWithIcon 
                        label="Check-in"
                        placeholder="10:00"
                        Icon={MaIcon} 
                        iconProps={{ name: 'calendar-month-outline' }} 
                        onChange={setCheckIn}
                        value={typeof checkIn === 'string' ? new Date(checkIn) : checkIn}  
                    />
                    <InputTimeWithIcon 
                        label="Check-out"
                        placeholder="10:00"
                        Icon={MaIcon} 
                        iconProps={{ name: 'calendar-month-outline' }} 
                        onChange={setCheckOut}
                        value={typeof checkOut === 'string' ? new Date(checkOut) : checkOut}  
                    />
                </View>
                <View style={styles.inputGroup}>
                    <InputWithIcon 
                        label='Preço'
                        placeholder='Preço da acomodacao'
                        Icon={SimpleIcon} 
                        iconProps={{ name: 'location-pin' }} 
                        inputType="numeric"
                        onChangeText={setPreco}
                        value={preco as string}
                    />
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
    )
}

const styles = StyleSheet.create({
    form: {
        display: 'flex',
        gap: 20,
        flexDirection: 'column'
    },
    inputGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    selectBox: {
        borderWidth: 1,
        borderColor: colors.gray300,
        borderRadius: 8,
    },
})