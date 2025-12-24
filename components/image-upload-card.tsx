import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type ImageUploadCardProps = {
  title?: string;
  selectedLabel?: string;
  selectedImage?: string | null;
  onPickImage: () => void;
  onTakePhoto: () => void;
  onClearImage?: () => void;
};

export function ImageUploadCard({
  title = 'Upload your image',
  selectedLabel = 'Image selected',
  selectedImage,
  onPickImage,
  onTakePhoto,
  onClearImage,
}: ImageUploadCardProps) {
  return (
    <View style={styles.card}>
      <Pressable style={styles.uploadTapArea} onPress={onPickImage}>
        {selectedImage ? (
          <View style={styles.previewWrapper}>
            <Image source={{ uri: selectedImage }} style={styles.previewImage} />
            {onClearImage && (
              <Pressable
                style={styles.closeBadge}
                onPress={(e) => {
                  e.stopPropagation();
                  onClearImage();
                }}>
                <Ionicons name="close" size={14} color="#ffffff" />
              </Pressable>
            )}
          </View>
        ) : (
          <View style={styles.iconStack}>
            <View style={[styles.iconLayer, styles.iconLayerBack]} />
            <View style={[styles.iconLayer, styles.iconLayerMid]} />
            <View style={[styles.iconLayer, styles.iconLayerFront]}>
              <Ionicons name="camera-outline" size={24} color="#ffffff" />
              <View style={styles.plusBadge}>
                <Ionicons name="add" size={14} color="#ffffff" />
              </View>
            </View>
          </View>
        )}

        <Text style={styles.uploadTitle}>{selectedImage ? selectedLabel : title}</Text>
      </Pressable>

      <View style={styles.separatorRow}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>OR</Text>
        <View style={styles.separatorLine} />
      </View>

      <Pressable style={styles.takePhotoButton} onPress={onTakePhoto}>
        <Ionicons name="camera-outline" size={20} color="#ffffff" style={{ marginRight: 8 }} />
        <Text style={styles.takePhotoText}>Take a photo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#151322',
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 24, // slightly shorter than before
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 10,
    marginBottom: 20,
  },
  uploadTapArea: {
    alignItems: 'center',
    marginBottom: 20,
  },
  previewWrapper: {
    width: 170,
    height: 105,
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 18,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  closeBadge: {
    position: 'absolute',
    top: 0,
    right: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStack: {
    width: 80,
    height: 80,
    marginBottom: 18,
  },
  iconLayer: {
    position: 'absolute',
    borderRadius: 22,
    width: '100%',
    height: '100%',
  },
  iconLayerBack: {
    backgroundColor: '#1e1a35',
    top: 14,
  },
  iconLayerMid: {
    backgroundColor: '#231d3f',
    top: 7,
  },
  iconLayerFront: {
    backgroundColor: '#29214e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#7c3aed',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#151322',
  },
  uploadTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 12,
  },
  separatorLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#2d2940',
  },
  separatorText: {
    marginHorizontal: 12,
    color: '#6b647f',
    fontSize: 12,
    fontWeight: '600',
  },
  takePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#211d33',
    borderRadius: 18,
    paddingVertical: 12,
  },
  takePhotoText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});


