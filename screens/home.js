import {
    View,
    Text,
    TextInput,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Image,
    ScrollView,
    ImageBackground
} from 'react-native';
import { ChevronDownIcon, MagnifyingGlassIcon, TvIcon } from 'react-native-heroicons/outline';
import { PlayIcon, PlusIcon, UserIcon } from 'react-native-heroicons/solid';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from "react";

import requests from "../services/requests";

import N from '../static/images/n-logo.svg';
import tw from 'twrnc';
import ImageColors from 'react-native-image-colors';

import LinearGradient from 'react-native-linear-gradient';

const Home = () => {

    const apiKey = process.env.API_KEY;
    const baseUrl = process.env.BASE_URL;
    const imgAssets = process.env.IMG_ASSETS;

    const [heroMovie, setHeroMovie] = useState()
    const [heroMovieColor, setHeroMovieColor] = useState()

    const [genres, setGenres] = useState()

    const [trendingMovies, setTrendingMovies] = useState()
    const [trendingTv, setTrendingTv] = useState()

    useEffect(() => {
        fetch(`${requests.fetchTopRated}`)
            .then(res => res.json())
            .then((data) => {
                console.log('MAIN MOVIE', data.results[2])
                setHeroMovie(data.results[2])
            })
    }, [])

    const getImageColors = async (uri) => {
        const result = await ImageColors.getColors(
            uri,
            {
                fallback: '#228B22',
                cache: true,
                key: 'unique_key',
            }
        );
        set
        console.log('IMG: ', heroImage)
    }

    useEffect(() => {
        if (heroMovie) {
            getImageColors();
        }
    }, [heroMovie]);

    
    useEffect(() => {
        fetch(`${baseUrl}/movie/${heroMovie?.id}?api_key=${apiKey}`)
            .then(res => res.json())
            .then((data) => {
                console.log('GENRES', data.genres);  
                setGenres(data.genres)
        })
    }, [])

    useEffect(() => {
        fetch(`${requests.fetchTrendingMovies}`)
            .then(res => res.json())
            .then((data) => {
                console.log('TRENDING MOVIES', data.results)
                setTrendingMovies(data.results)
        })
    }, [])

    useEffect(() => {
        fetch(`${requests.fetchTrendingTv}`)
            .then(res => res.json())
            .then((data) => {
                console.log('TRENDING TV', data.results)
                setTrendingTv(data.results)
        })
    }, [])


    return (
        <SafeAreaView style={tw`bg-black flex-1`}>
            <TouchableWithoutFeedback
                onPress={() => { Keyboard.dismiss() }}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={tw`flex-1`}
                >
                    <View>
                        <View style={tw`relative z-10 p-6 flex flex-row justify-between items-center gap-2 android: pt-4`}>
                            <Text style={tw`android: hidden text-2xl text-white font-bold`}>Para Profile.name</Text>
                            <View style={tw`ios:hidden flex-1 mt-1 mr-4`}>
                                <MagnifyingGlassIcon style={tw`absolute z-10 left-2 top-2 text-gray-400 h-8`} />
                                <TextInput
                                    style={tw`pr-4 pl-10 h-10 font-medium bg-white rounded w-full text-white`}
                                    autoCorrect={false}
                                    autoCapitalize={'none'}
                                    placeholder='Buscar'
                                    placeholderTextColor={tw.color('text-gray-400')}
                                />
                            </View>
                            <View style={tw`flex flex-row gap-4 items-center`}>
                                <TvIcon style={tw`text-white h-8`} />
                                <MagnifyingGlassIcon style={tw`android:hidden text-white h-8`} />
                                <Pressable style={tw`bg-yellow-500 h-7 w-7 rounded flex items-center justify-center`}><UserIcon style={tw`text-white h-3`} /></Pressable>
                            </View>
                        </View>
                        {heroMovieColor && <LinearGradient style={tw`absolute inset-0 z-0`} colors={[`${heroMovieColor.lightVibrant}`, tw.color('black')]}/>}   
                        <View style={tw`px-6 flex flex-row items-center gap-4 mb-4`}>
                            <Pressable style={tw`border border-white/70 rounded-full py-2 px-4`}><Text style={tw`text-white/70 text-base`}>Series</Text></Pressable>
                            <Pressable style={tw`border border-white/70 rounded-full py-2 px-4`}><Text style={tw`text-white/70 text-base`}>Películas</Text></Pressable>
                            <Pressable style={tw`border border-white/70 rounded-full py-2 px-4 flex flex-row gap-1`}><Text style={tw`text-white/70 text-base`}>Categorías</Text><ChevronDownIcon style={tw`text-white`} /></Pressable>
                        </View>
                    </View>
                    {/* <Text style={tw`text-white`}>{baseUrl}</Text>
                    <Text style={tw`text-white`}>{apiKey}</Text> */}
                    <ScrollView>
                        <ImageBackground 
                            style={tw`relative z-10 flex items-center justify-end bg-stone-500 rounded-2xl h-[550px] m-4 border border-white/30 overflow-hidden`}
                            source={{uri: `${imgAssets}${heroMovie?.backdrop_path}`}}
                            resizeMode='cover'
                        >
                            <View style={tw`absolute flex items-center  z-10 m-5`}>
                                <View style={tw`flex flex-row items-center m-1`}>
                                    <N height={20} />
                                    <Text style={tw`text-white/60 font-black text-xs tracking-[0.3rem]`}>SERIES</Text>
                                </View>
                                <Text style={tw`text-yellow-300 text-4xl uppercase text-center font-extrabold`}>{heroMovie?.title}</Text>
                                <View style={tw`flex flex-row justify-center mt-3 mb-2 gap-2`}>{
                                    genres?.map((genre) => {
                                        return (
                                            <Text key={genre.key} style={tw`text-white/80`}>{genre.name}</Text>
                                        )
                                    })
                                }</View>
                                <View style={tw`flex flex-row gap-4 m-3`}>
                                    <Pressable style={tw`bg-white px-4 py-2 rounded flex flex-row items-center justify-center gap-2 w-1/2`}><PlayIcon style={tw`text-black`} /><Text style={tw`text-black text-base font-bold`}>Reproducir</Text></Pressable>
                                    <Pressable style={tw`bg-white/40 px-4 py-2 rounded flex flex-row items-center justify-center gap-2 w-1/2`}><PlusIcon style={tw`text-white`} /><Text style={tw`text-white text-base font-bold`}>Mi lista</Text></Pressable>
                                </View>
                            </View>
                        </ImageBackground>
                        <View style={tw`p-2`}>
                            <Text style={tw`text-white text-2xl font-bold mb-3`}>Películas en tendencia</Text>
                            <View style={tw`flex flex-row gap-3`}>{
                                trendingMovies?.map((movie, i) => {
                                    return (
                                        <ImageBackground 
                                            style={tw`bg-white h-[150px] w-[115px] rounded`}
                                            source={{uri: `${imgAssets}${movie?.poster_path}`}}
                                            resizeMode='cover'
                                        />
                                    )
                                })
                            }
                            </View>
                        </View>
                        <View style={tw`p-2 mb-10`}>
                            <Text style={tw`text-white text-2xl font-bold mb-3`}>Series en tendencia</Text>
                            <View style={tw`flex flex-row gap-3`}>{
                                trendingTv?.map((serie, i) => {
                                    return (
                                        <ImageBackground 
                                            style={tw`bg-white h-[150px] w-[115px] rounded`}
                                            source={{uri: `${imgAssets}${serie?.poster_path}`}}
                                            resizeMode='cover'
                                        />
                                    )
                                })
                            }
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default Home