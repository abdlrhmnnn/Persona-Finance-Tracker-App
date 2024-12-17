import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { TextInput, Button, Menu, RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./styles";
import { categories, Transaction, ValidationErrors } from "@/src/utilis/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TransactionForm = () => {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = () => {
    const validationErrors: ValidationErrors = {};
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      validationErrors.amount = "Amount must be a positive number.";
    }
    if (!category) {
      validationErrors.category = "Category is required.";
    }
    if (!description) {
      validationErrors.description = "Description is required.";
    }
    return validationErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      const newTransaction: Transaction = {
        id: Math.random().toString(36),
        type,
        amount: amount.toString(),
        category,
        date,
        description,
      };

      try {
        // Retrieve existing transactions from AsyncStorage
        const existingTransactions = await AsyncStorage.getItem("transactions");
        const transactions = existingTransactions
          ? JSON.parse(existingTransactions)
          : [];

        // Add the new transaction and save back to AsyncStorage
        const updatedTransactions = [...transactions, newTransaction];
        await AsyncStorage.setItem(
          "transactions",
          JSON.stringify(updatedTransactions)
        );
        Alert.alert("Success", "Transaction added successfully!", [
          { text: "OK" },
        ]);

        setType("income");
        setAmount("");
        setCategory("");
        setDate(new Date());
        setDescription("");
      } catch (error) {
        console.error("Error saving transaction:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Type:</Text>
      <RadioButton.Group onValueChange={setType} value={type}>
        <View style={styles.row}>
          <RadioButton.Item label="Income" value="income" />
          <RadioButton.Item label="Expense" value="expense" />
        </View>
      </RadioButton.Group>

      <TextInput
        label="Amount"
        value={amount}
        keyboardType="numeric"
        onChangeText={setAmount}
        style={styles.input}
        error={!!errors.amount}
      />
      {errors.amount && <Text style={styles.error}>{errors.amount}</Text>}

      <View>
        <Text style={styles.label}>Category:</Text>
        <Menu
          visible={categoryMenuVisible}
          onDismiss={() => setCategoryMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setCategoryMenuVisible(true)}
            >
              {category || "Select Category"}
            </Button>
          }
        >
          {categories.map((cat) => (
            <Menu.Item
              key={cat}
              onPress={() => {
                setCategory(cat);
                setCategoryMenuVisible(false);
              }}
              title={cat}
            />
          ))}
        </Menu>
        {errors.category && <Text style={styles.error}>{errors.category}</Text>}
      </View>

      <View>
        <Text style={styles.label}>Date:</Text>
        <Button mode="outlined" onPress={() => setShowDatePicker(true)}>
          {date.toDateString()}
        </Button>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}
      </View>

      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        error={!!errors.description}
      />
      {errors.description && (
        <Text style={styles.error}>{errors.description}</Text>
      )}

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Add Transaction
      </Button>
    </View>
  );
};

export default TransactionForm;
