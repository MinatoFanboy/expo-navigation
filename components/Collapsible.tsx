import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from 'nativewind';

import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
    const { colorScheme } = useColorScheme();

    const [isOpen, setIsOpen] = useState(false);
    const theme = colorScheme ?? 'light';

    return (
        <ThemedView>
            <TouchableOpacity style={styles.heading} onPress={() => setIsOpen((value) => !value)} activeOpacity={0.8}>
                <Ionicons
                    name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
                    size={18}
                    color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
                />
                <ThemedText type={'defaultSemiBold'}>{title}</ThemedText>
            </TouchableOpacity>
            {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    heading: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 6,
    },
    content: {
        marginLeft: 24,
        marginTop: 6,
    },
});
