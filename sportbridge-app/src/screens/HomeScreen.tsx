import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

const SPORTS = [
  { name: 'Fútbol', icon: 'soccer' as const, color: COLORS.football },
  { name: 'Basket', icon: 'basketball' as const, color: COLORS.basketball },
  { name: 'Volley', icon: 'volleyball' as const, color: COLORS.volleyball },
  { name: 'Tennis', icon: 'tennis' as const, color: COLORS.tennis },
  { name: 'Running', icon: 'run-fast' as const, color: COLORS.running },
];

const MOCK_MATCHES = [
  {
    id: '1',
    sport: 'soccer' as const,
    sportColor: COLORS.football,
    title: 'Fútbol 5 en El Poblado',
    location: 'Cancha La 10, Medellín',
    date: 'Hoy — 7:00 PM',
    players: '7/10',
    level: 'Intermedio',
  },
  {
    id: '2',
    sport: 'basketball' as const,
    sportColor: COLORS.basketball,
    title: 'Basket 3v3 en Laureles',
    location: 'Parque de Laureles, Medellín',
    date: 'Mañana — 5:00 PM',
    players: '4/6',
    level: 'Todos los niveles',
  },
  {
    id: '3',
    sport: 'volleyball' as const,
    sportColor: COLORS.volleyball,
    title: 'Volley mixto en Envigado',
    location: 'Polideportivo Sur, Envigado',
    date: 'Sábado — 9:00 AM',
    players: '8/12',
    level: 'Avanzado',
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.logo}>Sport<Text style={styles.logoBold}>Bridge</Text></Text>
            <Text style={styles.subtitle}>Find players. Create matches.</Text>
          </View>
          <TouchableOpacity style={styles.notifButton}>
            <Ionicons name="notifications-outline" size={22} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.locationRow}>
          <Ionicons name="location-sharp" size={14} color={COLORS.accent} />
          <Text style={styles.locationText}>Medellín, Colombia</Text>
        </View>
      </View>

      {/* Sports Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sportsRow}>
        {SPORTS.map((sport) => (
          <TouchableOpacity key={sport.name} style={[styles.sportChip, { borderColor: sport.color }]}>
            <MaterialCommunityIcons name={sport.icon} size={18} color={sport.color} />
            <Text style={[styles.sportChipText, { color: sport.color }]}>{sport.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Partidos cerca de ti</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>Ver todos</Text>
        </TouchableOpacity>
      </View>

      {/* Matches */}
      {MOCK_MATCHES.map((match) => (
        <TouchableOpacity key={match.id} style={styles.matchCard}>
          <View style={styles.matchHeader}>
            <View style={[styles.sportIcon, { backgroundColor: match.sportColor + '20' }]}>
              <MaterialCommunityIcons name={match.sport} size={22} color={match.sportColor} />
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{match.level}</Text>
            </View>
          </View>
          <Text style={styles.matchTitle}>{match.title}</Text>
          <View style={styles.matchInfoRow}>
            <Ionicons name="location-outline" size={14} color={COLORS.textSecondary} />
            <Text style={styles.matchInfo}>{match.location}</Text>
          </View>
          <View style={styles.matchInfoRow}>
            <Ionicons name="time-outline" size={14} color={COLORS.textSecondary} />
            <Text style={styles.matchInfo}>{match.date}</Text>
          </View>
          <View style={styles.matchFooter}>
            <View style={styles.playersRow}>
              <Ionicons name="people-outline" size={16} color={COLORS.textSecondary} />
              <Text style={styles.matchPlayers}>{match.players} jugadores</Text>
            </View>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Unirme</Text>
              <Ionicons name="arrow-forward" size={14} color={COLORS.bgDark} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  logo: {
    fontSize: 26,
    color: COLORS.textSecondary,
    fontWeight: '300',
  },
  logoBold: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  notifButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    color: COLORS.accent,
    fontWeight: '500',
  },
  sportsRow: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sportChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 10,
    borderWidth: 1.5,
    backgroundColor: COLORS.bgCard,
    gap: 6,
  },
  sportChipText: {
    fontWeight: '600',
    fontSize: 13,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  seeAll: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },
  matchCard: {
    backgroundColor: COLORS.bgCard,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sportIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelBadge: {
    backgroundColor: COLORS.bgDark,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  levelText: {
    fontSize: 11,
    color: COLORS.primaryLight,
    fontWeight: '600',
  },
  matchTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  matchInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  matchInfo: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  matchFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.bgDark,
  },
  playersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  matchPlayers: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  joinButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  joinButtonText: {
    color: COLORS.bgDark,
    fontWeight: 'bold',
    fontSize: 13,
  },
});
