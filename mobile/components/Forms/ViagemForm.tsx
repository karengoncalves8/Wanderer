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
import { calculateDaysBetweenDates }  from '../../utils/dateRelated/calculateDaysBetweenDates';
import { useTranslation } from 'react-i18next';

type ViagemFormProps = {
    data: Viagem | undefined
    onClose: () => void
}

const ViagemForm = ({data, onClose}: ViagemFormProps) => {
    const { session } = useSession();
    const { t } = useTranslation();
    
    const [nome, setNome ] = useState(data?.nome || '')
    const [dataIda, setDataIda] = useState(data?.dataIda || new Date())
    const [dataVolta, setDataVolta] = useState(data?.dataVolta || new Date())
    const [destino_cidade, setDestinoCidade ] = useState(data?.destino_cidade || '')
    const [destino_pais, setDestinoPais ] = useState(data?.destino_pais || '')
    const [orcamento, setOrcamento ] = useState('')
    const [img_url, setImgUrl ] = useState(data?.img_url || '')

    const handleSubmit = async () => {
        if(!nome || !dataIda || !dataVolta || !destino_pais || !orcamento) {
            Toast.show({
                type: 'error',
                text1: t('common.error'),
                text2: t('viagemForm.fillAllFields')
            });
            return
        }

        let duracao = calculateDaysBetweenDates(dataIda, dataVolta);

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
                    text1: t('common.success'),
                    text2: t('viagemForm.tripCreated')
                });
                onClose();
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: t('common.error'),
                    text2: t('viagemForm.tripCreateError')
                });
            }
        } 
    }

    const handlePlaceSelect = (place: Place) => {
        let adresses = place.details?.addressComponents;
        let country = adresses?.find((address: any) => address.types.includes("country"))?.shortText;
        let city = adresses?.find((address: any) => address.types.includes("administrative_area_level_2"))?.longText;
        let img_url = place.details?.photos?.[0]?.name;
        setDestinoPais(country);
        if(city){
            setDestinoCidade(city);
        }
        setImgUrl(img_url);
    }
    
    return (
         <View style={styles.form}>
                <InputWithIcon 
                    label={t('viagemForm.name')}
                    placeholder={t('viagemForm.namePlaceholder')}
                    Icon={SimpleIcon} 
                    iconProps={{ name: 'location-pin' }} 
                    inputType="default"
                    onChangeText={setNome}
                    value={nome}
                /> 
                {true &&
                    <GooglePlacesTextInput
                        apiKey="AIzaSyCh1SXUnWnRQBSuLk8H9TMXD62YOOsKvec"
                        onPlaceSelect={(place: Place) => handlePlaceSelect(place)}
                        languageCode="pt-BR"
                        fetchDetails={true}
                        detailsFields={["photos", "addressComponents"]}
                        minCharsToFetch={3}
                    />
                }
                
                <View style={styles.inputGroup}>
                    <InputDateWithIcon 
                        label={t('viagemForm.departureDate')}
                        placeholder={t('viagemForm.departureDatePlaceholder')}
                        Icon={MaIcon} 
                        iconProps={{ name: 'calendar-month-outline' }} 
                        onChange={setDataIda}
                        value={dataIda}  
                    />
                    <InputDateWithIcon 
                        label={t('viagemForm.returnDate')}
                        placeholder={t('viagemForm.returnDatePlaceholder')}
                        Icon={MaIcon} 
                        iconProps={{ name: 'calendar-month-outline' }} 
                        onChange={setDataVolta}
                        value={dataVolta}  
                    />
                </View>
                <InputWithIcon 
                    label={t('viagemForm.budget')}
                    placeholder={t('viagemForm.budgetPlaceholder')}
                    Icon={MaIcon} 
                    inputType='numeric'
                    iconProps={{ name: 'calendar-month-outline' }} 
                    onChangeText={setOrcamento}
                    value={orcamento as string}  
                />
                <Button 
                    label={t('common.save')}
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