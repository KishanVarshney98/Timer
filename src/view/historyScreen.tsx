import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { TimerController } from '../controller/timerController';
import { useFocusEffect } from '@react-navigation/native';

export const HistoryScreen = () => {
    const [history, setHistory] = useState([]);

    useFocusEffect(
        useCallback(() => {
            TimerController.loadHistory().then(setHistory);
        }, [])
    );

    return (
        <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Completed Timers</Text>
            <FlatList
                data={history}
                keyExtractor={(item: any) => item.id}
                renderItem={({ item }) => (
                    <View key={item?.id} style={{ marginVertical: 5 }}>
                        <Text>{item.name} - Completed at {item.completedAt}</Text>
                    </View>
                )}
            />
        </View>
    );
};