import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { supabase } from '../lib/supabase';

const SPORT_ICON_MAP: Record<string, { icon: string; color: string }> = {
  'Fútbol': { icon: 'soccer', color: COLORS.football },
  'Basketball': { icon: 'basketball', color: COLORS.basketball },
  'Volleyball': { icon: 'volleyball', color: COLORS.volleyball },
  'Tennis': { icon: 'tennis', color: COLORS.tennis },
  'Running': { icon: 'run-fast', color: COLORS.running },
};

type Player = {
  id: string;
  name: string;
  username: string;
  main_sport: string;
  rating: number;
  matches_played: number;
  wins: number;
  draws: number;
  losses: number;
  mvp_count: number;
};

type Stats = {
  totalPlayers: number;
  totalMatches: number;
  avgRating: number;
};

export default function StatsScreen() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [stats, setStats] = useState<Stats>({ totalPlayers: 0, totalMatches: 0, avgRating: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);

    const { data: playersData, error: playersError } = await supabase
      .from('players')
      .select('*')
      .order('rating', { ascending: false });

    const { data: matchesData } = await supabase
      .from('matches')
      .select('id');

    if (!playersError && playersData) {
      setPlayers(playersData);
      const avg = playersData.reduce((sum, p) => sum + Number(p.rating), 0) / playersData.length;
      setStats({
        totalPlayers: playersData.length,
        totalMatches: matchesData?.length || 0,
        avgRating: Math.round(avg * 10) / 10,
      });
    }
    setLoading(false);
  }

  function getSportVisual(sport: string) {
    return SPORT_ICON_MAP[sport] || { icon: 'soccer', color: COLORS.primary };
  }

  function getRatingColor(rating: number) {
    if (rating >= 8.5) return COLORS.success;
    if (rating >= 7) return COLORS.warning;
    return COLORS.error;
  }

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ color: COLORS.textSecondary, marginTop: 12 }}>Cargando rankings...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Rankings</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-sharp" size={14} color={COLORS.accent} />
          <Text style={styles.locationText}>Medellín, Colombia</Text>
        </View>
      </View>

      {/* Weekly Stats */}
      <View style={styles.weeklyGrid}>
        <View style={styles.weeklyCard}>
          <View style={[styles.weeklyIconBox, { backgroundColor: COLORS.primary + '20' }]}>
            <Ionicons name="people" size={20} color={COLORS.primary} />
          </View>
          <Text style={styles.weeklyValue}>{stats.totalPlayers}</Text>
          <Text style={styles.weeklyLabel}>Jugadores</Text>
        </View>
        <View style={styles.weeklyCard}>
          <View style={[styles.weeklyIconBox, { backgroundColor: COLORS.football + '20' }]}>
            <Ionicons name="football" size={20} color={COLORS.football} />
          </View>
          <Text style={styles.weeklyValue}>{stats.totalMatches}</Text>
          <Text style={styles.weeklyLabel}>Partidos</Text>
        </View>
        <View style={styles.weeklyCard}>
          <View style={[styles.weeklyIconBox, { backgroundColor: COLORS.warning + '20' }]}>
            <Ionicons name="star" size={20} color={COLORS.warning} />
          </View>
          <Text style={styles.weeklyValue}>{stats.avgRating}</Text>
          <Text style={styles.weeklyLabel}>Rating Prom.</Text>
        </View>
      </View>

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Ionicons name="trophy" size={20} color={COLORS.warning} />
        <Text style={styles.sectionTitle}>Top Jugadores</Text>
      </View>

      {/* Players Ranking */}
      {players.map((player, index) => {
        const visual = getSportVisual(player.main_sport);
        const ratingColor = getRatingColor(Number(player.rating));
        return (
          <View key={player.id} style={styles.playerRow}>
            <View style={[styles.rankBadge, {
              backgroundColor: index === 0 ? '#FFD700' + '20' : index === 1 ? '#C0C0C0' + '20' : index === 2 ? '#CD7F32' + '20' : COLORS.bgDark,
            }]}>
              <Text style={[styles.rankText, {
                color: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : COLORS.textSecondary,
              }]}>#{index + 1}</Text>
            </View>
            <View style={[styles.sportIcon, { backgroundColor: visual.color + '20' }]}>
              <MaterialCommunityIcons name={visual.icon as any} size={18} color={visual.color} />
            </View>
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={styles.playerMeta}>{player.matches_played} partidos  ·  {player.mvp_count} MVPs  ·  {player.wins}W</Text>
            </View>
            <View style={[styles.ratingBadge, { backgroundColor: ratingColor + '20' }]}>
              <Text style={[styles.ratingText, { color: ratingColor }]}>{Number(player.rating).toFixed(1)}</Text>
            </View>
          </View>
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
  title: {
    fontSize: 28,
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
    marginBottom: 24,
  },
  weeklyCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '30%',
  },
  weeklyIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.bgDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  weeklyValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  weeklyLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
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
    fontSize: 18,
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
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rankText: {
    fontSize: 13,
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
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  playerMeta: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 3,
  },
  ratingBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  ratingText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
