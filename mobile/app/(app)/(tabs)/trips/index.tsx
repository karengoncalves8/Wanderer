
import { Text, View } from 'react-native';

import Button from '@/components/Buttons/Button';
import ViagemCard from '@/components/Cards/ViagemCard';
import ViagemForm from '@/components/Forms/ViagemForm';
import GenericModal from '@/components/Modals/GenericModal/Modal';
import { ApiException } from '@/config/apiException';
import { useSession } from '@/context/AuthContext';
import { Viagem } from '@/interfaces/Viagem';
import { viagemService } from '@/services/viagemService';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import styles from './styles';

export default function Trips() {
    const { session } = useSession();

    const [viagens, setViagens] = useState<Viagem[] | null>(null);
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
        setViagens(response as Viagem[]);
    }

    const handleModalClose = () => {
        setShowFormModal(false);
        setViagemSelecionada(null);
        fetchViagens();
    }

    return (
        <View style={{ flex: 1, margin: 15, backgroundColor: '#f0f0f0' }}>
            <View style={styles.header}>
                <Text style={styles.title}> Viagens</Text>
                <Button style={styles.button} label='Nova Viagem' onPress={() => setShowFormModal(true)} /> 
            </View>
            
            <Text style={styles.subTitle}> Atual </Text>
            {viagens?.map((viagem) => (
                <ViagemCard key={viagem.id} viagem={viagem} />
            ))}

            
            <Text style={styles.subTitle}> Futuras </Text>
                
            
            <Text style={styles.subTitle}> Histórico </Text>
            
            <GenericModal 
                visible={showFormModal}
                onClose={() => setShowFormModal(false)}
                title={viagemSelecionada ? "Editar Viagem" : "Nova Viagem"}
                children={<ViagemForm data={viagemSelecionada || undefined} onClose={() => handleModalClose()}/>}
            />
        </View>
    );
}
