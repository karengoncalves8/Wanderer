import { colors } from '@/styles/globalStyles';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ToggleProps {
  options: [string, string]; // Deve ser uma lista de duas opções
  onToggle: (selectedOption: string) => void; // Callback para quando a opção for alterada
}

const Toggle: React.FC<ToggleProps> = ({ options, onToggle }) => {
  const [selected, setSelected] = useState(options[0]);

  const handlePress = (option: string) => {
    if (option !== selected) {
      setSelected(option);
      onToggle(option); // Chama o callback com a nova opção selecionada
    }
  };

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selected === option && styles.selectedOption
          ]}
          onPress={() => handlePress(option)}
        >
          <Text style={[styles.optionText, selected === option && styles.selectedText]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    overflow: 'hidden',
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOption: {
    backgroundColor: colors.lblue500, // Cor do botão selecionado
  },
  optionText: {
    fontSize: 16,
    color: '#A5A5A5',
  },
  selectedText: {
    color: 'white', // Cor do texto quando a opção estiver selecionada
  },
});

export default Toggle;
