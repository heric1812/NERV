import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import Navigation from "./navigation/Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "./theme";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Navigation />

        <StatusBar style="auto" />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
