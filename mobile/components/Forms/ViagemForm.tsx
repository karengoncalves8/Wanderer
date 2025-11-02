import InputWithIcon from '@/components/Inputs/InputWithIcon/InputWithIcon';
import { useSession } from '@/context/AuthContext';
import { Viagem } from '@/interfaces/Viagem';
import { viagemService } from '@/services/viagemService';
import { colors } from '@/styles/globalStyles';
import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import GooglePlacesTextInput, { Place } from 'react-native-google-places-textinput';
import Toast from 'react-native-toast-message';
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import Button from '../Buttons/Button';
import InputDateWithIcon from '../Inputs/InputDate/InputDate';

type ViagemFormProps = {
    data: Viagem | undefined
    onClose: () => void
}

const ViagemForm = ({data, onClose}: ViagemFormProps) => {
    const { session } = useSession();
    
    const [nome, setNome ] = useState(data?.nome || '')
    const [dataIda, setDataIda] = useState(data?.dataIda || new Date())
    const [dataVolta, setDataVolta] = useState(data?.dataVolta || new Date())
    const [duracao, setDuracao ] = useState(data?.duracao || '')
    const [destino_cidade, setDestinoCidade ] = useState(data?.destino_cidade || '')
    const [destino_pais, setDestinoPais ] = useState(data?.destino_pais || '')
    const [orcamento, setOrcamento ] = useState('')
    const [img_url, setImgUrl ] = useState(data?.img_url || '')

    const handleSubmit = async () => {
        if(!nome || !dataIda || !dataVolta || !duracao || !destino_cidade || !destino_pais || !orcamento) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Preencha todos os campos!'
            });
            return
        }

        const dados = {
            nome,
            dataIda,
            dataVolta,
            duracao,
            destino_cidade,
            destino_pais,
            img_url
        } as Viagem

        if(data){
            return
        } else {
            try {
                const response = await viagemService.createViagem({
                    ...dados,
                    orcamento: Number(orcamento)
                }, session?.user.id!)
                Toast.show({
                    type: 'success',
                    text1: 'Sucesso',
                    text2: 'Viagem criada com sucesso!'
                });
                onClose();
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    text2: 'Erro ao criar viagem!'
                });
            }
        } 
    }

    const handlePlaceSelect = (place: Place) => {
        let adresses = place.details?.addressComponents;
        let country = adresses?.find((address: any) => address.types.includes("country"))?.shortText;
        let city = adresses?.find((address: any) => address.types.includes("administrative_area_level_2"))?.longText;
        let img_url = place.details?.photos?.[0]?.flagContentUri;
        setDestinoCidade(city);
        setDestinoPais(country);
        setImgUrl(img_url);
    }
    
    return (
         <View style={styles.form}>
                <InputWithIcon 
                    label='Nome'
                    placeholder='Nome da viagem'
                    Icon={SimpleIcon} 
                    iconProps={{ name: 'location-pin' }} 
                    inputType="default"
                    onChangeText={setNome}
                    value={nome}
                /> 
                {process.env.EXPO_PUBLIC_GOOGLE_API_KEY &&
                    <GooglePlacesTextInput
                        apiKey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
                        onPlaceSelect={(place: Place) => handlePlaceSelect(place)}
                        languageCode="pt-BR"
                        fetchDetails={true}
                        detailsFields={["photos", "addressComponents"]}
                        minCharsToFetch={3}
                    />
                }
                
                <View style={styles.inputGroup}>
                    <InputDateWithIcon 
                        label="Data de Ida"
                        placeholder="10/10/2025"
                        Icon={MaIcon} 
                        iconProps={{ name: 'calendar-month-outline' }} 
                        onChange={setDataIda}
                        value={dataIda}  
                    />
                    <InputDateWithIcon 
                        label="Data de Volta"
                        placeholder="10/10/2025"
                        Icon={MaIcon} 
                        iconProps={{ name: 'calendar-month-outline' }} 
                        onChange={setDataVolta}
                        value={dataVolta}  
                    />
                </View>
                <View style={styles.inputGroup}>
                    <InputWithIcon 
                        label="Duração"
                        placeholder="10:00"
                        Icon={MaIcon} 
                        inputType='numeric'
                        iconProps={{ name: 'calendar-month-outline' }} 
                        onChangeText={setDuracao}
                        value={duracao as string}  
                    />
                    <InputWithIcon 
                        label="Orçamento"
                        placeholder="10:00"
                        Icon={MaIcon} 
                        inputType='numeric'
                        iconProps={{ name: 'calendar-month-outline' }} 
                        onChangeText={setOrcamento}
                        value={orcamento as string}  
                    />
                </View>
                <Button 
                    label="Salvar"
                    onPress={() => handleSubmit()}
                />
        </View>
    )
}

export default ViagemForm;

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