import React, { useEffect, useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const systemTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === "dark");

  useEffect(() => {
    setIsDarkMode(systemTheme === "dark");
  }, [systemTheme]);

  const theme = isDarkMode ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: true }}>
        {" "}
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Home" }}
        />
        <Stack.Screen
          name="screens/transactionForm/index"
          options={{ headerTitle: "Add New Transaction" }}
        />
        <Stack.Screen
          name="screens/transactionList/index"
          options={{ title: "Transactions" }}
        />
        <Stack.Screen
          name="screens/summary/index"
          options={{ title: "Summary" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
