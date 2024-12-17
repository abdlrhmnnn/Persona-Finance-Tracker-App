import React, { useCallback, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Transaction } from "@/src/utilis/helper";
import { useFocusEffect } from "@react-navigation/native";
import { Card, Divider, Button } from "react-native-paper";
import { styles } from "./styles";

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [sortByDate, setSortByDate] = useState<"asc" | "desc" | null>(null);
  const [filterByType, setFilterByType] = useState<"income" | "expense" | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const loadTransactions = async () => {
        try {
          const existingTransactions = await AsyncStorage.getItem(
            "transactions"
          );
          if (existingTransactions) {
            const parsedTransactions = JSON.parse(existingTransactions);
            const transactionsWithDate = parsedTransactions.map(
              (transaction: Transaction) => ({
                ...transaction,
                date: transaction.date ? new Date(transaction.date) : null,
              })
            );
            setTransactions(transactionsWithDate);
            setFilteredTransactions(transactionsWithDate);
          } else {
            setTransactions([]);
            setFilteredTransactions([]);
          }
        } catch (error) {
          console.error("Error loading transactions:", error);
        }
      };
      loadTransactions();
    }, [])
  );

  const applyFilters = () => {
    let updatedTransactions = [...transactions];

    if (sortByDate) {
      updatedTransactions.sort((a, b) =>
        sortByDate === "asc"
          ? new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime()
          : new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
      );
    }

    if (filterByType) {
      updatedTransactions = updatedTransactions.filter(
        (transaction) => transaction.type === filterByType
      );
    }

    setFilteredTransactions(updatedTransactions);
    setModalVisible(false);
  };

  const resetFilters = () => {
    setSortByDate(null);
    setFilterByType(null);
    setFilteredTransactions(transactions);
    setModalVisible(false);
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <Card style={styles.card}>
      <View style={styles.row}>
        <Text
          style={[
            styles.amount,
            { color: item.type === "income" ? "green" : "red" },
          ]}
        >
          {item.type === "income" ? "+" : "-"} ${item.amount}
        </Text>
        <Text style={styles.date}>
          {item.date ? item.date.toDateString() : "No Date"}
        </Text>
      </View>
      <Divider />
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction History</Text>
      <Button
        mode="contained"
        style={styles.filterButton}
        onPress={() => setModalVisible(true)}
      >
        Filter & Sort
      </Button>
      {filteredTransactions.length > 0 ? (
        <FlatList
          data={filteredTransactions}
          renderItem={renderTransaction}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No transactions available</Text>
        </View>
      )}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Sort & Filter</Text>
          <Divider />

          <Text style={styles.filterLabel}>Sort by Date</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                sortByDate === "asc" && styles.selectedOption,
              ]}
              onPress={() => setSortByDate("asc")}
            >
              <Text>Oldest to Newest</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                sortByDate === "desc" && styles.selectedOption,
              ]}
              onPress={() => setSortByDate("desc")}
            >
              <Text>Newest to Oldest</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.filterLabel}>Filter by Type</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                filterByType === "income" && styles.selectedOption,
              ]}
              onPress={() => setFilterByType("income")}
            >
              <Text>Income</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                filterByType === "expense" && styles.selectedOption,
              ]}
              onPress={() => setFilterByType("expense")}
            >
              <Text>Expense</Text>
            </TouchableOpacity>
          </View>

          <Divider />
          <View style={styles.modalActions}>
            <Button onPress={resetFilters}>Reset Filters</Button>
            <Button onPress={() => setModalVisible(false)}>Cancel</Button>
            <Button mode="contained" onPress={applyFilters}>
              Apply
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TransactionList;
