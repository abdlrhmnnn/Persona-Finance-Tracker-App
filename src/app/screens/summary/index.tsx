import React, { useCallback, useEffect, useState, useMemo } from "react";
import { View, Text, Button } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRandomColor } from "@/src/utilis/helper";
import { styles } from "./styles";

export default function SummaryScreen() {
  const navigation = useNavigation<any>();
  const [transactions, setTransactions] = useState<any[]>([]);

  const loadTransactions = useCallback(async () => {
    try {
      const existingTransactions = await AsyncStorage.getItem("transactions");
      if (existingTransactions) {
        const parsedTransactions = JSON.parse(existingTransactions);
        setTransactions(parsedTransactions);
      }
    } catch (error) {
      console.error("Error loading transactions:", error);
    }
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const { totalIncome, totalExpenses, categoryData } = useMemo(() => {
    const now = new Date();
    const currentMonthTransactions = transactions.filter(
      (t) =>
        new Date(t.date).getMonth() === now.getMonth() &&
        new Date(t.date).getFullYear() === now.getFullYear()
    );
    const totalIncome = currentMonthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const totalExpenses = currentMonthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const categoryData = currentMonthTransactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        if (!acc[t.category]) {
          acc[t.category] = 0;
        }
        acc[t.category] += parseFloat(t.amount);
        return acc;
      }, {} as Record<string, number>);

    console.log("Category Data:", categoryData);

    const chartData = Object.entries(categoryData).map(
      ([name, population]) => ({
        name,
        population,
        color: getRandomColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      })
    );

    console.log("Chart Data for Pie Chart:", chartData);

    return {
      totalIncome,
      totalExpenses,
      categoryData: chartData,
    };
  }, [transactions]);

  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#ff6600",
    backgroundGradientTo: "#ffcc00",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Summary of Transactions</Text>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Total Income: ${totalIncome.toFixed(2)}
        </Text>
        <Text style={styles.summaryText}>
          Total Expenses: ${totalExpenses.toFixed(2)}
        </Text>
      </View>

      <PieChart
        data={categoryData}
        width={300}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />

      <Button
        title="Back to Home"
        onPress={() => navigation.replace("index")}
      />
    </View>
  );
}
