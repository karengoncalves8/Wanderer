
import { Voo } from '@/interfaces/VooAPI';
import { colors } from '@/styles/globalStyles';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';



export default function BookingFlights() {
    const { origem, destino, dataPartida, classe } = useLocalSearchParams(); 

    const [voos, setVoos] = useState<Voo[] | null>(null);

    // const fetchResults = async (params: VooAPISearch) => {
    //     try{
    //         const data = vooAPIService.searchVoo()
    //     }
    // }
    useEffect(() => {

    }, [origem, destino, dataPartida, classe])

    return (
        <View>
            <Text>origem: {origem}</Text>
            <Text>Check-in: {destino}</Text>
            <Text>Check-out: {dataPartida}</Text>
            <Text>Hospedes: {classe}</Text>
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

