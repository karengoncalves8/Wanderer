
import { Text, View } from 'react-native';
import { router } from 'expo-router';

import Button from '@/components/Buttons/Button';
import ViagemCard from '@/components/Cards/ViagemCard';
import ViagemForm from '@/components/Forms/ViagemForm';
import GenericModal from '@/components/Modals/GenericModal/Modal';
import { ApiException } from '@/config/apiException';
import { useSession } from '@/context/AuthContext';
import { Viagem } from '@/interfaces/Viagem';
import { viagemService } from '@/services/viagemService';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import styles from './styles';
import { ViagemStatus } from '@/enums/ViagemStatus';

export default function Trips() {
    const { session } = useSession();

    const [viagensAtuais, setViagensAtuais] = useState<Viagem[] | null>(null);
    const [viagensFuturas, setViagensFuturas] = useState<Viagem[] | null>(null);
    const [viagensHistorico, setViagensHistorico] = useState<Viagem[] | null>(null);
    const [viagemSelecionada, setViagemSelecionada] = useState(null);

    const [showFormModal, setShowFormModal] = useState(false);

    const fetchViagens = async () => {
        const response = await viagemService.getAllViagens(session?.user.id!);
        if (response instanceof ApiException) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: response.message || 'Erro ao consultar viagens.'
            });
            return;
        }
        let viagensAtuais = response.filter(v => v.status === ViagemStatus.ATUAL);
        let viagensFuturas = response.filter(v => v.status === ViagemStatus.FUTURA);
        let viagensHistorico = response.filter(v => v.status === ViagemStatus.HISTORICO);
        
        setViagensAtuais(viagensAtuais);
        setViagensFuturas(viagensFuturas);
        setViagensHistorico(viagensHistorico);
    }

    const handleViagemPress = (viagem: Viagem) => {
        router.push({
            pathname: '/trips/[id]',
            params: { id: viagem.id!.toString() }
        } as any);
    };

    const handleModalClose = () => {
        setShowFormModal(false);
        setViagemSelecionada(null);
        fetchViagens();
    }

    useEffect(() => {
        fetchViagens();
    }, []);

    return (
        <View style={{ flex: 1, margin: 15, backgroundColor: '#f0f0f0' }}>
            <View style={styles.header}>
                <Text style={styles.title}> Viagens</Text>
                <Button style={styles.button} label='Nova Viagem' onPress={() => setShowFormModal(true)} /> 
            </View>
              <Text style={styles.subTitle}> Atual </Text>
                {viagensAtuais?.map((viagem) => (
                    <ViagemCard key={viagem.id} viagem={viagem} onPress={handleViagemPress} />
                ))}

            
            <Text style={styles.subTitle}> Futuras </Text>
                {viagensFuturas?.map((viagem) => (
                    <ViagemCard key={viagem.id} viagem={viagem} onPress={handleViagemPress} />
                ))}
            
            <Text style={styles.subTitle}> Histórico </Text>
                 {viagensHistorico?.map((viagem) => (
                    <ViagemCard key={viagem.id} viagem={viagem} onPress={handleViagemPress} />
                ))}

            <GenericModal 
                visible={showFormModal}
                onClose={() => setShowFormModal(false)}
                title={viagemSelecionada ? "Editar Viagem" : "Nova Viagem"}
                children={<ViagemForm data={viagemSelecionada || undefined} onClose={() => handleModalClose()}/>}
            />
        </View>
    );
}
