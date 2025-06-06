import { AppThemeColors } from "@/styles/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const createStyles = (colors: AppThemeColors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
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
    contentDisabled: {
      opacity: 0.7,
    },
    shareButton: {
      alignItems: "center",
      justifyContent: "center",
    },
    shareButtonDisabled: {
      opacity: 0.5,
    },
    shareText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: "600",
    },
    shareTextDisabled: {
      color: colors.grey,
    },
    emptyImageContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    emptyImageText: {
      color: colors.text,
      fontSize: 20,
    },
    content: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    imageSection: {
      width: width,
      height: width,
      backgroundColor: colors.surface,
      justifyContent: "center",
      alignItems: "center",
    },
    previewImage: {
      width: "100%",
      height: "100%",
    },
    changeImageButton: {
      position: "absolute",
      bottom: 16,
      right: 16,
      backgroundColor: colors.changeImageButton,
      flexDirection: "row",
      alignItems: "center",
      padding: 8,
      borderRadius: 8,
      gap: 6,
    },
    changeImageText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "500",
    },
    inputSection: {
      padding: 16,
      flex: 1,
    },
    captionContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
    userAvatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      marginRight: 12,
    },
    captionInput: {
      flex: 1,
      color: colors.text,
      fontSize: 16,
      minHeight: 40,
      maxHeight: 120,
      padding: 8,
      borderWidth: 1,
      borderColor: colors.grey,
      borderRadius: 8,
    },
  });
}