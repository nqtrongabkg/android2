
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import img from './assets/logoConChimCanhCut.png'
export default function Header() {
    return (
        <View style={[styles.container]}>
            <Image source={img} style={{ width: 150, height: 150, aspectRatio: 1 }} resizeMode="contain" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.07,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: "#66b2e8",
    },
});