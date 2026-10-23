import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

const PLAYER_STATS = {
  name: 'David Cardona',
  username: '@davidcardona',
  location: 'Medellín, Colombia',
  mainSport: 'Fútbol',
  rating: 7.8,
  matchesPlayed: 23,
  wins: 14,
  draws: 5,
  losses: 4,
  mvp: 5,
  streak: '3 victorias seguidas',
  sports: [
    { name: 'Fútbol', icon: 'soccer' as const, color: COLORS.football },
    { name: 'Basket', icon: 'basketball' as const, color: COLORS.basketball },
    { name: 'Running', icon: 'run-fast' as const, color: COLORS.running },
  ],
  recentMatches: [
    { date: 'Oct 20', sport: 'soccer' as const, sportColor: COLORS.football, result: 'W', score: '4-2', rating: 8.2 },
    { date: 'Oct 18', sport: 'soccer' as const, sportColor: COLORS.football, result: 'W', score: '3-1', rating: 7.5 },
    { date: 'Oct 15', sport: 'basketball' as const, sportColor: COLORS.basketball, result: 'L', score: '18-21', rating: 6.8 },
    { date: 'Oct 12', sport: 'soccer' as const, sportColor: COLORS.football, result: 'W', score: '5-3', rating: 8.9 },
    { date: 'Oct 10', sport: 'soccer' as const, sportColor: COLORS.football, result: 'D', score: '2-2', rating: 7.1 },
  ],
  reviews: [
    { user: 'Carlos M.', text: 'Buen jugador, muy puntual', stars: 5 },
    { user: 'Andrés R.', text: 'Excelente nivel, fair play', stars: 5 },
    { user: 'Juan P.', text: 'Buen compañero de equipo', stars: 4 },
  ],
};

export default function ProfileScreen() {
  const winRate = Math.round((PLAYER_STATS.wins / PLAYER_STATS.matchesPlayed) * 100);

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={36} color={COLORS.primary} />
        </View>
        <Text style={styles.name}>{PLAYER_STATS.name}</Text>
        <Text style={styles.username}>{PLAYER_STATS.username}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-sharp" size={13} color={COLORS.accent} />
          <Text style={styles.location}>{PLAYER_STATS.location}</Text>
        </View>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>{PLAYER_STATS.rating}</Text>
        </View>
        <View style={styles.streakRow}>
          <Ionicons name="flame" size={14} color={COLORS.accent} />
          <Text style={styles.streak}>{PLAYER_STATS.streak}</Text>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.sectionHeader}>
        <Ionicons name="stats-chart" size={18} color={COLORS.secondary} />
        <Text style={styles.sectionTitle}>Estadísticas</Text>
      </View>
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{PLAYER_STATS.matchesPlayed}</Text>
          <Text style={styles.statLabel}>Partidos</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: COLORS.success }]}>{PLAYER_STATS.wins}</Text>
          <Text style={styles.statLabel}>Victorias</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{PLAYER_STATS.draws}</Text>
          <Text style={styles.statLabel}>Empates</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: COLORS.error }]}>{PLAYER_STATS.losses}</Text>
          <Text style={styles.statLabel}>Derrotas</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: COLORS.warning }]}>{winRate}%</Text>
          <Text style={styles.statLabel}>Win Rate</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: COLORS.accent }]}>{PLAYER_STATS.mvp}</Text>
          <Text style={styles.statLabel}>MVP</Text>
        </View>
      </View>

      {/* Sports */}
      <View style={styles.sectionHeader}>
        <Ionicons name="trophy-outline" size={18} color={COLORS.warning} />
        <Text style={styles.sectionTitle}>Deportes</Text>
      </View>
      <View style={styles.sportsRow}>
        {PLAYER_STATS.sports.map((sport) => (
          <View key={sport.name} style={[styles.sportTag, { borderColor: sport.color }]}>
            <MaterialCommunityIcons name={sport.icon} size={16} color={sport.color} />
            <Text style={[styles.sportTagText, { color: sport.color }]}>{sport.name}</Text>
          </View>
        ))}
      </View>

      {/* Recent Matches */}
      <View style={styles.sectionHeader}>
        <Ionicons name="calendar-outline" size={18} color={COLORS.primaryLight} />
        <Text style={styles.sectionTitle}>Últimos partidos</Text>
      </View>
      {PLAYER_STATS.recentMatches.map((match, index) => (
        <View key={index} style={styles.matchRow}>
          <Text style={styles.matchDate}>{match.date}</Text>
          <View style={[styles.matchSportIcon, { backgroundColor: match.sportColor + '20' }]}>
            <MaterialCommunityIcons name={match.sport} size={16} color={match.sportColor} />
          </View>
          <Text style={[
            styles.matchResult,
            { color: match.result === 'W' ? COLORS.success : match.result === 'L' ? COLORS.error : COLORS.warning }
          ]}>
            {match.result === 'W' ? 'Victoria' : match.result === 'L' ? 'Derrota' : 'Empate'}
          </Text>
          <Text style={styles.matchScore}>{match.score}</Text>
          <View style={[
            styles.ratingSmall,
            { backgroundColor: match.rating >= 8 ? COLORS.success + '20' : match.rating >= 7 ? COLORS.warning + '20' : COLORS.error + '20' }
          ]}>
            <Text style={[
              styles.ratingSmallText,
              { color: match.rating >= 8 ? COLORS.success : match.rating >= 7 ? COLORS.warning : COLORS.error }
            ]}>{match.rating}</Text>
          </View>
        </View>
      ))}

      {/* Reviews */}
      <View style={styles.sectionHeader}>
        <Ionicons name="chatbubble-outline" size={18} color={COLORS.secondaryLight} />
        <Text style={styles.sectionTitle}>Reviews</Text>
      </View>
      {PLAYER_STATS.reviews.map((review, index) => (
        <View key={index} style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewUser}>{review.user}</Text>
            <View style={styles.starsRow}>
              {Array.from({ length: review.stars }).map((_, i) => (
                <Ionicons key={i} name="star" size={12} color={COLORS.warning} />
              ))}
            </View>
          </View>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      ))}

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
    backgroundColor: COLORS.primary,
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
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 4,
  },
  streak: {
    fontSize: 13,
    color: COLORS.accent,
    fontWeight: '600',
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
  sportsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
  },
  sportTag: {
    flexDirection: 'row',
    alignItems: 'center',
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
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgCard,
    marginHorizontal: 16,
    marginBottom: 6,
    borderRadius: 12,
    padding: 12,
    justifyContent: 'space-between',
  },
  matchDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
    width: 48,
  },
  matchSportIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchResult: {
    fontSize: 12,
    fontWeight: '600',
    width: 58,
  },
  matchScore: {
    fontSize: 13,
    color: COLORS.textPrimary,
    fontWeight: '600',
    width: 42,
  },
  ratingSmall: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingSmallText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  reviewCard: {
    backgroundColor: COLORS.bgCard,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 14,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  reviewUser: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
});
