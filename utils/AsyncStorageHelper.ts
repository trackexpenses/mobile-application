import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveUser(user: any) {
    await AsyncStorage.setItem('user', JSON.stringify(user));
}

export async function getUserData() {
    const userJson = await AsyncStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;
    return user
}