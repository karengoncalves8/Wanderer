import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Viagem } from '@/interfaces/Viagem';
import { Acomodacao } from '@/interfaces/Acomodacao';
import { Atividade } from '@/interfaces/Atividade';
import { Passagem } from '@/interfaces/Passagem';
import { colors } from '@/styles/globalStyles';
import { formatDateStringToStringWithBar } from '@/utils/formatters/formatDateToString';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDateFromString } from '@/utils/dateRelated/createDateFromString';

export type ItineraryViewProps = {
  viagem: Viagem;
  atividades?: Atividade[];
  passagens?: Passagem[];
  acomodacoes?: Acomodacao[];
  setDataSelecionada: (data: string | null) => void;
};

const sameDayKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const getTripDates = (start?: Date, end?: Date) => {
  if (!start || !end) return [] as Date[];
  const s = createDateFromString(start)!;
  const e = createDateFromString(end)!;
  const days: Date[] = [];
  for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }
  return days;
};

const DatePill = ({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={[styles.datePill, active && styles.datePillActive]}>
    <Text style={[styles.datePillText, active && styles.datePillTextActive]}>{label}</Text>
  </TouchableOpacity>
);

type FeedItemType = 'atividade' | 'passagem' | 'acomodacao_checkin' | 'acomodacao_checkout';
type FeedItem = {
  type: FeedItemType;
  id: string;
  title: string;
  subtitle?: string;
  startTime?: string; // HH:mm
  endTime?: string;   // HH:mm
  // original references if needed for navigation
  atividade?: Atividade;
  passagem?: Passagem;
  acomodacao?: Acomodacao;
};

const ItineraryItemCard = ({ item }: { item: FeedItem }) => {
  const hasRange = item.startTime && item.endTime;
  const hasStart = !!item.startTime;
  const timeText = hasRange ? `${item.startTime} - ${item.endTime}` : hasStart ? item.startTime : undefined;

  const iconName =
    item.type === 'passagem' ? 'airplane-outline' :
    item.type === 'acomodacao_checkin' ? 'home-outline' :
    item.type === 'acomodacao_checkout' ? 'home-outline' :
    'location-outline';

  return (
    <View style={styles.cardRow}>
      <View style={styles.cardTimeCol}>
        {!!timeText && <Text style={styles.timeText}>{timeText}</Text>}
      </View>
      <View style={styles.cardIconCol}>
        <Ionicons name={iconName} size={24} color={colors.gray800} />
      </View>
      <View style={styles.cardMainCol}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        {!!item.subtitle && <Text style={styles.cardSub}>{item.subtitle}</Text>}
        {item.type === 'passagem' && item.passagem?.arquivo_pdf && (
          <Text style={styles.linkText}>Baixar Passagem  ⬇️</Text>
        )}
        {item.type === 'atividade' && item.atividade?.atividadeLocal?.localizacao && (
          <Text style={styles.linkText}>{item.atividade.atividadeLocal.localizacao}</Text>
        )}
      </View>
    </View>
  );
};

export default function ItineraryView({ viagem, atividades = [], passagens = [], acomodacoes, setDataSelecionada }: ItineraryViewProps) {
  const tripDays = useMemo(() => getTripDates(viagem?.dataIda ? createDateFromString(viagem.dataIda) : undefined, viagem?.dataVolta ? createDateFromString(viagem.dataVolta) : undefined), [viagem?.dataIda, viagem?.dataVolta]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    console.log('[Itinerary] tripDays keys', tripDays.map(d => sameDayKey(d)));
    setDataSelecionada(format(tripDays[0], 'yyyy-MM-dd'));
    setSelectedIndex(0);
  }, [tripDays]);
  useEffect(() => {
    console.log('[Itinerary] atividades count', atividades?.length ?? 0, (atividades ?? []).map(a => a.data));
  }, [atividades]);
  useEffect(() => {
    console.log('[Itinerary] selectedIndex', selectedIndex, 'selectedDay', tripDays[selectedIndex]?.toISOString?.());
  }, [selectedIndex, tripDays]);

  const acc = (acomodacoes ?? viagem?.acomodacoes ?? []) as Acomodacao[];

  // Helpers
  const timeToMinutes = (t?: string | null) => {
    if (!t) return null;
    const [h, m] = t.split(':').map(Number);
    if (Number.isNaN(h) || Number.isNaN(m)) return null;
    return h * 60 + m;
  };

  const buildFeedForDay = (day: Date): FeedItem[] => {
    const key = sameDayKey(day);
    const items: FeedItem[] = [];
    console.log('[Itinerary] Building feed for day', day?.toISOString?.(), 'key', key);

    // Atividades exactly on the day
    (atividades ?? []).forEach(a => {
      const d = createDateFromString(a.data);
      console.log('[Itinerary] atividade', a.id, 'raw', a.data, 'parsed', d?.toISOString?.(), 'dayKey', sameDayKey(d), 'matches?', sameDayKey(d) === key);
      if (!d || sameDayKey(d) !== key) return;
      items.push({
        type: 'atividade',
        id: `a-${a.id}`,
        title: a.nome,
        subtitle: a.atividadeLocal?.localizacao,
        startTime: a.hora_inicio?.slice(0, 5),
        endTime: a.hora_fim?.slice(0, 5),
        atividade: a,
      });
    });

    // Passagens only on departure or arrival day
    (passagens ?? []).forEach(p => {
      const locais = p.passagemLocais ?? [];
      const partida = locais.find(l => l.tipo === 'partida');
      const chegada = locais.find(l => l.tipo === 'chegada');

      const partidaDate = createDateFromString(partida?.data);
      const chegadaDate = createDateFromString(chegada?.data);

      const route = [partida?.localizacao, chegada?.localizacao].filter(Boolean).join(' para ');

      if (partidaDate && sameDayKey(partidaDate) === key) {
        items.push({
          type: 'passagem',
          id: `p-${p.id}-partida`,
          title: `Voo de ${route || 'Origem para Destino'}`,
          subtitle: undefined,
          // Times not available in interface; show none
          passagem: p,
        });
      }
      if (chegadaDate && sameDayKey(chegadaDate) === key && (!partidaDate || sameDayKey(partidaDate) !== key)) {
        items.push({
          type: 'passagem',
          id: `p-${p.id}-chegada`,
          title: `Chegada de ${route || 'Voo'}`,
          subtitle: undefined,
          passagem: p,
        });
      }
    });

    // Acomodações only on check-in and checkout days
    (acc ?? []).forEach(s => {
      const entrada = createDateFromString(s.data_entrada);
      const saida = createDateFromString(s.data_saida);
      const checkIn = typeof s.check_in === 'string' ? s.check_in.slice(0, 5) : undefined;
      const checkOut = typeof s.check_out === 'string' ? s.check_out.slice(0, 5) : undefined;

      if (entrada && sameDayKey(entrada) === key) {
        items.push({
          type: 'acomodacao_checkin',
          id: `s-${s.id}-in`,
          title: `Check-in • ${s.nome}`,
          subtitle: `${formatDateStringToStringWithBar(s.data_entrada)} - ${formatDateStringToStringWithBar(s.data_saida)}`,
          startTime: checkIn,
          acomodacao: s,
        });
      }
      if (saida && sameDayKey(saida) === key) {
        items.push({
          type: 'acomodacao_checkout',
          id: `s-${s.id}-out`,
          title: `Check-out • ${s.nome}`,
          subtitle: `${formatDateStringToStringWithBar(s.data_entrada)} - ${formatDateStringToStringWithBar(s.data_saida)}`,
          startTime: checkOut,
          acomodacao: s,
        });
      }
    });

    // Sort by time if present
    items.sort((a, b) => {
      const aMin = timeToMinutes(a.startTime) ?? 99999;
      const bMin = timeToMinutes(b.startTime) ?? 99999;
      if (aMin !== bMin) return aMin - bMin;
      // then by type to keep deterministic
      return a.type.localeCompare(b.type);
    });

    return items;
  };

  const selectedDay = tripDays[selectedIndex];
  const feed = selectedDay ? buildFeedForDay(selectedDay) : [];

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.datesBar}
      >
        {tripDays.map((d, idx) => (
          <DatePill
            key={sameDayKey(d)}
            label={format(d, 'd/LLL', { locale: ptBR }).replace('.', '')}
            active={idx === selectedIndex}
            onPress={() => {setSelectedIndex(idx); setDataSelecionada(format(d, 'yyyy-MM-dd')); }}
          />
        ))}
      </ScrollView>

      <View style={styles.feedContainer}>
        {feed.length === 0 ? (
          <View style={styles.emptyBlock}>
            <Text style={styles.emptyText}>Sem itens para este dia.</Text>
          </View>
        ) : (
          feed.map(item => <ItineraryItemCard key={item.id} item={item} />)
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  datesBar: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  datePill: {
    backgroundColor: '#EFF2F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  datePillActive: {
    backgroundColor: '#E3F2FD',
    borderColor: colors.lblue500,
  },
  datePillText: {
    color: colors.gray700 ?? '#6B7280',
    fontWeight: '600',
  },
  datePillTextActive: {
    color: colors.lblue500 ?? '#1C8ABF',
  },
  feedContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  cardRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTimeCol: {
    width: 70,
    paddingTop: 2,
  },
  cardIconCol: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
  cardMainCol: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    color: colors.gray800,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSub: {
    color: colors.gray600,
    fontSize: 13,
  },
  timeText: {
    color: colors.gray600,
    fontSize: 12,
    fontWeight: '500',
  },
  linkText: {
    color: colors.lblue500,
    fontWeight: '600',
  },
  emptyBlock: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.gray600,
  },
});
