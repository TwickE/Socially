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
    containerItem: {
      flex: 1 / 3,
      aspectRatio: 1,
      padding: 1,
    },
    image: {
      flex: 1,
    }
  });
}