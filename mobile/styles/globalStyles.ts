// styles.ts
import { StyleSheet } from 'react-native';

const colors = {
    // Gray
    gray800: '#191928',
    gray700: '#3F3F4C',
    gray600: '#6E6E6E',
    gray500: '#9E9E9E',
    gray400: '#D3D3D3',
    gray300: '#F6F6F6',
    gray200: '#FAFAFA',
    gray100: '#FFFFFF',

    // Sky
    sky300: '#59B8E6',
    sky500: '#1C8ABF',

    // Light blue
    lblue500: '#6FD3E1',

    // Blue
    blue800: '#0F3488'
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray200,
    paddingVertical: 40,
    paddingHorizontal: 20
  },
  text: {
    fontSize: 16,
    color: colors.gray800,
  },
  title: {
    fontSize: 20,
    color: colors.gray800
  }
});

export { colors, globalStyles };

