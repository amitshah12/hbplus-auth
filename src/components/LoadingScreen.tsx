
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2563EB" />
      <Text style={styles.text}>Checking your access...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    gap: 14,
  },
  text: {
    color: '#475569',
    fontSize: 14,
  },
});
