
import { StyleSheet, View, Text } from 'react-native';

export default function CartScreen() {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.fontSizeText]}>Cart Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign:'center',
    justifyContent: 'center',
    backgroundColor: "#16b2e8",
  },
  fontSizeText: {
    fontSize: 15
  }
});
