import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function ProductDetail({ route, navigation }) {
    const { itemId } = route.params;
    console.log(itemId);
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${itemId}`);
                setProduct(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [itemId]);

    if (isLoading) {
        return <Text>Loading product...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.displayProduct}>
                    <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" ></Image>
                    <View style={styles.displayBtn}>
                        <Text style={styles.text}>{product.title}</Text>
                        <TouchableOpacity
                            style={styles.btnMua}
                            onPress={() => { }}
                        >
                            <Text style={styles.btnText}>Thêm vào giỏ</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            style={styles.btnMove}
                            onPress={() => navigation.navigate('Home')}
                        >
                            <Text style={styles.btnText}>Về trang chủ</Text>
                        </TouchableOpacity> */}
                    </View>

                </View>
                <Text style={styles.txtDetail}>
                    {product.description}
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        display: 'flex',
    },
    displayProduct: {
        flex: 1,
        display: 'flex',
        flexDirection: "row",
        marginHorizontal: 20,
    },
    image: {
        width: 250,
        height: 250,
        aspectRatio: 1,
        flex: 1
    },
    displayBtn: {
        flex: 1.5
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    btnMua: {
        // Add backgroundColor, color, and other styles to match your design
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: 'blue', // Example background color
        marginTop: 10,
        // Add margin to the bottom to create space between the buttons
        marginBottom: 5,
    },
    btnMove: {
        // Add backgroundColor, color, and other styles to match your design
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: 'grey', // Example background color
        marginTop: 10, // Space from the 'Mua' button
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    txtDetail: {
        fontSize: 20,
        lineHeight: 24,
        marginHorizontal: 30,
        marginVertical: 20,
        fontFamily: 'System',
        textAlign: 'justify',
        color: '#333',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    }
});
