import React from 'react';
import { Pressable, Text } from 'react-native';
import styles from './styles';

interface ButtonProps {
  label: string;
  onPress?: () => void;
}

const Button = ({
  label,
  onPress
}: ButtonProps) => {

  return (
        <Pressable 
            onPress={onPress} 
            style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
            ]}
        >
            <Text style={styles.label}>{label}</Text>
        </Pressable>
  );
};

export default Button;
