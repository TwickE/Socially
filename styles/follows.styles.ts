import { AppThemeColors } from "@/styles/theme";
import { Platform, StyleSheet } from "react-native";

export const createStyles = (colors: AppThemeColors) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      marginBottom: Platform.OS === "ios" ? 44 : 0,
      flex: 1,
      marginTop: Platform.OS === "ios" ? 44 : 0,
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
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 8,
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
    followButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
      backgroundColor: colors.primary,
      alignItems: "center",
    },
    followingButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
      backgroundColor: colors.surface,
      alignItems: "center",
    },
  });
}