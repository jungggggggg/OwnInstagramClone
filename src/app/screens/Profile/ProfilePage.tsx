import { SafeAreaView, Image, Text, StyleSheet, Pressable, View, ScrollView, AppState, useWindowDimensions } from 'react-native';
import { useAuth } from '../../../components/AuthProvider';
import ImagePickerExample from '../../../components/ImagePicker';
import { supabase } from '../../../../lib/supabase';
import { Link, useFocusEffect } from 'expo-router';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';




AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const FirstRoute = () => (
  <View style={{flex: 1, backgroundColor: 'white'}}></View>
);

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: 'white'}}></View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function ProfileScreen() {
  const { full_name, username, self_introduce, refreshUserData } = useAuth();

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  useFocusEffect(
    React.useCallback(() => {
      // 페이지가 포커스될 때마다 사용자 데이터를 새로고침
      refreshUserData(); // 새로운 데이터를 불러오는 함수
    }, [])
  );

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'black', width: '20%',marginLeft: '15%', }} 
      style={{ backgroundColor: 'white', height: 40, borderBottomWidth: 1, borderBottomColor: '#f5f5f5',}} 
      labelStyle={{ color: 'black' }} 
      activeColor='black'
      inactiveColor='gray'
      renderIcon={({ route, focused, color }) => {
        let iconName: 'grid' | 'clipboard-account';

        if (route.key === 'first') {
          iconName = 'grid';
        } else if (route.key === 'second') {
          iconName = 'clipboard-account';
        }
  
        return (
          <MaterialCommunityIcons 
            name={iconName}
            size={24} 
            color={focused ? 'black' : 'gray'}
          />
        );
      }}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'flex-start' }}>
      <View style={{flex: 1, alignItems: 'flex-start',}}>

        <ScrollView horizontal={false} style={{flex: 1, maxWidth: '100%',}} showsVerticalScrollIndicator={false}>

      <View style={{ padding: 15, alignItems: 'center', flexDirection: 'row', }}>
        <ImagePickerExample />

        <View style={styles.containInfo}>
          <Text>0</Text>
          <Text>게시물</Text>
        </View>

        <View style={styles.containInfo}>
          <Text>46</Text>
          <Text>팔로워</Text>
        </View>

        <View style={styles.containInfo}>
          <Text>58</Text>
          <Text>팔로우</Text>
        </View>

      </View >

      <Text style={styles.fullNameText}>{full_name}</Text>

      <View style={styles.usernameBox}>
        <Text>@ {username}</Text>
      </View>

      
      {self_introduce && <Text style={{paddingHorizontal: 15,}}>{self_introduce}</Text>}

      <View style={styles.profileButtonBox}> 

            <Link href='/screens/Profile/editProfile' style={styles.profileButton}>
            프로필 편집
            </Link>

        <Pressable style={styles.profileButton} onPress={() => console.log('you click')}>
            <Text>프로필 공유</Text>
        </Pressable>
      </View>

      <TabView 
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width}}
      renderTabBar={renderTabBar}
      />

      </ScrollView>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullNameText: {
    fontWeight: '600',
    paddingHorizontal: 15,
  },
  containInfo: {
    padding: 28,
    flexDirection: 'column',
    alignItems: 'center',
  },
  usernameBox: {
    borderRadius: 20,
    backgroundColor: '#f4f4f4',
    padding: 6,
    margin: 10,
    alignSelf: 'flex-start'
  },
  profileButtonBox: {
    flexDirection: 'row', 
    padding: 10,
  },
  profileButton: {
    borderRadius: 5,
    backgroundColor: '#f4f4f4',
    paddingVertical: 5,
    paddingHorizontal: 57,
    margin: 3,
  }
})