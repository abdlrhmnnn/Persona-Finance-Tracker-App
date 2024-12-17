import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Welcome to the Personal Finance Tracker App!
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Add New Transaction"
          onPress={() => router.push("/screens/transactionForm")}
        />
        <Button
          title="Transactions"
          onPress={() => router.push("/screens/transactionList")}
        />
        <Button
          title="Summary"
          onPress={() => router.push("/screens/summary")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
  },
});
