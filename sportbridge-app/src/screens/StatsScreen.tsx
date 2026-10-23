import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

const TOP_PLAYERS = [
  { rank: 1, name: 'Sebastián López', sport: 'soccer' as const, sportColor: COLORS.football, rating: 9.2, matches: 45 },
  { rank: 2, name: 'Camila Torres', sport: 'soccer' as const, sportColor: COLORS.football, rating: 8.9, matches: 38 },
  { rank: 3, name: 'Andrés Mejía', sport: 'basketball' as const, sportColor: COLORS.basketball, rating: 8.7, matches: 41 },
  { rank: 4, name: 'David Cardona', sport: 'soccer' as const, sportColor: COLORS.football, rating: 7.8, matches: 23 },
  { rank: 5, name: 'Laura Gómez', sport: 'volleyball' as const, sportColor: COLORS.volleyball, rating: 7.5, matches: 19 },
  { rank: 6, name: 'Carlos Muñoz', sport: 'tennis' as const, sportColor: COLORS.tennis, rating: 7.3, matches: 28 },
];

const WEEKLY_STATS = [
  { label: 'Partidos esta semana', value: '127', icon: 'football-outline' as const },
  { label: 'Jugadores activos', value: '843', icon: 'people-outline' as const },
  { label: 'Canchas registradas', value: '56', icon: 'location-outline' as const },
  { label: 'Deportes disponibles', value: '5', icon: 'trophy-outline' as const },
];

export default function StatsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rankings</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-sharp" size={14} color={COLORS.accent} />
          <Text style={styles.locationText}>Medellín, Colombia</Text>
        </View>
      </View>

      {/* Weekly Stats */}
      <View style={styles.weeklyGrid}>
        {WEEKLY_STATS.map((stat) => (
          <View key={stat.label} style={styles.weeklyCard}>
            <View style={styles.weeklyIconBox}>
              <Ionicons name={stat.icon} size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.weeklyValue}>{stat.value}</Text>
            <Text style={styles.weeklyLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Top Players */}
      <View style={styles.sectionHeader}>
        <Ionicons name="flame" size={18} color={COLORS.accent} />
        <Text style={styles.sectionTitle}>Top Jugadores</Text>
      </View>

      {TOP_PLAYERS.map((player) => (
        <View key={player.rank} style={styles.playerRow}>
          <View style={[
            styles.rankBadge,
            { backgroundColor: player.rank === 1 ? COLORS.warning + '30' : player.rank === 2 ? COLORS.textSecondary + '30' : player.rank === 3 ? COLORS.accent + '30' : COLORS.bgCardLight }
          ]}>
            <Text style={[
              styles.rankText,
              { color: player.rank === 1 ? COLORS.warning : player.rank === 2 ? COLORS.textSecondary : player.rank === 3 ? COLORS.accent : COLORS.textMuted }
            ]}>{player.rank}</Text>
          </View>
          <View style={[styles.sportIcon, { backgroundColor: player.sportColor + '20' }]}>
            <MaterialCommunityIcons name={player.sport} size={18} color={player.sportColor} />
          </View>
          <View style={styles.playerInfo}>
            <Text style={styles.playerName}>{player.name}</Text>
            <Text style={styles.playerMeta}>{player.matches} partidos</Text>
          </View>
          <View style={[
            styles.ratingBadge,
            { backgroundColor: player.rating >= 8.5 ? COLORS.success + '20' : player.rating >= 7 ? COLORS.warning + '20' : COLORS.error + '20' }
          ]}>
            <Text style={[
              styles.ratingText,
              { color: player.rating >= 8.5 ? COLORS.success : player.rating >= 7 ? COLORS.warning : COLORS.error }
            ]}>{player.rating}</Text>
          </View>
        </View>
      ))}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  header: {
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    color: COLORS.accent,
    fontWeight: '500',
  },
  weeklyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 20,
  },
  weeklyCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    width: '47%',
  },
  weeklyIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  weeklyValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  weeklyLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 14,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgCard,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 14,
    padding: 14,
  },
  rankBadge: {
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rankText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  sportIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  playerMeta: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  ratingBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
