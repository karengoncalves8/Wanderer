// styles.ts
import { colors } from '@/styles/globalStyles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.sky500,
    padding: 15,
    borderRadius: 30,
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: colors.gray100,
    fontWeight: '700'
  },
  buttonPressed: {
    backgroundColor: colors.sky300
  }
});

export default styles;
