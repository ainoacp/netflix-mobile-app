import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import tw from 'twrnc';
import Logo from '../static/images/netflix-logo.svg';
import { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';

const SignIn = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        debounce(emailValidation());
        console.log('EMAIL: ', email, isValidEmail);
    }, [email])

    useEffect(() => {
        debounce(passwordValidation());
        console.log('PASSWORD', password, isValidPassword);
    }, [password])

    const emailValidation = () => {
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!email || emailRegex.test(email) === false) {
            setIsValidEmail(false);
            return false;
        }
        setIsValidEmail(true);
        return true;
    }

    const passwordValidation = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
        if (!password || passwordRegex.test(password) === false) {
            setIsValidPassword(false);
            return false;
        }
        setIsValidPassword(true);
        return true;
    }

    const debounce = fn => {
        let id = null;
        return (...args) => {
            if (id) {
                clearTimeout(id);
            }
            id = setTimeout(() => {
                fn(...args);
                id = null;
            }, 300);
        };
    };

    return (
        <SafeAreaView style={tw`bg-black flex-1`}>
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={tw`flex-1`}
                >
                    <View style={tw`py-6 px-8 flex items-center justify-center`}>
                        <Logo width={90} />
                    </View>
                    <View style={tw`flex-1 items-center justify-center px-12`}>
                        <Text style={tw`text-white text-2xl mb-12 self-start`}>Iniciar Sesión</Text>
                        <TextInput
                            style={tw`h-12 px-4 font-medium bg-white/20 rounded w-full text-white mb-2 ${(!isValidEmail && email !== '') && 'border border-red-500'}`}
                            placeholder={'Email'}
                            placeholderTextColor={tw.color('text-white/20')}
                            value={email}
                            onChange={(textInput) => {
                                setEmail(textInput)
                            }}
                            autoCorrect={false}
                            autoComplete='off'
                            autoCapitalize={'none'}
                            keyboardType={'email-address'}
                        />
                        <Text style={tw`text-red-500 hidden self-start mb-6 ${(isValidEmail || email === '') && 'opacity-0'}`}>Email incorrecto</Text>
                        <View style={tw`relative flex flex-row`}>
                            <Pressable
                                style={tw`absolute top-3 right-3 z-10 `}
                                onPress={() => {
                                    setIsPasswordVisible(!isPasswordVisible)
                                }}>
                                {!isPasswordVisible ? (
                                    <EyeSlashIcon style={tw`w-6 h-6 text-white/40`} />
                                ) : (
                                    <EyeIcon style={tw`w-6 h-6 text-white/40`} />
                                )}
                            </Pressable>
                            <TextInput
                                style={tw`h-12 px-4 font-medium bg-white/20 rounded w-full text-white mb-2 ${(!isValidPassword && password !== '') && 'border border-red-500'}`}
                                placeholderTextColor={tw.color('text-white/20')}
                                placeholder={'Contraseña'}
                                value={password}
                                onChangeText={(passwordInput) => {
                                    setPassword(passwordInput)
                                }}
                                secureTextEntry={!isPasswordVisible}
                            />
                        </View>
                        <Text style={tw`text-red-500 self-start mb-6 ${(isValidPassword || password === '') && 'opacity-0'}`}>Debe contener A-b-0-!</Text>
                        <Pressable onPress={() => navigation.navigate('PwRecovery')} style={tw`mb-16 self-end`}>
                            <Text style={tw`text-white`}>¿Olvidaste tu contraseña?</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('Users')} style={tw`mb-12`}>
                            <Text style={tw`text-white/40 text-xl`}>Iniciar sesión</Text>
                        </Pressable>
                        <View style={tw`flex flex-row items-center`}>
                            <Text style={tw`text-white`}>¿No tienes una cuenta? </Text>
                            <Pressable onPress={() => navigation.navigate('SignUp')}>
                                <Text style={tw`text-red-500 font-bold`}>Registrate</Text>
                            </Pressable>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default SignIn;
