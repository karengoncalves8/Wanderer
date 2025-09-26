// MyComponent.tsx
import { colors } from '@/styles/globalStyles';
import React from 'react';
import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';
import styles from './styles';

interface InputProps {
  label: string;
  placeholder: string;
  Icon?: React.ComponentType<any>;
  iconProps?: any;
  inputType?: KeyboardTypeOptions;
  onChangeText?: (text: string) => void;
  value: string;
}

const InputWithIcon = ({label, placeholder, Icon, iconProps, inputType = 'default', onChangeText, value}: InputProps) => {
	return (
		<View style={styles.container}>
			{Icon && <Icon  {...iconProps}  style={styles.icon} />} 
			<View style={styles.textContainer}>
			<Text style={styles.label}>{label}</Text>
				<TextInput
					style={styles.input}
					placeholder={placeholder}
					placeholderTextColor={colors.gray500}
					keyboardType={inputType}
					onChangeText={onChangeText}
					value={value}
				/>
			</View>
		</View>
  	);
};

export default InputWithIcon;
