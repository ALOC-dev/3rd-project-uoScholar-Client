import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

type Item = {
    id: string;
    name: string;
};

const DATA: Item[] = [
    { id: '1', name: 'Example Chat 1' },
    { id: '2', name: 'Example Chat 2' },
    { id: '3', name: 'Example Chat 3' },
    { id: '4', name: 'Example Chat 4' },
    { id: '5', name: 'Example Chat 5' },
    { id: '6', name: 'Example Chat 6' },
    { id: '7', name: 'Example Chat 7' },
];

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState<Item[]>(DATA);

    const handleSearch = (text: string) => {
        setQuery(text);
        const newData = DATA.filter(item =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(newData);
    };

    const renderItem = ({ item }: { item: Item }) => (
        <TouchableOpacity style={styles.item}>
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search"
                    value={query}
                    onChangeText={handleSearch}
                    style={styles.input}
                />
            </View>
            <FlatList
                data={filteredData}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginBottom: 12,
        backgroundColor: '#f9f9f9',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        height: 40,
    },
    item: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});

export default SearchBar;