import React, { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


type SearchBarComponentProps = {};

const SwitchComponent: React.FunctionComponent<SearchBarComponentProps> = () => {
    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
        setSearch(search);
    };

    return (
        <View style={styles.view}>
            <SearchBar
                platform="ios"
                inputContainerStyle={{ height: 10, backgroundColor: '#F0F0F0'}}
                onChangeText={newVal => setSearch(newVal)}
                placeholder="검색"
                placeholderTextColor="#888"
                cancelButtonTitle="취소"
                value={search}
                searchIcon={<Octicons name="search" size={15} color="gray" />}
                clearIcon={<MaterialIcons name="cancel" size={20} color="gray" onPress={() => setSearch('')} />}
            />
            <Text style={styles.title}>메시지</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        margin: 10,
    },
    title: {
        padding: 10,
        paddingVertical: 30,
        fontWeight: 'bold',
        fontSize: 18,
    }
});

export default SwitchComponent;