import React from 'react';
import { Pressable, StyleProp, Text, ViewStyle } from 'react-native';
import styles from './styles';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const Button = ({
  label,
  onPress,
  style
}: ButtonProps) => {

  return (
        <Pressable 
            onPress={onPress} 
            style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
                style
            ]}
        >
            <Text style={styles.label}>{label}</Text>
        </Pressable>
  );
};

export default Button;
