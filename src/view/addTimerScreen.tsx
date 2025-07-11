import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TimerController } from '../controller/timerController';

export const AddTimerScreen = () => {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState('');
    const [halfwayAlert, setHalfwayAlert] = useState(false);
    const navigation = useNavigation();

    const handleAdd = async () => {
        if (!name || !duration || !category) {
            Alert.alert('All fields are required');
            return;
        }

        const durationNum = parseInt(duration);
        if (isNaN(durationNum) || durationNum <= 0) {
            Alert.alert('Duration must be a positive number');
            return;
        }

        const newTimer = {
            id: Date.now().toString(),
            name,
            duration: durationNum,
            remaining: durationNum,
            category,
            halfwayAlert,
            status: 'Paused',
            completedAt: null
        };

        const existingTimers = await TimerController.loadTimers();
        const updatedTimers = [...existingTimers, newTimer];
        await TimerController.saveTimers(updatedTimers);

        Alert.alert('Timer added!');
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create New Timer</Text>

            <TextInput
                placeholder="Timer Name"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Duration (seconds)"
                style={styles.input}
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Category (e.g., Study, Workout)"
                style={styles.input}
                value={category}
                onChangeText={setCategory}
            />

            <View style={styles.checkboxRow}>
                <Button
                    title={halfwayAlert ? '✔ Halfway Alert Enabled' : 'Enable Halfway Alert'}
                    onPress={() => setHalfwayAlert(!halfwayAlert)}
                    color={halfwayAlert ? 'green' : 'gray'}
                />
            </View>

            <Button title="Save Timer" onPress={handleAdd} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: {
        borderWidth: 1, borderColor: '#ccc', padding: 10,
        borderRadius: 8, marginBottom: 10,
    },
    checkboxRow: { marginVertical: 10 },
});
