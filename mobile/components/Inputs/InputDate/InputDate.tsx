import { colors } from '@/styles/globalStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface InputDateProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  Icon?: React.ComponentType<any>;
  iconProps?: any;
}

const InputDateWithIcon = ({ label, value, onChange, placeholder, Icon, iconProps }: InputDateProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const handlePress = () => {
    setShowPicker(true);
  };

  const handleChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios'); // No iOS manter aberto
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      {Icon && <Icon {...iconProps} style={styles.icon} />}
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>

        <TouchableOpacity
          onPress={handlePress}
          style={[
            styles.input,
            { justifyContent: 'center', paddingHorizontal: 10 },
          ]}
        >
          <Text style={{ color: value ? colors.gray800 : colors.gray500 }}>
            {value ? format(value, 'dd/MM/yyyy') : placeholder || 'Selecione a data'}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={value || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleChange}
          />
        )}
      </View>
    </View>
  );
};

export default InputDateWithIcon;
