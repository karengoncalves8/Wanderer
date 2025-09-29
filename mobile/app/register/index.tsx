import InputWithIcon from '@/components/Inputs/InputWithIcon/InputWithIcon';
import { Text, View } from 'react-native';

import Button from '@/components/Buttons/Button';
import InputDateWithIcon from '@/components/Inputs/InputDate/InputDate';
import InputPassword from '@/components/Inputs/InputPassword/InputPassword';
import { PrefAcomodacao, PrefOrcamento, PrefTransporte } from '@/enums/UsuarioPrefs';
import { Usuario } from '@/interfaces/Usuario';
import { usuarioService } from '@/services/usuarioService';
import { colors } from '@/styles/globalStyles';
import { LinearGradient } from 'expo-linear-gradient';
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

	const [idioma, setIdioma] = useState("portugues");

	const data = [
      {key:'portugues', value:'Português'},
      {key:'frances', value:'Francês'},
      {key:'ingles', value:'Inglês'},
      {key:'espanhol', value:'Espanhol'},
  	]

	
  	const handleSubmit = async () => {
		try {
			const usuario: Usuario = {
				nome,
				email,
				dataNascimento,
				senha: password,
				cidade,
				pais
			}

			await usuarioService.createUser(usuario);

			router.replace('/login');
		} catch (error) {
			console.error('Erro ao fazer login:', error);
		}
  	}

  return (
	<LinearGradient 
              colors={[ colors.lblue500, '#1C8ABF']} 
              style={{flex:1}}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }} 
              locations={[0, 1]}
          >
	
	<View style={styles.container}>
		{processStep == 1 ? ( 
			<>
			<View style={styles.caixaCadastrar}> 
				<Text style={styles.title}>Cadastrar</Text>

				<View style={styles.formLogin}>
					
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
			</View>
      		<Button label='Próximo' style={styles.Button} onPress={() => setProcessStep(2)}/>
		</View>
		</>
	  ) : (
		<>
			
			<View style={styles.caixaCheckBox}>
					<Text style={styles.title}>Preferências</Text>
					
					<Text style={styles.label}>Idioma</Text>
					<SelectList
						setSelected={(val: string) => setIdioma(val)} 
						data={data} 
						save="value"
						placeholder='Portugês-BR'
						searchPlaceholder='pesquisar'
						maxHeight={36}
						boxStyles={{
							borderWidth: 0.5,
							margin: 10,
						}
						}
					/>

					<RadioButton.Group onValueChange={value => setTransporte(value as PrefTransporte)} value={transporte}>
						
						<Text style={styles.label}> Para me locomover na viagem eu prefiro: </Text>
						<View style={styles.checkBox}>
						<RadioButton.Item value={PrefTransporte.Aviao} label="Avião" style={{flexDirection: 'row-reverse'}}/>
						<RadioButton.Item label="Carro" value={PrefTransporte.Carro} style={{flexDirection: 'row-reverse'}}/>
						<RadioButton.Item label="Ônibus" value={PrefTransporte.Onibus} style={{flexDirection: 'row-reverse'}}/>
						<RadioButton.Item label="Trem" value={PrefTransporte.Trem} style={{flexDirection: 'row-reverse'}}/>
						</View>

						<Text style={styles.label}> Prefiro ficar hospedado em: </Text>
						<View style={styles.checkBox}>
						<RadioButton.Item value={PrefAcomodacao.Hotel} label="Hotel" style={{flexDirection: 'row-reverse'}}/>
						<RadioButton.Item label="Apartamento" value={PrefAcomodacao.Apartamento} style={{flexDirection: 'row-reverse'}}/>
						<RadioButton.Item label="Hostel" value={PrefAcomodacao.Hostel} style={{flexDirection: 'row-reverse'}}/>
						<RadioButton.Item label="Pousada" value={PrefAcomodacao.Pousada} style={{flexDirection: 'row-reverse'}}/>
						</View>

						<Text style={styles.label}> Como está o meu orçamento: </Text>
						<View style={styles.checkBox}>
						<RadioButton.Item value={PrefOrcamento.Baixo} label="Baixo" style={{flexDirection: 'row-reverse'}}/>
						<RadioButton.Item label="Medio" value={PrefOrcamento.Medio} style={{flexDirection: 'row-reverse'}}/>
						<RadioButton.Item label="Alto" value={PrefOrcamento.Alto} style={{flexDirection: 'row-reverse'}}/>
						</View>

					</RadioButton.Group>
					<Button label='Salvar' style={styles.Button} onPress={() => handleSubmit()}/>
			</View> 
				
		</>
	  )}
    </View>
	</LinearGradient>
  );
}
