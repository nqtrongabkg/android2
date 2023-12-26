import React, { useEffect, useCallback, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

export default function Home({ navigation }) {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('categories');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Hàm lấy dữ liệu sản phẩm dựa trên danh mục được chọn hoặc tất cả sản phẩm
    const fetchData = async (category) => {
        setIsLoading(true);
        setError(null);
        try {
            let url = 'https://fakestoreapi.com/products';
            if (category !== 'categories') {
                url += `/category/${category}`;
            }
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Hàm lấy danh sách các danh mục
    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products/categories');
            setCategories(response.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchData(selectedCategory);
    }, []);

    useEffect(() => {
        fetchData(selectedCategory);
    }, [selectedCategory]);

    // if (isLoading) {
    //     return <Text>Loading...</Text>;
    // }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    // Hàm cắt tên sản phẩm tối đa 2 dòng và thêm dấu "..."
    const truncateName = (name, maxLines) => {
        const lines = name.split('\n');
        if (lines.length <= maxLines) {
            return name;
        }
        const truncatedName = lines.slice(0, maxLines).join('\n');
        return truncatedName + '...';
    };

    const renderGridItem = ({ item }) => (
        <TouchableOpacity style={styles.gridItemContainer} onPress={() => navigation.navigate('ProductDetail', { itemId: item.id })}>
            <View style={styles.gridItemImageContainer}>
                <Image source={{ uri: item.image }} style={styles.gridItemImage} resizeMode="contain" />
            </View>
            <Text style={styles.gridItemTitle}>{truncateName(item.title, 2)}</Text>
            <View style={styles.gridItemPriceContainer}>
                <TouchableOpacity style={styles.gridItemPrice} onPress={() => navigation.navigate('ProductDetail', { itemId: item.id })}>
                    <Text style={styles.gridItemPriceText}>{item.price}$</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesScrollView}
                contentContainerStyle={styles.categoriesScrollViewContent}
            >
                <TouchableOpacity
                    style={[styles.category, selectedCategory === 'all' && styles.selectedCategory]}
                    onPress={() => setSelectedCategory('categories')}
                >
                    <Text style={styles.categoryText}>All</Text>
                </TouchableOpacity>
                {categories.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.category, selectedCategory === category && styles.selectedCategory]}
                        onPress={() => setSelectedCategory(category)}
                    >
                        <Text style={styles.categoryText}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {isLoading && <Text>Loading...</Text>}
            <FlatList
                data={data}
                renderItem={renderGridItem}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    categoriesScrollView: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    categoriesScrollViewContent: {
        paddingHorizontal: 10, // Padding on the sides
        alignItems: 'center', // Align items in the center vertically
    },
    category: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#ddd',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedCategory: {
        backgroundColor: 'blue',
    },
    categoryText: {
        color: 'white',
        fontWeight: 'bold',
    },
    gridItemContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 5,
        elevation: 5,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 3,
    },
    gridItemImageContainer: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridItemImage: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    gridItemTitle: {
        margin: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        maxHeight: 40, // Chiều cao tối đa cho 2 dòng
        overflow: 'hidden',
    },
    gridItemPriceContainer: {
        alignItems: 'center',
    },
    gridItemPrice: {
        backgroundColor: 'blue',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    gridItemPriceText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    toggleButton: {
        backgroundColor: 'blue',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    toggleButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
