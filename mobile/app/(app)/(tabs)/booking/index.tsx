
import InputDateWithIcon from '@/components/Inputs/InputDate/InputDate';
import InputWithIcon from '@/components/Inputs/InputWithIcon/InputWithIcon';
import Toggle from '@/components/Toggle/Toggle';
import { colors } from '@/styles/globalStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


import Button from '@/components/Buttons/Button';
import { ClassesVoo } from '@/enums/ClassesVoo';
import { useRouter } from 'expo-router';
import { SelectList } from 'react-native-dropdown-select-list';
import FeIcon from 'react-native-vector-icons/Feather';
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

export default function Booking() {

    // Passagens
    const [origem, setOrigem] = useState('')
    const [destino, setDestino] = useState('')
    const [dataPartida, setDataPartida] = useState(new Date())
    const [classe, setClasse] = useState(1)

    // Acomodações
    const [cidade, setCidade ] = useState('')
    const [hospedes, setHospedes] = useState(2)
    const [checkIn, setCheckIn] = useState(new Date())
    const [checkOut, setCheckOut] = useState(new Date())

    const [ tabOption, setTabOption ] = useState('Passagens')

    const router = useRouter();

    const handleToggle = (selectedOption: string) => {
        setTabOption(selectedOption);
    };

    const classesOptions = Object.keys(ClassesVoo)
    .filter((key) => isNaN(Number(key))) // Filtra as chaves numéricas (essas são geradas automaticamente)
    .map((key) => ({
        key, 
        value: key, // Agora o `value` é o nome da classe, não o número
        numberValue: ClassesVoo[key as keyof typeof ClassesVoo] // Guarda o número (valor do enum)
    }));

    const handleSubmit = async () => {
        try{
            console.log("PAAAAAAAA", tabOption)
            if(tabOption == 'Passagens'){
                const params = {
                    origem,
                    destino,
                    dataPartida: checkIn.toISOString().split('T')[0],
                    classe,
                }
                router.push({
                    pathname: '/booking-flights',
                    params: params,
                });
            } else{
                const params = {
                    cidade,
                    checkin: checkIn.toISOString().split('T')[0],
                    checkout: checkOut.toISOString().split('T')[0],
                    hospedes
                }
                router.push({
                    pathname: '/booking-hotel',
                    params: params,
                });
            }

        } catch {
            return
        }
    }

    return (
        <>
        <LinearGradient 
            colors={[ colors.lblue500, '#1C8ABF']} 
            style={styles.background}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }} 
            locations={[0, 1]}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Reservar</Text>
                <View style={styles.card}>
                    <Toggle options={['Passagens', 'Acomodações']} onToggle={handleToggle} /> 
                
                    {tabOption == 'Passagens' ? (
                        <View style={styles.form}>
                            <InputWithIcon 
                                label='Origem'
                                placeholder='IATA do aeroporto de partida'
                                Icon={FeIcon} 
                                iconProps={{ name: 'circle' }} 
                                inputType="default"
                                onChangeText={setOrigem}
                                value={origem}
                            />
                            <InputWithIcon 
                                label='Destino'
                                placeholder='IATA do aeroporto de destino'
                                Icon={SimpleIcon} 
                                iconProps={{ name: 'location-pin' }} 
                                inputType="default"
                                onChangeText={setDestino}
                                value={destino}
                            />
                            <InputDateWithIcon 
                                label="Data de Partida"
                                placeholder="2025/08/02"
                                Icon={MaIcon} 
                                iconProps={{ name: 'calendar-month-outline' }} 
                                onChange={setDataPartida}
                                value={dataPartida}  
                            />
                            <SelectList 
                                setSelected={(val: number) => setClasse(val)} 
                                data={classesOptions} 
                                save="key"
                                placeholder='Selecione uma classe'
                                searchPlaceholder='Pesquisar'
                            />
                        </View>
                    ) : (
                        <View style={styles.form}>
                            <InputWithIcon 
                                label='Cidade'
                                placeholder='Cidade de destino'
                                Icon={SimpleIcon} 
                                iconProps={{ name: 'location-pin' }} 
                                inputType="default"
                                onChangeText={setCidade}
                                value={cidade}
                            />
                            <InputWithIcon 
                                label='Hóspedes'
                                placeholder='Quantidade de hóspedes'
                                Icon={FeIcon} 
                                iconProps={{ name: 'users' }} 
                                inputType="default"
                                onChangeText={setCidade}
                                value={cidade}
                            />
                            <InputDateWithIcon 
                                label="Check-in"
                                placeholder="2025/08/02"
                                Icon={MaIcon} 
                                iconProps={{ name: 'calendar-month-outline' }} 
                                onChange={setCheckIn}
                                value={checkIn}  
                            />
                            <InputDateWithIcon 
                                label="Check-out"
                                placeholder="2025/08/02"
                                Icon={MaIcon} 
                                iconProps={{ name: 'calendar-month-outline' }} 
                                onChange={setCheckOut}
                                value={checkOut}  
                            />
                        </View>
                    )}
                    <Button label='Buscar' style={styles.Button} onPress={() => handleSubmit()}/>
                </View>
            </View>
        </LinearGradient>
        </>
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
        textAlignVertical: 'center',
        marginLeft: 30
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

