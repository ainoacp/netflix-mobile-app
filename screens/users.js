import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    TouchableWithoutFeedback,
    Pressable, 
    Text,
    View
} from 'react-native';
import tw from 'twrnc';

const Users = ({ navigation }) => {
    return (
        <SafeAreaView style={tw`bg-black flex-1 items-center justify-center`}>
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={tw`flex-1`}
                >
                    <Text style={tw`text-white text-xl mt-6 font-bold self-center`}>¿Quién eres? Elige tu perfil</Text>
                    <View style={tw`flex-1 flex-wrap flex-row gap-6 justify-center inset-y-1/4 mx-3 `}>
                        <Pressable onPress={() => navigation.navigate('Home')} style={tw`flex items-center`}>
                            <View style={tw`bg-blue-500 w-28 h-28 rounded`}/>
                            <Text style={tw`text-white text-lg`}>Profile.name</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('Home')} style={tw`flex items-center`}>
                            <View style={tw`bg-pink-500 w-28 h-28 rounded`}/>
                            <Text style={tw`text-white text-lg`}>Profile.name</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('Home')} style={tw`flex items-center`}>
                            <View style={tw`bg-yellow-500 w-28 h-28 rounded`}/>
                            <Text style={tw`text-white text-lg`}>Profile.name</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('Home')} style={tw`flex items-center`}>
                            <View style={tw`bg-green-500 w-28 h-28 rounded`}/>
                            <Text style={tw`text-white text-lg`}>Profile.name</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('Home')} style={tw`flex items-center`}>
                            <View style={tw`bg-red-500 w-28 h-28 rounded`}/>
                            <Text style={tw`text-white text-lg`}>Profile.name</Text>
                        </Pressable>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default Users