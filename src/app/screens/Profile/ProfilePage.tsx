import { SafeAreaView, Image, Text, StyleSheet, Pressable, View } from 'react-native';
import { useAuth } from '../../../components/AuthProvider';
import ImagePickerExample from '../../../components/ImagePicker';

export default function ProfileScreen() {

  const { full_name } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'flex-start'}}>
      <View>
      <ImagePickerExample />
      </View>
        <Text style={styles.fullNameText}>{full_name}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullNameText:{
    fontWeight: '600',
  }
})