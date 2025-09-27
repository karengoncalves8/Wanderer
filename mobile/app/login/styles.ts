// styles.ts
import { colors } from '@/styles/globalStyles';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  formLogin: {
    display: 'flex',
    gap: 15
  },
      registerMessage: {
        display: 'flex',
        flexDirection: 'column'
    },
    registerQuestion: {
        fontSize: 16,
        color: colors.gray600
    },
    link: {
      color: colors.sky500
    }
});

export default styles;
