// MyComponent.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import styles from './styles';

interface InputProps {
  label: string;
  placeholder: string;
  onChangeOption?: (value: any) => void;
  options: any[];
  selectedValue?: any;
}

const SelectWithLabel = ({label, placeholder, options, onChangeOption, selectedValue}: InputProps) => {
	return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <SelectList 
                setSelected={(value: any) => { if (onChangeOption) onChangeOption(value); }} 
                data={options} 
                save="value"
                placeholder={placeholder}
                defaultOption={selectedValue ? options.find(option => option.value === selectedValue) : undefined}
                
            />
        </View>
  	);
};

export default SelectWithLabel;
