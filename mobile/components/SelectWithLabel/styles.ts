// styles.ts
import { colors } from '@/styles/globalStyles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 5,
    alignItems: 'flex-start',
    backgroundColor: colors.gray100,
    height: 95,
    width: '100%',
    padding: 10,
    borderRadius: 10,
  },
  placeholder: {
    fontSize: 16,
    color: colors.gray500,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: colors.gray800,
  },
  input: {
    flex: 2,
    fontSize: 16,
    width: '100%',
    padding: 0,
  },
  icon: {
   fontSize: 24, 
   color: colors.gray500
  },
});

export default styles;
