import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from './AuthProvider';
import { supabase } from '../../lib/supabase';

export default function ImagePickerExample() {
  const { avatar_url, userId } = useAuth();
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (!avatar_url) {
      setImage('https://opwyvlqnfsnbehdilttq.supabase.co/storage/v1/object/sign/avatars/UploadImage/Default_Profile.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL1VwbG9hZEltYWdlL0RlZmF1bHRfUHJvZmlsZS5qcGciLCJpYXQiOjE3MjI5NjI4MzIsImV4cCI6MTc1NDQ5ODgzMn0.juFRlGC4ZnEOOG5sicrCm6Zs6PO3PAELFtN3o3iskZ8&t=2024-08-06T16%3A47%3A12.757Z');
    } else {
      setImage(avatar_url);
    }
  }, [avatar_url]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].base64;
      const uploadedUrl = await uploadImageToSupabase(selectedImageUri);
      setImage(uploadedUrl);
    }
  };

  const uploadImageToSupabase = async (imageUri: string) => {
    try {
      // 이미지 데이터를 base64로 가져옵니다.
      const binaryString = atob(imageUri);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const fileName = `${userId}-${new Date().toISOString()}.jpg`;
      console.log('Uploading file with name:', fileName);

      // 'avatars' 버킷에 파일을 업로드합니다.
      const { data: uploadFile, error } = await supabase.storage.from('avatars').upload(fileName, bytes.buffer, {
        cacheControl: '3600',
        upsert: false
      });

      if (error) {
        console.error('Error uploading image:', error.message);
        console.error('Error details:', error);
        return imageUri; // 오류가 발생하면 원래 이미지를 반환합니다.
      }

      console.log('Upload data:', uploadFile);

      console.log('Upload data:', uploadFile);

      // 업로드된 파일의 공개 URL 가져오기
      const { data: getUrlObject } = supabase.storage.from('avatars').getPublicUrl(`${uploadFile!.path}`);

      const getUrl = getUrlObject.publicUrl

      console.log('Public URL:', getUrl);

      if (!getUrl) {
        throw new Error('Error getting public URL');
      }

      // 사용자의 아바타 URL을 업데이트합니다.
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: getUrl })
        .eq('id', userId);

      if (updateError) {
        console.error('Error updating avatar URL:', updateError.message);
      }

      return getUrl;
    } catch (error) {
      console.error('Error uploading image:', error.message);
      return imageUri;
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={pickImage}>
        <Image source={{ uri: image }} style={styles.image} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
});