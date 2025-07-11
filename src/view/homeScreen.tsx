import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, SectionList, Modal } from 'react-native';
import { TimerController } from '../controller/timerController';
import { TimerItem } from './components/timerItem';
import { useFocusEffect } from '@react-navigation/native';

export const HomeScreen = () => {
    const [timers, setTimers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [completedTimer, setCompletedTimer] = useState(null);

    useFocusEffect(
        useCallback(() => {
            TimerController.loadTimers().then(setTimers);
        }, [])
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setTimers((prevTimers: any) => {
                return prevTimers.map((timer: any) => {
                    if (timer.status === 'Running' && timer.remaining > 0) {
                        const remaining = timer.remaining - 1;
                        if (remaining === 0) {
                            const updated = { ...timer, remaining: 0, status: 'Completed', completedAt: new Date().toLocaleString() };
                            handleCompletion(updated);
                            return updated;
                        }
                        return { ...timer, remaining };
                    }
                    return timer;
                });
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleCompletion = (completedTimer: any) => {
        TimerController.loadHistory().then((history) => {
            const Complete = {
                id: Date.now().toString(),
                name: completedTimer?.name,
                duration: completedTimer?.duration,
                remaining: completedTimer?.remanining,
                category: completedTimer?.category,
                halfwayAlert: completedTimer?.halfwayAlert,
                status: completedTimer?.status,
                completedAt: completedTimer?.completedAt
            };
            const newHistory = [...history, Complete];
            TimerController.saveHistory(newHistory);
        });
        setCompletedTimer(completedTimer);
        setModalVisible(true);
    };

    const updateAndSaveTimers = (updatedTimers: any) => {
        setTimers(updatedTimers);
        TimerController.saveTimers(updatedTimers);
    };

    const grouped = timers.reduce((acc: any, timer: any) => {
        const cat = timer.category;
        acc[cat] = acc[cat] ? [...acc[cat], timer] : [timer];
        return acc;
    }, {});

    const sections = Object.keys(grouped).map((cat) => ({ title: cat, data: grouped[cat] }));

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={{ backgroundColor: '#eee', padding: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
                        <Button title="Start All" onPress={() => {
                            const updated = timers.map((t: any) => t.category === title ? { ...t, status: 'Running' } : t);
                            updateAndSaveTimers(updated);
                        }} />
                        <Button title="Pause All" onPress={() => {
                            const updated = timers.map((t: any) => t.category === title ? { ...t, status: 'Paused' } : t);
                            updateAndSaveTimers(updated);
                        }} />
                        <Button title="Reset All" onPress={() => {
                            const updated = timers.map((t: any) => t.category === title ? { ...t, remaining: t.duration, status: 'Paused' } : t);
                            updateAndSaveTimers(updated);
                        }} />
                    </View>
                )}
                renderItem={({ item }) => (
                    <TimerItem
                        timer={item}
                        onStart={() => updateAndSaveTimers(timers.map((t: any) => t.id === item.id ? { ...t, status: 'Running' } : t))}
                        onPause={() => updateAndSaveTimers(timers.map((t: any) => t.id === item.id ? { ...t, status: 'Paused' } : t))}
                        onReset={() => updateAndSaveTimers(timers.map((t: any) => t.id === item.id ? { ...t, remaining: t.duration, status: 'Paused' } : t))}
                    />
                )}
            />
            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000088' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <Text>Timer "{completedTimer?.['name']}" Completed!</Text>
                        <Button title="Close" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};