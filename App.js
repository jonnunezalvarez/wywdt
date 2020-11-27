import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TaskList from './src/components/TaskList'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>What You Wanna Do Today!</Text>
      <TaskList />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
