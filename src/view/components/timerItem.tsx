import React from 'react';
import {
    View, Text, Button, StyleSheet,
    ProgressBarAndroid
} from 'react-native';
import { Timer } from '../../model/timerModel';

interface TimerProps {
    timer: Timer;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
}

export const TimerItem: React.FC<TimerProps> = ({ timer, onStart, onPause, onReset }) => {
    const progress = (timer.remaining / timer.duration);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{timer.name} ({timer.status})</Text>
            <ProgressBarAndroid styleAttr="Horizontal" progress={progress} indeterminate={false} />
            <Text>{timer.remaining}s remaining</Text>
            <View style={styles.controls}>
                <Button title="Start" onPress={onStart} disabled={timer.status === 'Running'} />
                <Button title="Pause" onPress={onPause} disabled={timer.status !== 'Running'} />
                <Button title="Reset" onPress={onReset} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { margin: 10, padding: 10, borderWidth: 1, borderRadius: 10 },
    title: { fontSize: 16, fontWeight: 'bold' },
    controls: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});