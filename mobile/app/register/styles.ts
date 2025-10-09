import { colors } from '@/styles/globalStyles';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    caixaCadastrar: {
        backgroundColor: colors.gray200,
        padding: 20,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 20,
        height: '90%',
    },
    caixaCheckBox: {
        backgroundColor: colors.gray200,
        padding: 20,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 20,
        height: '90%',
    },
    formLogin: {
        flex: 1,
        paddingBottom: 15,
    },
    Button: {
        marginBottom: 30,
    },
    checkBox: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 5,
        justifyContent: 'space-between',
        borderRadius: 12,
    },
    label: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        marginTop: 10,
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    scrollContent: {
        paddingBottom: 20,
        gap: 15,
    },
    selectBox: {
        borderWidth: 1,
        borderColor: colors.gray300,
        borderRadius: 8,
        marginBottom: 10,
    },
    radioItem: {
        flexDirection: 'row-reverse',
        paddingVertical: 2,
    },
});

export default styles;