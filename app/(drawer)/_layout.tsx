import React from 'react';
import { Drawer } from 'expo-router/drawer';

export default function TabLayout() {
    return (
        <Drawer screenOptions={{ headerShown: false }}>
            <Drawer.Screen name={'(tabs)'} />
        </Drawer>
    );
}
