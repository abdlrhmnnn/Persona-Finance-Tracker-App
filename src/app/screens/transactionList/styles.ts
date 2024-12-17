import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  filterButton: {
    marginBottom: 16,
    backgroundColor: "#6200ea",
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  category: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
  },
  filterLabel: {
    fontSize: 16,
    color: "#fff",
    marginVertical: 8,
  },
  optionButton: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#6200ea",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});
