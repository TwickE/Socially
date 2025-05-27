import { colors } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.white,
  },
  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: colors.surface,
    backgroundColor: colors.background,
  },
   input: {
    flex: 1,
    color: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    maxHeight: 120,
    marginRight: 12,
    backgroundColor: colors.surface,
    borderRadius: 20,
    fontSize: 14,
  },
  hidden: {
    display: "none",
  }
});