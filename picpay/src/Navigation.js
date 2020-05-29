import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, Ionicons } from '@expo/vector-icons';

import Home from './screens/Home';
import Pay from './screens/Pay';
import Wallet from './screens/Wallet';
import PayButton from './components/PayButton/index';

const { Navigator, Screen } = createBottomTabNavigator();
const icons = {
    Home: {
        lib: AntDesign,
        name: 'home',
    },

    Wallet: {
        lib: AntDesign,
        name: 'creditcard',
    },

    Notifications: {
        lib: Ionicons,
        name: 'ios-notifications-outline',
    },

    Settings: {
        lib: AntDesign,
        name: 'setting',
    },
};

export default function Navigation() {
    return (
        <Navigator 
            screenOptions={({ route, navigation }) => ({ 
                tabBarIcon: ({ color, size, focused }) => {
                    if (route.name == 'Pay') {
                        return <PayButton onPress={ () => navigation.navigate('Pay') } focused={ focused }/>
                    }

                    const { lib: Icon, name } = icons[route.name];

                    return <Icon name={ name } size={ size } color={ color } />
                },
            })}

            tabBarOptions={{
                style: {
                    backgroundColor: '#131418',
                    borderTopColor: 'rgba(255, 255, 255, 0.2)'
                },
                activeTintColor: '#fff',
                inactiveTintColor: '#92929c', 
            }}
        >
            <Screen name="Home" options={{ title: 'Início' }} component={ Home } />
            <Screen name="Wallet" options={{ title: 'Carteira' }} component={ Wallet } />
            <Screen name="Pay" options={{ title: '' }} component={ Pay } />
            <Screen name="Notifications" options={{ title: 'Notificações' }} component={ Pay } />
            <Screen name="Settings" options={{ title: 'Ajustes' }} component={ Pay } />
        </Navigator>
    );
}
