import { AppThemeColors } from "@/styles/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const createStyles = (colors: AppThemeColors) => {
  return StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
      height: "100%",
      backgroundColor: colors.background,
      paddingVertical: 16,
    },
    brandSection: {
      alignItems: "center",
    },
    brandIcon: {
      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 5,
    },
    appName: {
      fontSize: 42,
      fontWeight: "600",
      fontFamily: "JetBrainsMono-Medium",
      color: colors.primary,
    },
    tagline: {
      fontSize: 16,
      color: colors.grey,
      letterSpacing: 1,
    },
    illustrationContainer: {
      flex: 1,
      justifyContent: "center",
    },
    illustration: {
      width: width * 0.8,
      height: width * 0.8,
      maxHeight: 280,
    },
    loginSection: {
      width: "100%",
      paddingHorizontal: 20,
      paddingBottom: 40,
      alignItems: "center",
    },
    googleButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.text,
      paddingVertical: 16,
      borderRadius: 16,
      marginBottom: 20,
      width: "100%",
      maxWidth: 300,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 5,
    },
    googleIconContainer: {
      width: 24,
      height: 24,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    googleButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.surface,
    },
    termsText: {
      textAlign: "center",
      fontSize: 12,
      color: colors.grey,
      maxWidth: 280,
    },
  });
}