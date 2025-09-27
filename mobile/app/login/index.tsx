import InputWithIcon from '@/components/Inputs/InputWithIcon/InputWithIcon';
import { useSession } from '@/context/AuthContext';
import { Text, View } from 'react-native';

import Button from '@/components/Buttons/Button';
import InputPassword from '@/components/Inputs/InputPassword/InputPassword';
import { usuarioService } from '@/services/usuarioService';
import { globalStyles } from '@/styles/globalStyles';
import { router } from 'expo-router';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

export default function SignIn() {
  const { signIn } = useSession();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleLogin = async () => {
    try {
      const token = await usuarioService.verifyLogin(email, password);
      if (typeof(token) !== 'string') {
        throw Error
      }

      await signIn(token as string);

      router.replace('/home');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  }

  return (
    <View style={globalStyles.container}>
      <View style={styles.formLogin}>
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
      </View>
      <Button label='Entrar' onPress={() => handleLogin()}/>
        <View style={styles.registerMessage}>
            <Text style={styles.registerQuestion}>Ainda não tem uma conta?</Text>
            <Text style={styles.link} onPress={() => router.push('/register')}>Cadastre-se</Text>
        </View>
    </View>
  );
}
