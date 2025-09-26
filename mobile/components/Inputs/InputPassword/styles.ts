// styles.ts
import { colors } from '@/styles/globalStyles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: colors.gray100,
    height: 80,
    padding: 10,
    borderRadius: 10,
    width: '100%'
  },
  textContainer: {
    flex:2 , 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
    padding: 0,
  },
  icon: {
    flex:1, 
   fontSize: 24, 
   color: colors.gray500
  },
  showPassword: {
    flex: 0.2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  eyeIcon: {
    fontSize: 24, 
    color: colors.gray500
  }
});

export default styles;
