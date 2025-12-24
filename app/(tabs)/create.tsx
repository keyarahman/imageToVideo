import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { PrimaryButton } from '@/components/primary-button';
import { OptionSelector } from '@/components/option-selector';
import { ImageUploadCard } from '@/components/image-upload-card';
import { DescriptionBox } from '@/components/description-box';

export default function CreateScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [duration, setDuration] = useState<string>('3s');
  const [quality, setQuality] = useState<string>('720p');
  const [aspect, setAspect] = useState<string>('4:3');

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleGenerate = () => {
    // TODO: Trigger your generate video flow with:
    // selectedImage, duration, quality, aspect
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Photo to Video</Text>

        {/* Upload card */}
        <ImageUploadCard
          selectedImage={selectedImage}
          onPickImage={handlePickImage}
          onTakePhoto={handleTakePhoto}
          onClearImage={() => setSelectedImage(null)}
        />

        {/* Description card */}
        <DescriptionBox text="Describe the scene you want to see and choose the camera movements from the options below." />

        {/* Options + primary button (only after an image is selected) */}
        {selectedImage && (
          <>
            <View style={styles.optionsRow}>
              <OptionSelector
                shape="left"
                title="Duration"
                value={duration}
                options={['3s', '5s', '10s']}
                onChange={setDuration}
              />

              <OptionSelector
                shape="middle"
                title="Resolution"
                value={quality}
                options={['480p', '720p', '1080p']}
                onChange={setQuality}
              />

              <OptionSelector
                shape="right"
                title="Aspect Ratio"
                value={aspect}
                options={['Auto', '16:9', '9:16', '1:1', '4:3', '3:4', '21:9']}
                onChange={setAspect}
              />
            </View>

            <PrimaryButton style={styles.primaryButton} onPress={handleGenerate}>
              <View style={styles.primaryButtonInner}>
                <Ionicons
                  name="film-outline"
                  size={20}
                  color="#ffffff"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.primaryButtonText}>Make Video</Text>
                <View style={styles.creditsPill}>
                  <Text style={styles.creditsPillText}>14 CREDITS</Text>
                </View>
              </View>
            </PrimaryButton>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#050312',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    // Extra bottom padding so the "Make Video" button clears the custom tab bar
    paddingBottom: 160,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 24,
  },
  primaryButton: {
    marginTop: 24,
  },
  primaryButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  creditsPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#ffffff',
  },
  creditsPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#111',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});

