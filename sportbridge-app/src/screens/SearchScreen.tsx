import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { supabase } from '../lib/supabase';

const SPORT_FILTERS = [
  { id: 'all', name: 'Todos', icon: 'trophy-outline', color: COLORS.primary },
  { id: 'Fútbol', name: 'Fútbol', icon: 'soccer', color: COLORS.football },
  { id: 'Basketball', name: 'Basket', icon: 'basketball', color: COLORS.basketball },
  { id: 'Volleyball', name: 'Volley', icon: 'volleyball', color: COLORS.volleyball },
  { id: 'Tennis', name: 'Tennis', icon: 'tennis', color: COLORS.tennis },
  { id: 'Running', name: 'Running', icon: 'run-fast', color: COLORS.running },
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

export default function SearchScreen() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');

  useEffect(() => {
    fetchMatches();
  }, [selectedSport]);

  async function fetchMatches() {
    setLoading(true);
    let query = supabase
      .from('matches')
      .select('*')
      .order('match_date', { ascending: true });

    if (selectedSport !== 'all') {
      query = query.eq('sport', selectedSport);
    }

    const { data, error } = await query;

    if (!error && data) {
      setMatches(data);
    }
    setLoading(false);
  }

  const filteredMatches = matches.filter((match) => {
    if (!searchText) return true;
    const search = searchText.toLowerCase();
    return (
      match.title.toLowerCase().includes(search) ||
      match.location.toLowerCase().includes(search) ||
      match.level.toLowerCase().includes(search)
    );
  });

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const day = date.getDate();
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const month = months[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, '0');
    const mins = date.getMinutes().toString().padStart(2, '0');
    return `${day} ${month} · ${hours}:${mins}`;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Buscar Partidos</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color={COLORS.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por título, ubicación, nivel..."
            placeholderTextColor={COLORS.textMuted}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Sport Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll} contentContainerStyle={styles.filtersContent}>
        {SPORT_FILTERS.map((sport) => {
          const isSelected = selectedSport === sport.id;
          return (
            <TouchableOpacity
              key={sport.id}
              style={[styles.filterChip, isSelected && { backgroundColor: sport.color, borderColor: sport.color }]}
              onPress={() => setSelectedSport(sport.id)}
            >
              {sport.id === 'all' ? (
                <Ionicons name={sport.icon as any} size={16} color={isSelected ? COLORS.bgDark : sport.color} />
              ) : (
                <MaterialCommunityIcons name={sport.icon as any} size={16} color={isSelected ? COLORS.bgDark : sport.color} />
              )}
              <Text style={[styles.filterChipText, isSelected && { color: COLORS.bgDark }]}>{sport.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>{filteredMatches.length} partidos encontrados</Text>
      </View>

      {/* Loading */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Buscando partidos...</Text>
        </View>
      )}

      {/* No Results */}
      {!loading && filteredMatches.length === 0 && (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={48} color={COLORS.textMuted} />
          <Text style={styles.emptyText}>No se encontraron partidos</Text>
          <Text style={styles.emptySubtext}>Intenta con otro deporte o búsqueda</Text>
        </View>
      )}

      {/* Match Results */}
      {!loading && filteredMatches.map((match) => {
        const sportVisual = SPORT_ICON_MAP[match.sport] || { icon: 'soccer', color: COLORS.primary };
        const spotsLeft = match.max_players - match.current_players;
        const isFull = spotsLeft <= 0;

        return (
          <TouchableOpacity key={match.id} style={styles.matchCard}>
            <View style={styles.matchTop}>
              <View style={[styles.sportIcon, { backgroundColor: sportVisual.color + '20' }]}>
                <MaterialCommunityIcons name={sportVisual.icon as any} size={22} color={sportVisual.color} />
              </View>
              <View style={styles.matchInfo}>
                <Text style={styles.matchTitle}>{match.title}</Text>
                <View style={styles.matchMeta}>
                  <Ionicons name="location-outline" size={12} color={COLORS.textSecondary} />
                  <Text style={styles.matchMetaText}>{match.location}</Text>
                </View>
              </View>
              <View style={[styles.levelBadge, { borderColor: sportVisual.color }]}>
                <Text style={[styles.levelText, { color: sportVisual.color }]}>{match.level}</Text>
              </View>
            </View>
            <View style={styles.matchBottom}>
              <View style={styles.matchDetail}>
                <Ionicons name="calendar-outline" size={14} color={COLORS.textSecondary} />
                <Text style={styles.matchDetailText}>{formatDate(match.match_date)}</Text>
              </View>
              <View style={styles.matchDetail}>
                <Ionicons name="people-outline" size={14} color={COLORS.textSecondary} />
                <Text style={styles.matchDetailText}>{match.current_players}/{match.max_players}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: isFull ? COLORS.error + '20' : COLORS.success + '20' }]}>
                <Text style={[styles.statusText, { color: isFull ? COLORS.error : COLORS.success }]}>
                  {isFull ? 'Lleno' : `${spotsLeft} cupos`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}

      <View style={{ height: 40 }} />
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
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgInput,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  filtersScroll: {
    marginBottom: 10,
  },
  filtersContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.bgCardLight,
    backgroundColor: COLORS.bgCard,
    gap: 6,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  resultsHeader: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  resultsCount: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingTop: 40,
    gap: 12,
  },
  loadingText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 40,
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
    marginBottom: 10,
    borderRadius: 16,
    padding: 16,
  },
  matchTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sportIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  matchInfo: {
    flex: 1,
  },
  matchTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  matchMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  matchMetaText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1.5,
  },
  levelText: {
    fontSize: 11,
    fontWeight: '600',
  },
  matchBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.bgCardLight,
    paddingTop: 10,
    gap: 16,
  },
  matchDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  matchDetailText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  statusBadge: {
    marginLeft: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
