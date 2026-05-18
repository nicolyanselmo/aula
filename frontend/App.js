import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import StudentHome from './src/screens/StudentHome';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <StudentHome />
    </SafeAreaView>
  );
}
