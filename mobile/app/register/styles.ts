import { colors } from '@/styles/globalStyles';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        width: '100%',
        gap: 15,
        justifyContent: 'flex-end',

    },
    caixaCadastrar: {
        backgroundColor: colors.gray200, 
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
        height: '90%',
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,

    },
    caixaCheckBox:{
        backgroundColor: colors.gray200,
        //backgroundColor: 'red', 
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
        height: '70%',
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,

    },
    formLogin: {
        display: 'flex',
        gap: 10,
        //backgroundColor: 'red',
        paddingBottom: 15,
        height: '70%',
    },
    Button: {
        marginBottom: 45,
        marginTop: 10,
    },
   checkBox: {
        display: 'flex',
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 5,
        justifyContent: 'space-between',
        borderRadius: 12,
        marginTop: 1,
    },
    label:{
        marginLeft: 20,
        fontSize: 16,
    },
    title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 70,
    },
});

export default styles;