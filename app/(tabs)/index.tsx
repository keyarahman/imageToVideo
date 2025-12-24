import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';

const MODES = [
  {
    id: 'transition',
    title: 'Transition',
    description: 'Upload two frames and describe the transition between them.',
    image: require('@/assets/images/react-logo.png'),
  },
  {
    id: 'text-to-video',
    title: 'Text to Video',
    description: 'Describe your imagined scene and watch it transform into an animated video.',
    image: require('@/assets/images/react-logo.png'),
  },
  {
    id: 'fusion',
    title: 'Fusion',
    description:
      'Upload or select 1–3 subjects/backgrounds and describe their interaction to create a video.',
    image: require('@/assets/images/react-logo.png'),
  },
];

export default function ModesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.timeText}>3:50</Text>
          <View style={styles.creditsPill}>
            <Text style={styles.creditsText}>50 credits</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Modes</Text>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {MODES.map((mode) => (
            <View key={mode.id} style={styles.cardWrapper}>
              <ImageBackground
                source={mode.image}
                style={styles.cardImage}
                imageStyle={styles.cardImageRadius}>
                <View style={styles.cardOverlay}>
                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>{mode.title}</Text>
                    <Text style={styles.cardDescription}>{mode.description}</Text>
                  </View>
                </View>
              </ImageBackground>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#040714',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 16,
  },
  timeText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  creditsPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  creditsText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  cardImage: {
    height: 220,
    width: '100%',
  },
  cardImageRadius: {
    borderRadius: 20,
  },
  cardOverlay: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-end',
  },
  cardTextContainer: {
    padding: 16,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  cardDescription: {
    color: '#f3f3f3',
    fontSize: 14,
  },
});
