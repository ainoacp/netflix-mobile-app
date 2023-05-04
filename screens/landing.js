import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    TouchableWithoutFeedback,
    Pressable
} from 'react-native';
import tw from 'twrnc';
import Logo from '../static/images/netflix-logo.svg';

const Landing = ({ navigation }) => {
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
                    <Pressable onPress={() => navigation.navigate('SignIn')} style={tw`inset-y-1/2`}>
                        <Logo />
                    </Pressable>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default Landing