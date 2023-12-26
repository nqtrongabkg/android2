import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

const fetchProductDetails = async (productId) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
  }
};

export default function CartScreen() {
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getCartData();
  }, []);

  const getCartData = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/carts/user/2');
      const cartItems = response.data[0]?.products || []; // Assuming we take the first cart for simplicity
      const detailedCartItems = await Promise.all(
        cartItems.map(async (item) => {
          const productDetails = await fetchProductDetails(item.productId);
          return { ...item, ...productDetails };
        })
      );
      setCartData(detailedCartItems);
      calculateTotal(detailedCartItems);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    setTotal(total);
  };

  const updateQuantity = (productId, increment = true) => {
    const updatedCartData = cartData.map((item) => {
      if (item.id === productId) {
        const updatedQuantity = increment ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: updatedQuantity >= 0 ? updatedQuantity : 0 };
      }
      return item;
    });
    setCartData(updatedCartData);
    calculateTotal(updatedCartData);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => updateQuantity(item.id, false)} style={styles.quantityButton}>
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => updateQuantity(item.id, true)} style={styles.quantityButton}>
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartData}
        keyExtractor={(item) => item?.id?.toString() || String(index)}
        renderItem={renderItem}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.subTotalText}>Sub Total</Text>
        <Text style={styles.totalText}>TOTAL: ${total.toFixed(2)}</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  itemTitle: {
    flex: 1,
  },
  itemPrice: {
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    marginHorizontal: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 18,
  },
  quantity: {
    fontSize: 18,
  },
  totalContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  subTotalText: {
    textAlign: 'right',
    fontSize: 18,
    paddingVertical: 5,
  },
  totalText: {
    textAlign: 'right',
    fontSize: 22,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
});
