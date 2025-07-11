import AsyncStorage from '@react-native-async-storage/async-storage';

export const TimerController = {
    async loadTimers() {
        const data = await AsyncStorage.getItem('timers');
        console.log(data);
        return data ? JSON.parse(data) : [];
    },

    async saveTimers(timers: any) {
        await AsyncStorage.setItem('timers', JSON.stringify(timers));
    },

    async saveHistory(history: any) {
        await AsyncStorage.setItem('history', JSON.stringify(history));
    },

    async loadHistory() {
        const data = await AsyncStorage.getItem('history');
        console.log(data);
        return data ? JSON.parse(data) : [];
    }
};