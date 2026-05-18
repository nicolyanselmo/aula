import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductCard({ product, onAdd }) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.meta}>R$ {product.price.toFixed(2)} • Disponível: {product.quantityAvailable}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onAdd}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { fontSize: 16, fontWeight: '600' },
  meta: { marginTop: 4, color: '#666' },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});
