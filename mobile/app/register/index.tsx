import InputWithIcon from '@/components/Inputs/InputWithIcon/InputWithIcon';
import { ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';

import Button from '@/components/Buttons/Button';
import InputDateWithIcon from '@/components/Inputs/InputDate/InputDate';
import InputPassword from '@/components/Inputs/InputPassword/InputPassword';
import { ApiException } from '@/config/apiException';
import { PrefAcomodacao, PrefIdioma, PrefOrcamento, PrefTransporte } from '@/enums/UsuarioPrefs';
import { Usuario } from '@/interfaces/Usuario';
import { usuarioService } from '@/services/usuarioService';
import { colors } from '@/styles/globalStyles';
import { router } from 'expo-router';
import { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { RadioButton } from 'react-native-paper';
import FaIcon from 'react-native-vector-icons/FontAwesome6';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaIcon from 'react-native-vector-icons/MaterialIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import { useTranslation } from 'react-i18next';
import styles from './styles';

export default function Register() {
    const { t } = useTranslation();

	const [processStep, setProcessStep] = useState(1)

    const [ nome, setNome ] = useState('');
    const [ dataNascimento, setDataNascimento ] = useState(new Date());
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ cidade, setCidade ] = useState('');
    const [ pais, setPais ] = useState('');
	
    const [transporte, setTransporte] = useState(PrefTransporte.Aviao);
    const [acomodacao, setAcomodacao] = useState(PrefAcomodacao.Hotel);
    const [orcamento, setOrcamento] = useState(PrefOrcamento.Baixo);

    const [idioma, setIdioma] = useState<PrefIdioma>(PrefIdioma.Portugues);

    const data = [
      {key: PrefIdioma.Portugues, value:'Português'},
      {key: PrefIdioma.Frances, value:'Francês'},
      {key: PrefIdioma.Ingles, value:'Inglês'},
      {key: PrefIdioma.Espanhol, value:'Espanhol'},
    	]

    const handleSubmit = async () => {
        try {
            const usuario: Usuario = {
                nome,
                email,
                dataNascimento,
                senha: password,
                cidade,
                pais,
                preferencias: {
                    idioma,
                    transporte,
                    acomodacao,
                    orcamento,
                }
            }
            const result = await usuarioService.createUser(usuario);
            if (result instanceof ApiException) {
                console.warn('Erro ao criar usuário:', result.message);
            }
            router.replace('/login');
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
        }
    }

    return (
        <KeyboardAvoidingView 
            style={{flex: 1, backgroundColor: colors.gray200}} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ImageBackground 
                    source={require('../../assets/images/paisagem.jpg')}
                    style={{flex: 1}}
                    resizeMode="cover"
                    blurRadius={2} 
                >
                    <View style={styles.container}>
                    {processStep == 1 ? (
                        <View style={styles.caixaCadastrar}> 
                            <Text style={styles.title}>{t('register.title')}</Text>
                            <ScrollView 
                                style={styles.formLogin}
                                contentContainerStyle={styles.scrollContent}
                                keyboardShouldPersistTaps="handled"
                                showsVerticalScrollIndicator={false}
                            >
                                <InputWithIcon 
                                    label={t('register.name')}
                                    placeholder={t('register.namePlaceholder')}
                                    Icon={FaIcon} 
                                    iconProps={{ name: 'user' }} 
                                    inputType="default"
                                    onChangeText={setNome}
                                    value={nome}  
                                />
                                <InputDateWithIcon 
                                    label={t('register.birthDate')}
                                    placeholder="2025/08/02"
                                    Icon={Icon} 
                                    iconProps={{ name: 'calendar-month-outline' }} 
                                    onChange={setDataNascimento}
                                    value={dataNascimento}  
                                />
                                <InputWithIcon 
                                    label={t('register.email')}
                                    placeholder={t('register.emailPlaceholder')}
                                    Icon={MaIcon} 
                                    iconProps={{ name: 'alternate-email' }} 
                                    inputType="email-address"
                                    onChangeText={setEmail}
                                    value={email}  
                                />
                                <InputPassword 
                                    label={t('register.password')}
                                    placeholder={t('register.passwordPlaceholder')}
                                    onChangeText={setPassword}
                                    value={password}  
                                />
                                <InputWithIcon 
                                    label={t('register.city')}
                                    placeholder={t('register.cityPlaceholder')}
                                    Icon={SimpleIcon} 
                                    iconProps={{ name: 'location-pin' }} 
                                    inputType="default"
                                    onChangeText={setCidade}
                                    value={cidade}  
                                />
                                <InputWithIcon 
                                    label={t('register.country')}
                                    placeholder={t('register.countryPlaceholder')}
                                    Icon={SimpleIcon} 
                                    iconProps={{ name: 'location-pin' }} 
                                    inputType="default"
                                    onChangeText={setPais}
                                    value={pais}  
                                />
                            </ScrollView>
                            <Button label={t('register.next')} style={styles.Button} onPress={() => setProcessStep(2)}/>
                        </View>   
                    ) : (
                        <View style={styles.caixaCheckBox}>
                            <Text style={styles.title}>{t('register.preferences')}</Text>
                            <ScrollView 
                                contentContainerStyle={styles.scrollContent}
                                keyboardShouldPersistTaps="handled"
                                showsVerticalScrollIndicator={false}
                            >
                                <Text style={styles.label}>{t('register.language')}</Text>
                                <SelectList 
                                    setSelected={(val: string) => setIdioma(val as PrefIdioma)} 
                                    data={data} 
                                    save="key"
                                    placeholder={t('register.languagePlaceholder')}
                                    searchPlaceholder={t('register.search')}
                                    maxHeight={120}
                                    boxStyles={styles.selectBox}
                                />
                
                                <Text style={styles.label}>{t('register.transportPreference')}</Text>
                                <RadioButton.Group onValueChange={value => setTransporte(value as PrefTransporte)} value={transporte}>
                                    <View style={styles.checkBox}>
                                        <RadioButton.Item value={PrefTransporte.Aviao} label={t('register.transportPlane')} style={styles.radioItem}/>
                                        <RadioButton.Item label={t('register.transportCar')} value={PrefTransporte.Carro} style={styles.radioItem}/>
                                        <RadioButton.Item label={t('register.transportBus')} value={PrefTransporte.Onibus} style={styles.radioItem}/>
                                        <RadioButton.Item label={t('register.transportTrain')} value={PrefTransporte.Trem} style={styles.radioItem}/>
                                    </View>
                                </RadioButton.Group>
                                
                                <Text style={styles.label}>{t('register.accommodationPreference')}</Text>
                                <RadioButton.Group onValueChange={value => setAcomodacao(value as PrefAcomodacao)} value={acomodacao}>
                                    <View style={styles.checkBox}>
                                        <RadioButton.Item value={PrefAcomodacao.Hotel} label={t('register.accommodationHotel')} style={styles.radioItem}/>
                                        <RadioButton.Item label={t('register.accommodationApartment')} value={PrefAcomodacao.Apartamento} style={styles.radioItem}/>
                                        <RadioButton.Item label={t('register.accommodationHostel')} value={PrefAcomodacao.Hostel} style={styles.radioItem}/>
                                        <RadioButton.Item label={t('register.accommodationInn')} value={PrefAcomodacao.Pousada} style={styles.radioItem}/>
                                    </View>
                                </RadioButton.Group>
                                
                                <Text style={styles.label}>{t('register.budget')}</Text>
                                <RadioButton.Group onValueChange={value => setOrcamento(value as PrefOrcamento)} value={orcamento}>
                                    <View style={styles.checkBox}>
                                        <RadioButton.Item value={PrefOrcamento.Baixo} label={t('register.budgetLow')} style={styles.radioItem}/>
                                        <RadioButton.Item label={t('register.budgetMedium')} value={PrefOrcamento.Medio} style={styles.radioItem}/>
                                        <RadioButton.Item label={t('register.budgetHigh')} value={PrefOrcamento.Alto} style={styles.radioItem}/>
                                    </View>
                                </RadioButton.Group>
                            </ScrollView>
                            <Button label={t('register.register')} style={styles.Button} onPress={() => handleSubmit()}/>
                        </View>
                    )}
                </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
