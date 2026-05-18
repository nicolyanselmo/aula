import React, { useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import ProductCard from '../components/ProductCard';

const initialProducts = [
  { id: '1', name: 'Esfirra Carne', price: 5.0, quantityAvailable: 20 },
  { id: '2', name: 'Esfirra Queijo', price: 6.0, quantityAvailable: 15 },
  { id: '3', name: 'Esfirra Pizza', price: 6.5, quantityAvailable: 10 },
];

export default function StudentHome() {
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState({});

  const addToCart = (productId) => {
    setCart((prev) => {
      const qty = prev[productId] ? prev[productId] + 1 : 1;
      return { ...prev, [productId]: qty };
    });
  };

  const sendOrder = () => {
    if (Object.keys(cart).length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione itens antes de enviar.');
      return;
    }

    const items = Object.entries(cart).map(([productId, qty]) => {
      const p = products.find((x) => x.id === productId);
      return { productId, name: p.name, qty, price: p.price };
    });

    const order = {
      userId: 'placeholder-student-id',
      items,
      total: items.reduce((s, i) => s + i.qty * i.price, 0),
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    // TODO: substituir por integração com Firebase Firestore
    console.log('Pedido enviado:', order);
    Alert.alert('Pedido enviado', 'Seu pedido foi enviado para o funcionário.');

    setCart({});
  };

  const cartCount = Object.values(cart).reduce((s, q) => s + q, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo de Esfirras</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard product={item} onAdd={() => addToCart(item.id)} />
        )}
      />

      <View style={styles.cartBar}>
        <Text style={styles.cartText}>Itens no carrinho: {cartCount}</Text>
        <Button title="Enviar pedido" onPress={sendOrder} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 8 },
  cartBar: {
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartText: { fontSize: 16 },
});
