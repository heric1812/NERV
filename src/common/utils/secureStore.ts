import * as SecureStore from "expo-secure-store";

export const saveSession = async (token: string) => {
  await SecureStore.setItemAsync("magi_session", token);
};

export const getSession = async () => {
  return await SecureStore.getItemAsync("magi_session");
};

export const clearSession = async () => {
  await SecureStore.deleteItemAsync("magi_session");
};
