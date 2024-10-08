import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';

import { ThemedView } from '@/components/ThemedView';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
    headerBackgroundColor: { dark: string; light: string };
    headerImage: ReactElement;
}>;

export default function ParallaxScrollView({ children, headerBackgroundColor, headerImage }: Props) {
    const { colorScheme: systemColorScheme } = useColorScheme();

    const colorScheme = systemColorScheme ?? 'light';
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                    ),
                },
                {
                    scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
                },
            ],
        };
    });

    return (
        <ThemedView style={styles.container}>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                <Animated.View
                    style={[
                        styles.header,
                        { backgroundColor: headerBackgroundColor[colorScheme] },
                        headerAnimatedStyle,
                    ]}
                >
                    {headerImage}
                </Animated.View>
                <ThemedView style={styles.content}>{children}</ThemedView>
            </Animated.ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 250,
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        gap: 16,
        overflow: 'hidden',
        padding: 32,
    },
});
