import InputWithIcon from '@/components/Inputs/InputWithIcon/InputWithIcon';
import { useSession } from '@/context/AuthContext';
import { Image, ImageBackground, KeyboardAvoidingView, Text, View } from 'react-native';

import Button from '@/components/Buttons/Button';
import InputPassword from '@/components/Inputs/InputPassword/InputPassword';
import { usuarioService } from '@/services/usuarioService';
import { colors } from '@/styles/globalStyles';
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
  <KeyboardAvoidingView style={{flex:1, backgroundColor: colors.gray200}}  behavior="padding">
      <ImageBackground 
          source={require('../../assets/images/paisagem.jpg')}
          style={{flex:1,}}
          resizeMode="cover"
          blurRadius={2} 
      >
        <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={require('../../assets/images/logo.png')} style={{width: 120, height: 70}} />
          <Text style={styles.title}>Wanderer</Text>
        </View>

        <View style={styles.caixa}>
          <Text style={styles.subTitle}>Entrar</Text>

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
            <Button label="Entrar" onPress={() => handleLogin()} />
          </View>

          <View style={styles.registerMessage}>
              <Text style={styles.registerQuestion}>Ainda não tem uma conta?</Text>
              <Text style={styles.link} onPress={() => router.push('/register')}>Cadastre-se </Text>
          </View>
        </View>
        </View>
    </ImageBackground>
  </KeyboardAvoidingView>
);
}
