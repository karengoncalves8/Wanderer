import InputWithIcon from '@/components/Inputs/InputWithIcon/InputWithIcon';
import { useSession } from '@/context/AuthContext';
import { Image, ImageBackground, KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native';

import Button from '@/components/Buttons/Button';
import InputPassword from '@/components/Inputs/InputPassword/InputPassword';
import { usuarioService } from '@/services/usuarioService';
import { viagemService } from '@/services/viagemService';
import { colors } from '@/styles/globalStyles';
import { router } from 'expo-router';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import IoIcons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

export default function SignIn() {
  const { signIn, session, signInWithBiometrics } = useSession();
  const { t } = useTranslation();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleLogin = async () => {
    try {
      const token = await usuarioService.verifyLogin(email, password);
      if (typeof(token) !== 'string') {
        throw Error
      }

      await signIn(token as string);

      await viagemService.updateAllViagensStatus(session?.user.id!);

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
          <Text style={styles.subTitle}>{t('login.title')}</Text>

          <View style={styles.formLogin}>
            <InputWithIcon 
              label={t('login.emailLabel')}
              placeholder={t('login.emailPlaceholder')}
              Icon={Icon} 
              iconProps={{ name: 'alternate-email' }} 
              inputType="email-address"
              onChangeText={setEmail}
              value={email}  
            />
            <InputPassword 
              label={t('login.passwordLabel')}
              placeholder={t('login.passwordPlaceholder')}
              onChangeText={setPassword}
              value={password}  
            />
            <Button label={t('login.loginButton')} onPress={() => handleLogin()} />
          </View>

          <TouchableOpacity onPress={signInWithBiometrics} style={styles.biometricsLogin}>
            <IoIcons name="finger-print" size={30} color={colors.blue800} />
            <Text style={{ fontSize: 14, color: colors.blue800 }}>{t('login.biometricLogin')}</Text>
          </TouchableOpacity>

          <View style={styles.registerMessage}>
              <Text style={styles.registerQuestion}>{t('login.noAccountQuestion')}</Text>
              <Text style={styles.link} onPress={() => router.push('/register')}>{t('login.registerLink')}</Text>
          </View>
        </View>
        </View>
    </ImageBackground>
  </KeyboardAvoidingView>
  );
}
