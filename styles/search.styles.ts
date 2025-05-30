import { AppThemeColors } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const createStyles = (colors: AppThemeColors) => {
  return StyleSheet.create({
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
      color: colors.text,
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
      color: colors.text,
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
    },
    infoText: {
      color: colors.grey,
      paddingHorizontal: 16,
      paddingVertical: 8,
      fontSize: 16,
    },
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 8,
      gap: 8,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.surface,
    },
    containerText: {
      flexDirection: "column",
      gap: 2,
    },
    username: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "600",
    },
    fullname: {
      color: colors.grey,
      fontSize: 14,
    },
  });
}