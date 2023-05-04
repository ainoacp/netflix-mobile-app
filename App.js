/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import tw from 'twrnc';

import { useState } from 'react';

import Landing from './screens/landing';
import SignUp from './screens/signup';
import SignIn from './screens/signin';
import PwRecovery from './screens/pwRecovery';
import Users from './screens/users';
import Home from './screens/home';
import TopRated from './screens/topRated';
import Discover from './screens/discover';

import { HomeIcon, StarIcon, RocketLaunchIcon } from 'react-native-heroicons/outline';
import { HomeIcon as HomeIconSolid, StarIcon as StarIconSolid, RocketLaunchIcon as RocketLaunchIconSolid} from 'react-native-heroicons/solid' 

import { supabase } from './libs/supabase';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// Root Stack envuelve toda la app
const RootStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Landing'>
      <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="PwRecovery" component={PwRecovery} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

const HomeTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: tw.color('stone-800'),
          borderTopWidth: 0,
        },
        tabBarIcon: ({ focused }) => {
          if (route.name === 'Home') {
            return focused ? (
              <HomeIconSolid color={tw.color('white')} size={20} />
            ) : (
              <HomeIcon color={tw.color('gray-500')} size={20} />
            );
          } else if (route.name === 'TopRated') {
            return focused ? (
              <StarIconSolid color={tw.color('white')} size={20} />
            ) : (
              <StarIcon color={tw.color('gray-500')} size={20} />
            );
          } else if (route.name === 'Discover') {
            return focused ? (
              <RocketLaunchIconSolid color={tw.color('white')} size={20} />
            ) : (
              <RocketLaunchIcon color={tw.color('gray-500')} size={20} />
            );
          }
        },
        tabBarLabelStyle: {
          marginTop: -10,
          marginBottom: 7,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen name={'Home'} component={Home} options={{headerShown: false}}/>
      <Tabs.Screen name={'TopRated'} component={TopRated} options={{headerShown: false}}/>
      <Tabs.Screen name={'Discover'} component={Discover} options={{headerShown: false}}/>
    </Tabs.Navigator>
  )
}


function App() {
  const [user, setUser] = useState(true);
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {!user ? (
            <RootStack.Screen
              name='Auth'
              component={AuthNavigator}
              options={{
                headerShown: false
              }}
            />
          ) : (
            <RootStack.Screen
              name='HomeTabs'
              component={HomeTabs}
              options={{
                headerShown: false
              }}
            />
          )
        }
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
