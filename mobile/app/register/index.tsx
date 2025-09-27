import InputWithIcon from '@/components/Inputs/InputWithIcon/InputWithIcon';
import { View } from 'react-native';

import Button from '@/components/Buttons/Button';
import InputPassword from '@/components/Inputs/InputPassword/InputPassword';
import { Usuario } from '@/interfaces/Usuario';
import { usuarioService } from '@/services/usuarioService';
import { globalStyles } from '@/styles/globalStyles';
import { router } from 'expo-router';
import { useState } from 'react';
import FaIcon from 'react-native-vector-icons/FontAwesome6';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
    <View style={globalStyles.container}>
		{processStep == 1 ? ( 
			<>
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
				<InputWithIcon 
				label="Email"
				placeholder="Digite seu email"
				Icon={Icon} 
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
      	<Button label='Próximo' onPress={() => setProcessStep(2)}/>
		</>
	  ) : (
		<>
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
				<InputWithIcon 
					label="Email"
					placeholder="Digite seu email"
					Icon={Icon} 
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
      	<Button label='Próximo' onPress={() => handleSubmit()}/>
		</>
	  )}
    </View>
  );
}
