// styles.ts
import { colors } from '@/styles/globalStyles';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'flex-end',
  },
  
  caixa:{
    width: '100%',
    //backgroundColor: 'red',
    backgroundColor: colors.gray200,
    padding: 10,
    //marginBottom: 5, // Espaço inferior
    height: '50%',
    borderTopRightRadius:24,
    borderTopLeftRadius:24,
  },

  formLogin: {
    display: 'flex', 
    gap: 20, 
    flex: 2, 
    justifyContent: 'flex-end',
    //backgroundColor: 'blue',
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
    fontSize: 16,
    marginBottom: 30
  },
  
  button: {
    backgroundColor: colors.sky500, // Use a cor do botão conforme a paleta
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom: '30%',
  },

  subTitle: {
    color: colors.gray700,
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20
  }




});

export default styles;
