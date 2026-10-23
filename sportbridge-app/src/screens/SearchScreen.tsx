import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

const NEARBY_COURTS = [
  { id: '1', name: 'Cancha La 10', sport: 'soccer' as const, sportColor: COLORS.football, distance: '0.8 km', rating: '4.5', price: '$50.000/hr' },
  { id: '2', name: 'Parque de Laureles', sport: 'basketball' as const, sportColor: COLORS.basketball, distance: '1.2 km', rating: '4.2', price: 'Gratis' },
  { id: '3', name: 'Polideportivo Sur', sport: 'volleyball' as const, sportColor: COLORS.volleyball, distance: '2.5 km', rating: '4.7', price: '$30.000/hr' },
  { id: '4', name: 'Club Tennis Medellín', sport: 'tennis' as const, sportColor: COLORS.tennis, distance: '3.1 km', rating: '4.8', price: '$80.000/hr' },
];

export default function SearchScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Buscar</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color={COLORS.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Partidos, canchas, jugadores..."
            placeholderTextColor={COLORS.textSecondary}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={18} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Ionicons name="location-sharp" size={18} color={COLORS.accent} />
        <Text style={styles.sectionTitle}>Canchas cerca de ti</Text>
      </View>

      {NEARBY_COURTS.map((court) => (
        <TouchableOpacity key={court.id} style={styles.courtCard}>
          <View style={styles.courtLeft}>
            <View style={[styles.sportIcon, { backgroundColor: court.sportColor + '20' }]}>
              <MaterialCommunityIcons name={court.sport} size={22} color={court.sportColor} />
            </View>
          </View>
          <View style={styles.courtCenter}>
            <Text style={styles.courtName}>{court.name}</Text>
            <View style={styles.courtMeta}>
              <Ionicons name="navigate-outline" size={12} color={COLORS.textSecondary} />
              <Text style={styles.courtDistance}>{court.distance}</Text>
              <Ionicons name="star" size={12} color={COLORS.warning} />
              <Text style={styles.courtRating}>{court.rating}</Text>
            </View>
          </View>
          <View style={styles.courtRight}>
            <Text style={[styles.courtPrice, court.price === 'Gratis' && { color: COLORS.success }]}>{court.price}</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
          </View>
        </TouchableOpacity>
      ))}
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
  filterButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.bgCardLight,
    justifyContent: 'center',
    alignItems: 'center',
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
  courtCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgCard,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 14,
    padding: 14,
  },
  courtLeft: {
    marginRight: 12,
  },
  sportIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courtCenter: {
    flex: 1,
  },
  courtName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  courtMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  courtDistance: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginRight: 8,
  },
  courtRating: {
    fontSize: 12,
    color: COLORS.warning,
    fontWeight: '600',
  },
  courtRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  courtPrice: {
    fontSize: 13,
    color: COLORS.primaryLight,
    fontWeight: '600',
  },
});
