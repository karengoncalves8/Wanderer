// MyComponent.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import styles from './styles';
import { useTranslation } from 'react-i18next';

interface InputProps {
  label: string;
  placeholder: string;
  onChangeOption?: (value: any) => void;
  options: any[];
  selectedValue?: any;
}

const SelectWithLabel = ({label, placeholder, options, onChangeOption, selectedValue}: InputProps) => {
    const { t } = useTranslation();
	return (
        <View style={styles.container}>
            <Text style={styles.label}>{t(label)}</Text>
            <SelectList 
                setSelected={(value: any) => { if (onChangeOption) onChangeOption(value); }} 
                data={options} 
                save="value"
                placeholder={t(placeholder)}
                defaultOption={selectedValue ? options.find(option => option.value === selectedValue) : undefined}
            />
        </View>
  	);
};

export default SelectWithLabel;
