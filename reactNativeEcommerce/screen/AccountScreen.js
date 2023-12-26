
import { StyleSheet, View, Text } from 'react-native';

export default function AccountScreen() {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.fontSizeText]}>Account Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign:'center',
    justifyContent: 'center',
    backgroundColor: "#66c4e8",
  },
  fontSizeText: {
    fontSize: 15
  }
});
