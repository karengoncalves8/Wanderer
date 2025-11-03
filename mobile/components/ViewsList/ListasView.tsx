import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import { Viagem } from '@/interfaces/Viagem';
import { Lista, ListaItem } from '@/interfaces/Lista';
import { colors } from '@/styles/globalStyles';
import { listaService } from '@/services/listaService';
import { listaItemService } from '@/services/listaItemService';

export type ListasViewProps = {
  viagem: Viagem;
  onCreated?: () => void;
};

const ListaCard = ({
  lista,
  onAddItem,
  onSubmitItem,
  onToggleItem,
}: {
  lista: Lista & { _tempItems?: ListaItem[] };
  onAddItem: (listaId: number) => void;
  onSubmitItem: (listaId: number, item: ListaItem) => void;
  onToggleItem: (item: ListaItem) => void;
}) => {
  const [localList, setLocalList] = useState(lista);

  useEffect(() => setLocalList(lista), [lista]);

  console.log("localList", localList)

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{localList.titulo}</Text>
        <TouchableOpacity onPress={() => onAddItem(localList.id)}>
          <Text style={styles.linkText}>Novo item  +</Text>
        </TouchableOpacity>
      </View>

      <View style={{ gap: 10 }}>
        {(localList.listaItems || []).map((it) => (
          <TouchableOpacity key={`it-${it.id}`} style={styles.itemRow} activeOpacity={0.7} onPress={() => it?.id && onToggleItem(it)}>
            <Checkbox status={it.status ? 'checked' : 'unchecked'} onPress={() => it?.id && onToggleItem(it)} />
            <Text style={styles.itemText}>{it.nome}</Text>
          </TouchableOpacity>
        ))}

        {(localList._tempItems || []).map((it) => (
          <View key={`tmp-${it.id}`} style={styles.itemRow}>
            <Checkbox status={it.status ? 'checked' : 'unchecked'} onPress={() => {}} />
            <TextInput
              style={[styles.itemText, styles.itemInput]}
              placeholder="Novo item"
              defaultValue={it.nome}
              autoFocus
              onSubmitEditing={(e) => onSubmitItem(localList.id, { ...it, nome: e.nativeEvent.text })}
              onBlur={(e) => onSubmitItem(localList.id, { ...it, nome: e.nativeEvent.text })}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default function ListasView({ viagem, onCreated }: ListasViewProps) {
  const [listas, setListas] = useState<(Lista & { _tempItems?: ListaItem[] })[]>([]);
  const [creatingList, setCreatingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');

  const fetchListas = async () => {
    console.log("trying to fetch")
    if (!viagem?.id) return;
    const resp = await listaService.getAllListas(viagem.id);
    console.log("resp", resp)
    if ((resp as any)?.message) return;
    const raw: any = resp;
    const data: Lista[] = Array.isArray(raw) ? raw : (raw ? [raw] : []);
    setListas(data);
  };

  useEffect(() => {
    fetchListas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viagem]);



  const handleAddTempItem = (listaId: number) => {
    setListas((prev) =>
      prev.map((l) =>
        l.id === listaId
          ? {
              ...l,
              _tempItems: [
                ...(l._tempItems || []),
                { id: Date.now(), nome: '', status: false } as ListaItem,
              ],
            }
          : l,
      ),
    );
  };

  const handleSubmitItem = async (listaId: number, item: ListaItem) => {
    if (!item.nome?.trim()) {
      // remove the temp line if empty
      setListas((prev) => prev.map((l) => (l.id === listaId ? { ...l, _tempItems: [] } : l)));
      return;
    }
    try {
      console.log('[Listas] creating item', item.nome, 'listaId', listaId);
      const res = await listaItemService.createListaItem({ nome: item.nome, status: false, listaId });
      if ((res as any)?.message) throw new Error((res as any).message);
      await fetchListas();
      onCreated?.();
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Erro', text2: 'Não foi possível criar o item.' });
    }
  };

  const handleCreateListOnBlur = async () => {
    setCreatingList(false);
    const title = newListTitle.trim();
    if (!title || !viagem?.id) return;
    await listaService.createLista({ titulo: title, viagemId: viagem.id });
    setNewListTitle('');
    await fetchListas();
    onCreated?.();
  };

  const handleToggleItem = async (item: ListaItem) => {
    try {
      console.log('[Listas] toggling item', item.id, 'to', !item.status);
      // Optimistic UI
      setListas(prev => prev.map(l => ({
        ...l,
        listaItems: l.listaItems.map(it => it.id === item.id ? { ...it, status: !item.status } : it)
      })));
      const res = await listaItemService.updateListaItem(item.id, { status: !item.status });
      if ((res as any)?.message) throw new Error((res as any).message);
      await fetchListas();
      onCreated?.();
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Erro', text2: 'Falha ao atualizar item.' });
      // Revert on error
      setListas(prev => prev.map(l => ({
        ...l,
        listaItems: l.listaItems.map(it => it.id === item.id ? { ...it, status: item.status } : it)
      })));
    }
  };

  const renderItem = ({ item }: { item: Lista & { _tempItems?: ListaItem[] } }) => (
    <ListaCard lista={item} onAddItem={handleAddTempItem} onSubmitItem={handleSubmitItem} onToggleItem={handleToggleItem} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={listas}
        keyExtractor={(l) => String(l.id)}
        renderItem={renderItem}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.dashed}
            activeOpacity={0.7}
            onPress={() => setCreatingList(true)}
          >
            {creatingList ? (
              <TextInput
                placeholder="Título da nova lista"
                style={styles.newListInput}
                autoFocus
                value={newListTitle}
                onChangeText={setNewListTitle}
                onBlur={handleCreateListOnBlur}
              />
            ) : (
              <Text style={styles.dashedText}>Nova Lista  +</Text>
            )}
          </TouchableOpacity>
        }
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.gray800,
  },
  linkText: {
    color: colors.lblue500,
    fontWeight: '600',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemText: {
    color: colors.gray800,
    flex: 1,
  },
  itemInput: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
    paddingVertical: 4,
  },
  dashed: {
    marginHorizontal: 16,
    marginTop: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.lblue500,
    borderRadius: 10,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  dashedText: {
    color: colors.lblue500,
    fontWeight: '600',
  },
  newListInput: {
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
    paddingVertical: 6,
  },
});
