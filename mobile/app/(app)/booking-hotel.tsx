
import { colors } from '@/styles/globalStyles';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';



export default function BookingFlights() {
    const { cidade, checkin, checkout, hospedes } = useLocalSearchParams(); 

    return (
        <View>
            <Text>Cidade: {cidade}</Text>
            <Text>Check-in: {checkin}</Text>
            <Text>Check-out: {checkout}</Text>
            <Text>Hospedes: {hospedes}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    title: {
        flex: 1,
        fontSize: 28,
        color: colors.gray100,
        fontWeight: 'bold',
        textAlignVertical: 'center'
    },
    card: {
        flex: 3,
        backgroundColor: colors.gray200, 
        display: 'flex',
        justifyContent: 'space-around',
        padding: 12,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
    },
    form: {
        display: 'flex',
        gap: 20,
        flexDirection: 'column'
    },
    Button: {

    },
});

