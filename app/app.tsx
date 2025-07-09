import { View, Text, TouchableOpacity, Image } from 'react-native';

export default function App(){
    return (
        <View>
            <View>
                <Image source={require('../assets/images/cosmos.png')}></Image>
                <Text>Cosmos</Text>
            </View>
        </View>
    );
}