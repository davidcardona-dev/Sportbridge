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
  location: string;
  main_sport: string;
  rating: number;
  matches_played: number;
  wins: number;
  draws: number;
  losses: number;
  mvp_count: number;
};

export default function ProfileScreen() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    setLoading(true);
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('username', '@davidcardona')
      .single();

    if (!error && data) {
      setPlayer(data);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ color: COLORS.textSecondary, marginTop: 12 }}>Cargando perfil...</Text>
      </View>
    );
  }

  if (!player) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Ionicons name="person-outline" size={48} color={COLORS.textMuted} />
        <Text style={{ color: COLORS.textSecondary, marginTop: 12 }}>Perfil no encontrado</Text>
      </View>
    );
  }

  const winRate = Math.round((player.wins / player.matches_played) * 100);
  const sportVisual = SPORT_ICON_MAP[player.main_sport] || { icon: 'soccer', color: COLORS.primary };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={36} color={COLORS.primary} />
        </View>
        <Text style={styles.name}>{player.name}</Text>
        <Text style={styles.username}>@{player.username}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-sharp" size={13} color={COLORS.accent} />
          <Text style={styles.location}>{player.location}</Text>
        </View>
        <View style={[styles.ratingBadge, {
          backgroundColor: Number(player.rating) >= 8.5 ? COLORS.success : Number(player.rating) >= 7 ? COLORS.primary : COLORS.warning,
        }]}>
          <Text style={styles.ratingText}>{Number(player.rating).toFixed(1)}</Text>
        </View>
      </View>

      {/* Main Sport */}
      <View style={styles.sectionHeader}>
        <MaterialCommunityIcons name={sportVisual.icon as any} size={18} color={sportVisual.color} />
        <Text style={styles.sectionTitle}>Deporte principal</Text>
      </View>
      <View style={styles.mainSportRow}>
        <View style={[styles.sportTag, { borderColor: sportVisual.color }]}>
          <MaterialCommunityIcons name={sportVisual.icon as any} size={16} color={sportVisual.color} />
          <Text style={[styles.sportTagText, { color: sportVisual.color }]}>{player.main_sport}</Text>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.sectionHeader}>
        <Ionicons name="stats-chart" size={18} color={COLORS.secondary} />
        <Text style={styles.sectionTitle}>Estadísticas</Text>
      </View>
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{player.matches_played}</Text>
          <Text style={styles.statLabel}>Partidos</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: COLORS.success }]}>{player.wins}</Text>
          <Text style={styles.statLabel}>Victorias</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{player.draws}</Text>
          <Text style={styles.statLabel}>Empates</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: COLORS.error }]}>{player.losses}</Text>
          <Text style={styles.statLabel}>Derrotas</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: COLORS.warning }]}>{winRate}%</Text>
          <Text style={styles.statLabel}>Win Rate</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: COLORS.accent }]}>{player.mvp_count}</Text>
          <Text style={styles.statLabel}>MVP</Text>
        </View>
      </View>

      {/* Performance Bar */}
      <View style={styles.sectionHeader}>
        <Ionicons name="bar-chart" size={18} color={COLORS.primaryLight} />
        <Text style={styles.sectionTitle}>Rendimiento</Text>
      </View>
      <View style={styles.performanceCard}>
        <View style={styles.perfRow}>
          <Text style={styles.perfLabel}>Victorias</Text>
          <View style={styles.perfBarBg}>
            <View style={[styles.perfBarFill, { width: `${winRate}%`, backgroundColor: COLORS.success }]} />
          </View>
          <Text style={[styles.perfValue, { color: COLORS.success }]}>{winRate}%</Text>
        </View>
        <View style={styles.perfRow}>
          <Text style={styles.perfLabel}>Empates</Text>
          <View style={styles.perfBarBg}>
            <View style={[styles.perfBarFill, { width: `${Math.round((player.draws / player.matches_played) * 100)}%`, backgroundColor: COLORS.warning }]} />
          </View>
          <Text style={[styles.perfValue, { color: COLORS.warning }]}>{Math.round((player.draws / player.matches_played) * 100)}%</Text>
        </View>
        <View style={styles.perfRow}>
          <Text style={styles.perfLabel}>Derrotas</Text>
          <View style={styles.perfBarBg}>
            <View style={[styles.perfBarFill, { width: `${Math.round((player.losses / player.matches_played) * 100)}%`, backgroundColor: COLORS.error }]} />
          </View>
          <Text style={[styles.perfValue, { color: COLORS.error }]}>{Math.round((player.losses / player.matches_played) * 100)}%</Text>
        </View>
      </View>

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
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.primary + '40',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  username: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  location: {
    fontSize: 13,
    color: COLORS.accent,
    fontWeight: '500',
  },
  ratingBadge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  ratingText: {
    color: COLORS.bgDark,
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  mainSportRow: {
    paddingHorizontal: 20,
  },
  sportTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.bgCard,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    gap: 6,
  },
  sportTagText: {
    fontSize: 13,
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
  },
  statBox: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    width: '31%',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  performanceCard: {
    backgroundColor: COLORS.bgCard,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },
  perfRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  perfLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    width: 65,
  },
  perfBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.bgDark,
    borderRadius: 4,
    overflow: 'hidden',
  },
  perfBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  perfValue: {
    fontSize: 13,
    fontWeight: 'bold',
    width: 40,
    textAlign: 'right',
  },
});
