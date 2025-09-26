import { colors } from '@/styles/globalStyles'; // Supondo que você tenha um arquivo de estilos globais
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather'; // Usando MaterialIcons para o ícone de cadeado
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

interface InputProps {
  label: string;
  placeholder: string;
  onChangeText?: (text: string) => void;
  value: string;
}

const InputPassword = ({
  label,
  placeholder,
  onChangeText,
  value,
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
        <IconFeather name="lock" size={24} color={colors.gray500} />
        <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                secureTextEntry={!isPasswordVisible}
                placeholder={placeholder}
                placeholderTextColor={colors.gray500}
                onChangeText={onChangeText}
                value={value}
            />
        </View>
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.showPassword}>
            <Icon name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} style={styles.eyeIcon} /> 
        </TouchableOpacity>
    </View>
  );
};

export default InputPassword;
