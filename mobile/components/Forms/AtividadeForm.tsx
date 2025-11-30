import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

import InputWithIcon from '@/components/Inputs/InputWithIcon/InputWithIcon';
import Button from '@/components/Buttons/Button';
import { colors } from '@/styles/globalStyles';
import { atividadeService } from '@/services/atividadeService';
import { atividadeCategoriaService } from '@/services/atividadeCategoriaService';
import { AtividadeCategoria } from '@/interfaces/Atividade';
import SelectWithLabel from '@/components/SelectWithLabel/SelectWithLabel';
import GooglePlacesTextInput, { Place } from 'react-native-google-places-textinput';
import { SelectList } from 'react-native-dropdown-select-list';
import InputTimeWithIcon from '../Inputs/InputTime/InputTime';
import { format } from 'date-fns';
import { createDateFromString } from '@/utils/dateRelated/createDateFromString';

function startOfDay(d: Date) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
function sameDay(a: Date, b: Date) { return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }

export type AtividadeFormProps = {
  viagemId: number;
  dataIda: Date;
  dataVolta: Date;
  onClose: () => void;
  onCreated?: () => void;
};

export default function AtividadeForm({ viagemId, dataIda, dataVolta, onClose, onCreated }: AtividadeFormProps) {
  const [nome, setNome] = useState('');
  const [horaInicio, setHoraInicio] = useState(new Date());
  const [horaFim, setHoraFim] = useState(new Date());
  const [preco, setPreco] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');

  const [categorias, setCategorias] = useState<AtividadeCategoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<AtividadeCategoria | null>(null);

  const days = useMemo(() => {
    const s = startOfDay(createDateFromString(dataIda));
    const e = startOfDay(createDateFromString(dataVolta));
    const arr: Date[] = [];
    for (let d = createDateFromString(s); d <= e; d.setDate(d.getDate() + 1)) arr.push(createDateFromString(d));
    return arr;
  }, [dataIda, dataVolta]);

  const [selectedDay, setSelectedDay] = useState<Date | null>(days[0] ?? null);
  const dayOptions = useMemo(() => days.map((d, idx) => ({ key: idx + 1, value: d.toLocaleDateString(), iso: d.toISOString() })), [days]);
  const selectedDayValue = useMemo(() => (selectedDay ? selectedDay.toLocaleDateString() : undefined), [selectedDay]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const resp = await atividadeCategoriaService.getAllAtividadesCategorias();
      if (resp instanceof Error || (resp as any)?.message) return; // ApiException or error
      setCategorias(resp as AtividadeCategoria[]);
    };
    fetchCategorias();
  }, []);

  const handleSubmit = async () => {
    if (!nome || !selectedDay) {
      Toast.show({ type: 'error', text1: 'Erro', text2: 'Preencha ao menos nome e dia.' });
      return;
    }

    const formattedHoraInicio = horaInicio ? format(horaInicio, 'HH:mm:ss') : '';
    const formattedHoraFim = horaFim ? format(horaFim, 'HH:mm:ss') : '';

    try {
      const payload: any = {
        nome,
        data: selectedDay,
        hora_inicio: formattedHoraInicio,
        hora_fim: formattedHoraFim,
        preco: Number(preco || 0),
        viagemId,
        local: localizacao || lat || long ? {
          localizacao: localizacao || undefined,
          lat: lat ? Number(lat) : undefined,
          long: long ? Number(long) : undefined,
        } : undefined,
        atividadeCategoriaId: categoriaSelecionada?.id!
      };

      const res = await atividadeService.createAtividade(payload);
      if ((res as any)?.error) throw new Error('Erro na API');

      Toast.show({ type: 'success', text1: 'Sucesso', text2: 'Atividade criada!' });
      onCreated?.();
      onClose();
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Erro', text2: 'Não foi possível criar a atividade.' });
    }
  };

  const handlePlaceSelect = (place: Place) => {
    try {
        let details = place?.details;
        const fullAddress = details?.formattedAddress;
        const latV = details?.location?.latitude;
        const lngV = details?.location?.longitude;

        setLocalizacao(fullAddress || '');
        if (typeof latV === 'number') setLat(String(latV));
        if (typeof lngV === 'number') setLong(String(lngV));
    } catch {}
  };

  return (
    <View style={styles.form}>
    
        <InputWithIcon
            label='Nome'
            placeholder='Ex: Visita ao Louvre'
            Icon={SimpleIcon}
            iconProps={{ name: 'location-pin' }}
            inputType='default'
            value={nome}
            onChangeText={setNome}
        />

        {true && (
        <View>
          <Text style={styles.label}>Localização</Text>
          <GooglePlacesTextInput
            apiKey="AIzaSyCh1SXUnWnRQBSuLk8H9TMXD62YOOsKvec"
            onPlaceSelect={(place: Place) => handlePlaceSelect(place)}
            languageCode="pt-BR"
            fetchDetails={true}
            detailsFields={["formattedAddress", "location"]}
            minCharsToFetch={3}
          />
        </View>
        )}

      <SelectList 
            setSelected={(value: string | number) => {
          const opt = dayOptions.find(o => String(o.key) === String(value));
          if (opt) setSelectedDay(new Date(opt.iso));
        }} 
            data={dayOptions} 
            save="key"
            placeholder='Selecione um dia'
            searchPlaceholder='Pesquisar'
        />


      <SelectList 
            setSelected={(value: string | number) => {
                const cat = categorias.find(c => String(c.id) === String(value)) || null;
                setCategoriaSelecionada(cat);
            }} 
            data={categorias.map(c => ({ key: c.id, value: c.nome }))} 
            save="key"
            placeholder='Selecione uma categoria'
            searchPlaceholder='Pesquisar'
        />

      <View style={styles.row}>
        <InputTimeWithIcon
          label='Início'
          placeholder='08:00'
          Icon={MaIcon}
          iconProps={{ name: 'clock-time-four-outline' }}
          value={horaInicio}
          onChange={setHoraInicio}
        />
        <InputTimeWithIcon
          label='Fim'
          placeholder='10:00'
          Icon={MaIcon}
          iconProps={{ name: 'clock-time-four-outline' }}
          value={horaFim}
          onChange={setHoraFim}
        />
      </View>

      <InputWithIcon
        label='Preço'
        placeholder='0,00'
        Icon={MaIcon}
        iconProps={{ name: 'cash' }}
        inputType='numeric'
        value={preco}
        onChangeText={setPreco}
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
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  label: {
    color: colors.gray700,
    fontWeight: '600',
    marginBottom: 6,
  },
});
