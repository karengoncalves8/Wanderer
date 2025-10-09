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
import styles from './styles';

export default function Register() {

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
                            <Text style={styles.title}>Cadastrar</Text>
                            <ScrollView 
                                style={styles.formLogin}
                                contentContainerStyle={styles.scrollContent}
                                keyboardShouldPersistTaps="handled"
                                showsVerticalScrollIndicator={false}
                            >
                                <InputWithIcon 
                                    label="Nome"
                                    placeholder="Digite seu nome"
                                    Icon={FaIcon} 
                                    iconProps={{ name: 'user' }} 
                                    inputType="default"
                                    onChangeText={setNome}
                                    value={nome}  
                                />
                                <InputDateWithIcon 
                                    label="Data de Nascimento"
                                    placeholder="2025/08/02"
                                    Icon={Icon} 
                                    iconProps={{ name: 'calendar-month-outline' }} 
                                    onChange={setDataNascimento}
                                    value={dataNascimento}  
                                />
                                <InputWithIcon 
                                    label="Email"
                                    placeholder="Digite seu email"
                                    Icon={MaIcon} 
                                    iconProps={{ name: 'alternate-email' }} 
                                    inputType="email-address"
                                    onChangeText={setEmail}
                                    value={email}  
                                />
                                <InputPassword 
                                    label="Senha"
                                    placeholder="Digite sua senha"
                                    onChangeText={setPassword}
                                    value={password}  
                                />
                                <InputWithIcon 
                                    label="Cidade"
                                    placeholder="Digite sua cidade"
                                    Icon={SimpleIcon} 
                                    iconProps={{ name: 'location-pin' }} 
                                    inputType="default"
                                    onChangeText={setCidade}
                                    value={cidade}  
                                />
                                <InputWithIcon 
                                    label="País"
                                    placeholder="Digite seu país"
                                    Icon={SimpleIcon} 
                                    iconProps={{ name: 'location-pin' }} 
                                    inputType="default"
                                    onChangeText={setPais}
                                    value={pais}  
                                />
                            </ScrollView>
                            <Button label='Próximo' style={styles.Button} onPress={() => setProcessStep(2)}/>
                        </View>   
                    ) : (
                        <View style={styles.caixaCheckBox}>
                            <Text style={styles.title}>Preferências</Text>
                            <ScrollView 
                                contentContainerStyle={styles.scrollContent}
                                keyboardShouldPersistTaps="handled"
                                showsVerticalScrollIndicator={false}
                            >
                                <Text style={styles.label}>Idioma</Text>
                                <SelectList 
                                    setSelected={(val: string) => setIdioma(val as PrefIdioma)} 
                                    data={data} 
                                    save="key"
                                    placeholder='Português-BR'
                                    searchPlaceholder='pesquisar'
                                    maxHeight={120}
                                    boxStyles={styles.selectBox}
                                />
                
                                <Text style={styles.label}>Para me locomover na viagem eu prefiro:</Text>
                                <RadioButton.Group onValueChange={value => setTransporte(value as PrefTransporte)} value={transporte}>
                                    <View style={styles.checkBox}>
                                        <RadioButton.Item value={PrefTransporte.Aviao} label="Avião" style={styles.radioItem}/>
                                        <RadioButton.Item label="Carro" value={PrefTransporte.Carro} style={styles.radioItem}/>
                                        <RadioButton.Item label="Ônibus" value={PrefTransporte.Onibus} style={styles.radioItem}/>
                                        <RadioButton.Item label="Trem" value={PrefTransporte.Trem} style={styles.radioItem}/>
                                    </View>
                                </RadioButton.Group>
                                
                                <Text style={styles.label}>Prefiro ficar hospedado em:</Text>
                                <RadioButton.Group onValueChange={value => setAcomodacao(value as PrefAcomodacao)} value={acomodacao}>
                                    <View style={styles.checkBox}>
                                        <RadioButton.Item value={PrefAcomodacao.Hotel} label="Hotel" style={styles.radioItem}/>
                                        <RadioButton.Item label="Apartamento" value={PrefAcomodacao.Apartamento} style={styles.radioItem}/>
                                        <RadioButton.Item label="Hostel" value={PrefAcomodacao.Hostel} style={styles.radioItem}/>
                                        <RadioButton.Item label="Pousada" value={PrefAcomodacao.Pousada} style={styles.radioItem}/>
                                    </View>
                                </RadioButton.Group>
                                
                                <Text style={styles.label}>Como está o meu orçamento:</Text>
                                <RadioButton.Group onValueChange={value => setOrcamento(value as PrefOrcamento)} value={orcamento}>
                                    <View style={styles.checkBox}>
                                        <RadioButton.Item value={PrefOrcamento.Baixo} label="Baixo" style={styles.radioItem}/>
                                        <RadioButton.Item label="Medio" value={PrefOrcamento.Medio} style={styles.radioItem}/>
                                        <RadioButton.Item label="Alto" value={PrefOrcamento.Alto} style={styles.radioItem}/>
                                    </View>
                                </RadioButton.Group>
                            </ScrollView>
                            <Button label='Cadastrar' style={styles.Button} onPress={() => handleSubmit()}/>
                        </View>
                    )}
                </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
