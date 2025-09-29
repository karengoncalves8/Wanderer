// MyComponent.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import styles from './styles';

interface InputProps {
  label: string;
  placeholder: string;
  onChangeOption?: (value: any) => void;
  options: any[]
}

const SelectWithLabel = ({label, placeholder, options, onChangeOption}: InputProps) => {
	return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <SelectList 
                setSelected={(value: any) => { if (onChangeOption) onChangeOption(value); }} 
                data={options} 
                save="value"
                placeholder={placeholder}
                inputStyles={{width: 50}}
            />
        </View>
  	);
};

export default SelectWithLabel;
