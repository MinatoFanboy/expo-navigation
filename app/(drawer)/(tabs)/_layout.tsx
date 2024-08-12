import React from 'react';
import { Tabs } from 'expo-router';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            }}
        >
            <Tabs.Screen
                name={'index'}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                    ),
                    title: 'Home',
                }}
            />
            <Tabs.Screen
                name={'explore'}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
                    ),
                    title: 'Explore',
                }}
            />
        </Tabs>
    );
}
