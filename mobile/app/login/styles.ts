// styles.ts
import { colors } from '@/styles/globalStyles';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    flex: 1
  },
  
  caixa:{
    flex: 1.5,
    height: '100%',
    backgroundColor: colors.gray200,
    padding: 20,
    borderTopRightRadius:24,
    borderTopLeftRadius:24,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 20,
  },

  formLogin: {
    display: 'flex', 
    gap: 10
  },

  registerMessage: {
      display: 'flex',
      marginTop: 10,
      alignItems:'center'
  },
  registerQuestion: {
      fontSize: 16,
      color: colors.gray600,
      justifyContent: 'center',
      display: 'flex'
  },
  
  link: {
    color: colors.sky500,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  },
  
  button: {
    backgroundColor: colors.sky500, 
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    color: colors.gray200,
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  subTitle: {
    color: colors.gray700,
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  biometricsLogin: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    marginTop: 10
  },
});

export default styles;
