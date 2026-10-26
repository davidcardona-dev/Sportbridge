import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { supabase } from '../lib/supabase';

const SPORTS = [
  { id: 'Fútbol', name: 'Fútbol', icon: 'soccer' as const, color: COLORS.football },
  { id: 'Basketball', name: 'Basket', icon: 'basketball' as const, color: COLORS.basketball },
  { id: 'Volleyball', name: 'Volley', icon: 'volleyball' as const, color: COLORS.volleyball },
  { id: 'Tennis', name: 'Tennis', icon: 'tennis' as const, color: COLORS.tennis },
  { id: 'Running', name: 'Running', icon: 'run-fast' as const, color: COLORS.running },
];

const LEVELS = ['Principiante', 'Intermedio', 'Avanzado', 'Todos'];

export default function CreateMatchScreen() {
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleCreate() {
    if (!selectedSport || !title || !location || !maxPlayers || !selectedLevel) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los campos para crear el partido.');
      return;
    }

    setSaving(true);
    setSuccess(false);

    const matchDate = new Date();
    matchDate.setDate(matchDate.getDate() + 2);

    const { error } = await supabase.from('matches').insert({
      sport: selectedSport,
      title: title,
      location: location,
      match_date: matchDate.toISOString(),
      max_players: parseInt(maxPlayers),
      current_players: 1,
      level: selectedLevel,
      status: 'open',
      creator_id: '92e067e9-f856-4652-8a18-5b33377e305e',
    });

    setSaving(false);

    if (error) {
      Alert.alert('Error', 'No se pudo crear el partido. Intenta de nuevo.');
      console.log('Error:', error.message);
    } else {
      setSuccess(true);
      setTitle('');
      setLocation('');
      setMaxPlayers('');
      setSelectedSport('');
      setSelectedLevel('');
      setTimeout(() => setSuccess(false), 4000);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crear Partido</Text>
        <Text style={styles.subtitle}>Organiza un partido y encuentra jugadores</Text>
      </View>

      {/* Success Message */}
      {success && (
        <View style={styles.successBanner}>
          <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
          <Text style={styles.successText}>¡Partido creado exitosamente! Ya aparece en Inicio.</Text>
        </View>
      )}

      {/* Sport Selection */}
      <Text style={styles.label}>Deporte</Text>
      <View style={styles.sportsGrid}>
        {SPORTS.map((sport) => (
          <TouchableOpacity
            key={sport.id}
            style={[
              styles.sportCard,
              selectedSport === sport.id && { borderColor: sport.color, borderWidth: 2 },
            ]}
            onPress={() => setSelectedSport(sport.id)}
          >
            <View style={[styles.sportIconBox, { backgroundColor: sport.color + '20' }]}>
              <MaterialCommunityIcons name={sport.icon} size={24} color={sport.color} />
            </View>
            <Text style={[styles.sportName, selectedSport === sport.id && { color: sport.color }]}>{sport.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Title */}
      <Text style={styles.label}>Título del partido</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="text-outline" size={18} color={COLORS.textSecondary} />
        <TextInput
          style={styles.input}
          placeholder="Ej: Fútbol 5 en El Poblado"
          placeholderTextColor={COLORS.textMuted}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      {/* Location */}
      <Text style={styles.label}>Ubicación / Cancha</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={18} color={COLORS.textSecondary} />
        <TextInput
          style={styles.input}
          placeholder="Ej: Cancha La 10, Medellín"
          placeholderTextColor={COLORS.textMuted}
          value={location}
          onChangeText={setLocation}
        />
      </View>

      {/* Max Players */}
      <Text style={styles.label}>Máximo de jugadores</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="people-outline" size={18} color={COLORS.textSecondary} />
        <TextInput
          style={styles.input}
          placeholder="Ej: 10"
          placeholderTextColor={COLORS.textMuted}
          keyboardType="numeric"
          value={maxPlayers}
          onChangeText={setMaxPlayers}
        />
      </View>

      {/* Level */}
      <Text style={styles.label}>Nivel</Text>
      <View style={styles.levelRow}>
        {LEVELS.map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.levelChip,
              selectedLevel === level && { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary },
            ]}
            onPress={() => setSelectedLevel(level)}
          >
            <Text style={[
              styles.levelChipText,
              selectedLevel === level && { color: COLORS.textPrimary },
            ]}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Create Button */}
      <TouchableOpacity
        style={[styles.createButton, saving && { opacity: 0.6 }]}
        onPress={handleCreate}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator size="small" color={COLORS.bgDark} />
        ) : (
          <Ionicons name="add-circle-outline" size={20} color={COLORS.bgDark} />
        )}
        <Text style={styles.createButtonText}>{saving ? 'Creando...' : 'Crear Partido'}</Text>
      </TouchableOpacity>

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
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success + '15',
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 12,
    gap: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.success + '30',
  },
  successText: {
    color: COLORS.success,
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    paddingHorizontal: 20,
    marginTop: 18,
    marginBottom: 10,
  },
  sportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
  },
  sportCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    width: '18%',
    borderWidth: 1.5,
    borderColor: COLORS.bgCardLight,
  },
  sportIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  sportName: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgInput,
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  levelRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  levelChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.bgCardLight,
    backgroundColor: COLORS.bgCard,
  },
  levelChipText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  createButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    marginTop: 30,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  createButtonText: {
    color: COLORS.bgDark,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
