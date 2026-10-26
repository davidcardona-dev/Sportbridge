import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { supabase } from '../lib/supabase';

const SPORTS = [
  { name: 'Todos', icon: 'all-inclusive' as const, color: COLORS.primary },
  { name: 'Fútbol', icon: 'soccer' as const, color: COLORS.football },
  { name: 'Basket', icon: 'basketball' as const, color: COLORS.basketball },
  { name: 'Volley', icon: 'volleyball' as const, color: COLORS.volleyball },
  { name: 'Tennis', icon: 'tennis' as const, color: COLORS.tennis },
  { name: 'Running', icon: 'run-fast' as const, color: COLORS.running },
];

const SPORT_ICON_MAP: Record<string, { icon: string; color: string }> = {
  'Fútbol': { icon: 'soccer', color: COLORS.football },
  'Basketball': { icon: 'basketball', color: COLORS.basketball },
  'Volleyball': { icon: 'volleyball', color: COLORS.volleyball },
  'Tennis': { icon: 'tennis', color: COLORS.tennis },
  'Running': { icon: 'run-fast', color: COLORS.running },
};

type Match = {
  id: string;
  sport: string;
  title: string;
  location: string;
  match_date: string;
  max_players: number;
  current_players: number;
  level: string;
  status: string;
};

export default function HomeScreen() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState('Todos');

  useEffect(() => {
    fetchMatches();
  }, [selectedSport]);

  async function fetchMatches() {
    setLoading(true);
    let query = supabase
      .from('matches')
      .select('*')
      .eq('status', 'open')
      .order('match_date', { ascending: true });

    if (selectedSport !== 'Todos') {
      query = query.eq('sport', selectedSport === 'Basket' ? 'Basketball' : selectedSport === 'Volley' ? 'Volleyball' : selectedSport);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching matches:', error);
    } else {
      setMatches(data || []);
    }
    setLoading(false);
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    const time = date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

    if (diffDays === 0 && diffHours > 0) return `Hoy — ${time}`;
    if (diffDays === 1) return `Mañana — ${time}`;
    if (diffDays < 7) {
      const dayName = date.toLocaleDateString('es-CO', { weekday: 'long' });
      return `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} — ${time}`;
    }
    return date.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' }) + ` — ${time}`;
  }

  function getSportVisual(sport: string) {
    return SPORT_ICON_MAP[sport] || { icon: 'soccer', color: COLORS.primary };
  }

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
          <TouchableOpacity
            key={sport.name}
            style={[
              styles.sportChip,
              { borderColor: sport.color },
              selectedSport === sport.name && { backgroundColor: sport.color + '20' },
            ]}
            onPress={() => setSelectedSport(sport.name)}
          >
            <MaterialCommunityIcons name={sport.icon as any} size={18} color={sport.color} />
            <Text style={[styles.sportChipText, { color: sport.color }]}>{sport.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Partidos cerca de ti</Text>
        <TouchableOpacity onPress={fetchMatches}>
          <Ionicons name="refresh-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Loading */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Cargando partidos...</Text>
        </View>
      )}

      {/* No matches */}
      {!loading && matches.length === 0 && (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={48} color={COLORS.textMuted} />
          <Text style={styles.emptyText}>No hay partidos disponibles</Text>
          <Text style={styles.emptySubtext}>¡Crea uno y sé el primero!</Text>
        </View>
      )}

      {/* Matches from Supabase */}
      {!loading && matches.map((match) => {
        const visual = getSportVisual(match.sport);
        return (
          <TouchableOpacity key={match.id} style={styles.matchCard}>
            <View style={styles.matchHeader}>
              <View style={[styles.sportIcon, { backgroundColor: visual.color + '20' }]}>
                <MaterialCommunityIcons name={visual.icon as any} size={22} color={visual.color} />
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
              <Text style={styles.matchInfo}>{formatDate(match.match_date)}</Text>
            </View>
            <View style={styles.matchFooter}>
              <View style={styles.playersRow}>
                <Ionicons name="people-outline" size={16} color={COLORS.textSecondary} />
                <Text style={styles.matchPlayers}>{match.current_players}/{match.max_players} jugadores</Text>
              </View>
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Unirme</Text>
                <Ionicons name="arrow-forward" size={14} color={COLORS.bgDark} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      })}

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
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  loadingText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  emptySubtext: {
    color: COLORS.textMuted,
    fontSize: 13,
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
