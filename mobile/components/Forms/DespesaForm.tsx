import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

import InputWithIcon from '@/components/Inputs/InputWithIcon/InputWithIcon';
import Button from '@/components/Buttons/Button';
import { colors } from '@/styles/globalStyles';
import SelectWithLabel from '@/components/SelectWithLabel/SelectWithLabel';
import { despesaCategoriaService } from '@/services/despesaCategoriaService';
import { despesaService } from '@/services/despesaService';
import { DespesaCategoria } from '@/interfaces/Despesa';
import { SelectList } from 'react-native-dropdown-select-list';

export type DespesaFormProps = {
  gastosId: number;
  onClose: () => void;
  onCreated?: () => void;
};

export default function DespesaForm({ gastosId, onClose, onCreated }: DespesaFormProps) {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [categorias, setCategorias] = useState<DespesaCategoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<DespesaCategoria | null>(null);

  useEffect(() => {
    const load = async () => {
      const resp = await despesaCategoriaService.getAllDespesasCategorias();
      if (!(resp as any)?.message) setCategorias(resp as DespesaCategoria[]);
    };
    load();
  }, []);

  const handleSubmit = async () => {
    if (!nome || !valor || !categoriaSelecionada) {
      Toast.show({ type: 'error', text1: 'Erro', text2: 'Preencha todos os campos.' });
      return;
    }
    try {
      const payload = {
        nome,
        valor: Number(valor),
        gastosId,
        despesaCategoriaId: categoriaSelecionada.id,
      };
      const res = await despesaService.createDespesa(payload);
      if ((res as any)?.error) throw new Error('Erro API');
      Toast.show({ type: 'success', text1: 'Sucesso', text2: 'Despesa criada!' });
      onCreated?.();
      onClose();
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Erro', text2: 'Não foi possível criar a despesa.' });
    }
  };

  return (
    <View style={styles.form}>
      <InputWithIcon
        label='Nome'
        placeholder='Ex: Ingresso, Uber, Jantar'
        Icon={SimpleIcon}
        iconProps={{ name: 'note' }}
        inputType='default'
        value={nome}
        onChangeText={setNome}
      />

      <InputWithIcon
        label='Valor'
        placeholder='0,00'
        Icon={MaIcon}
        iconProps={{ name: 'cash' }}
        inputType='numeric'
        value={valor}
        onChangeText={setValor}
      />

        <SelectList 
              setSelected={(value: string | number) => {
          const cat = categorias.find(c => String(c.id) === String(value)) || null;
          setCategoriaSelecionada(cat);
        }} 
              data={ categorias.map(c => ({ key: c.id, value: c.nome }))}
              save="key"
              placeholder='Selecione uma categoria'
              searchPlaceholder='Pesquisar'
          />

      <Button label='Salvar' onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    gap: 16,
    flexDirection: 'column',
    width: '100%',
  },
});
