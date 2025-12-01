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
import { useTranslation } from 'react-i18next';

export type DespesaFormProps = {
  gastosId: number;
  onClose: () => void;
  onCreated?: () => void;
};

export default function DespesaForm({ gastosId, onClose, onCreated }: DespesaFormProps) {
  const { t } = useTranslation();
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
      Toast.show({ type: 'error', text1: t('common.error'), text2: t('despesaForm.fillAllFields') });
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
      Toast.show({ type: 'success', text1: t('common.success'), text2: t('despesaForm.expenseCreated') });
      onCreated?.();
      onClose();
    } catch (e) {
      Toast.show({ type: 'error', text1: t('common.error'), text2: t('despesaForm.expenseCreateError') });
    }
  };

  return (
    <View style={styles.form}>
      <InputWithIcon
        label={t('despesaForm.name')}
        placeholder={t('despesaForm.namePlaceholder')}
        Icon={SimpleIcon}
        iconProps={{ name: 'note' }}
        inputType='default'
        value={nome}
        onChangeText={setNome}
      />

      <InputWithIcon
        label={t('despesaForm.value')}
        placeholder={t('despesaForm.valuePlaceholder')}
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
        placeholder={t('despesaForm.selectCategory')}
        searchPlaceholder={t('common.search')}
      />

      <Button label={t('common.save')} onPress={handleSubmit} />
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
