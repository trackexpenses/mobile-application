import * as SecureStore from 'expo-secure-store';

export enum AuthTokens {
    ACCESS_TOKEN = 'accessToken',
    REFRESH_TOKEN = 'refreshToken'
}

export async function saveUserTokens(device: any) {
    await addTokenToSecureStore(AuthTokens.ACCESS_TOKEN, device.accessToken)
    await addTokenToSecureStore(AuthTokens.REFRESH_TOKEN, device.refreshToken)
}

export async function addTokenToSecureStore(key: AuthTokens, data: any) {
    await SecureStore.setItemAsync(key, data);

}
export async function getTokenFromSecureStore(key: AuthTokens) {
    await SecureStore.getItemAsync(key);

}