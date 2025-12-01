import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Viagem } from '@/interfaces/Viagem';
import { Despesa } from '@/interfaces/Despesa';
import { colors } from '@/styles/globalStyles';
import { despesaService } from '@/services/despesaService';
import GenericModal from '@/components/Modals/GenericModal/Modal';
import DespesaForm from '@/components/Forms/DespesaForm';
import { useTranslation } from 'react-i18next';

export type GastosViewProps = {
  viagem: Viagem;
  onCreated: () => void;
};

const DespesaItem = ({ item }: { item: Despesa }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.nome}</Text>
        <Text style={styles.cardValue}>{t('common.currency', { value: item.valor?.toFixed(2) })}</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.cardCategory}>{item.despesaCategoria?.nome ?? t('expenses.noCategory')}</Text>
        <Text style={styles.cardDate}>{item.createdAt ? format(new Date(item.createdAt), "d 'de' LLL", { locale: ptBR }) : ''}</Text>
      </View>
    </View>
  );
};

export default function GastosView({ viagem, onCreated }: GastosViewProps) {
  const { t } = useTranslation();
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const gastosId = viagem?.gastos?.id;
  const orcamento = viagem?.gastos?.orcamento ?? 0;
  const totalFromState = useMemo(() => despesas.reduce((acc, d) => acc + (d.valor ?? 0), 0), [despesas]);
  const total = viagem?.gastos?.total ?? totalFromState;
  const percent = orcamento > 0 ? Math.min(100, Math.round((total / orcamento) * 100)) : 0;

  const fetchDespesas = async () => {
    if (!gastosId) return;
    setLoading(true);
    const resp = await despesaService.getAllDespesas(gastosId);
    if (!(resp as any)?.message) setDespesas(resp as Despesa[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDespesas();
  }, [gastosId]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.totalLabel}>{t('expenses.total')}</Text>
        <Text style={styles.totalValue}>{t('common.currency', { value: total.toFixed(2) })}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${percent}%` }]} />
        </View>
        <Text style={styles.orcamentoText}>
          {t('expenses.budget', { value: orcamento.toFixed(2), percent })}
        </Text>
      </View>

      {/* List */}
      <FlatList
        data={[...despesas].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <DespesaItem item={item} />}
        ListEmptyComponent={!loading ? <Text style={styles.emptyText}>{t('expenses.noExpenses')}</Text> : null}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalOpen(true)}
        accessibilityLabel={t('expenses.addExpense')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Modal */}
      <GenericModal
        visible={modalOpen}
        title={t('expenses.newExpense')}
        onClose={() => setModalOpen(false)}
      >
        {gastosId && (
          <DespesaForm
            gastosId={gastosId}
            onClose={() => setModalOpen(false)}
            onCreated={() => {
              fetchDespesas();
              onCreated();
            }}
          />
        )}
      </GenericModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  totalLabel: {
    color: colors.gray600,
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.gray800,
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: colors.gray200,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.lblue500,
  },
  orcamentoText: {
    color: colors.gray700,
    marginTop: 4,
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
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray800,
  },
  cardValue: {
    fontWeight: '700',
    color: colors.gray800,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardCategory: {
    color: colors.gray700,
  },
  cardDate: {
    color: colors.gray600,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.gray600,
    marginTop: 24,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.lblue500,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});
