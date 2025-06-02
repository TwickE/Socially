import { AppThemeColors } from "@/styles/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

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
    headerIcon: {
      padding: 4,
    },
    profileInfo: {
      padding: 16,
    },
    avatarAndStats: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    avatarContainer: {
      marginRight: 32,
    },
    avatar: {
      width: 86,
      height: 86,
      borderRadius: 43,
      borderWidth: 2,
      borderColor: colors.surface,
    },
    statsContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-around",
    },
    statItem: {
      alignItems: "center",
    },
    statNumber: {
      fontSize: 17,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 13,
      color: colors.grey,
    },

    name: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 4,
    },
    bio: {
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
    },
    actionButtons: {
      flexDirection: "row",
      gap: 8,
      marginTop: 8,
    },
    editButton: {
      flex: 1,
      backgroundColor: colors.surface,
      padding: 8,
      borderRadius: 8,
      alignItems: "center",
    },
    editButtonText: {
      color: colors.text,
      fontWeight: "600",
      fontSize: 14,
    },
    shareButton: {
      backgroundColor: colors.surface,
      padding: 8,
      borderRadius: 8,
      aspectRatio: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    gridItem: {
      flex: 1 / 3,
      aspectRatio: 1,
      padding: 1,
    },
    gridImage: {
      flex: 1,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
    },
    modalTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "600",
      marginHorizontal: 'auto',
      marginVertical: 16,
    },
    inputContainer: {
      marginBottom: 20,
    },
    inputLabel: {
      color: colors.grey,
      marginBottom: 8,
      fontSize: 14,
    },
    input: {
      backgroundColor: colors.background,
      borderRadius: 8,
      padding: 12,
      color: colors.text,
      fontSize: 16,
    },
    bioInput: {
      height: 100,
      textAlignVertical: "top",
    },
    saveButton: {
      backgroundColor: colors.primary,
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 20,
    },
    saveButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
    modalBackdrop: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      justifyContent: "center",
    },
    postDetailContainer: {
      backgroundColor: colors.background,
      maxHeight: height * 0.9,
    },
    postDetailHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: 12,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.surface,
    },
    postDetailImage: {
      width: width,
      height: width,
    },
    followButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 8,
      borderRadius: 8,
      marginTop: 16,
    },
    followingButton: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    followButtonText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "600",
      textAlign: "center",
    },
    followingButtonText: {
      color: colors.text,
      textAlign: "center",
    },
    noPostsContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 48,
      gap: 12,
      flex: 1,
    },
    noPostsText: {
      color: colors.grey,
      fontSize: 16,
    },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    postsGrid: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
    },
    settingsModalTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "600",
      marginHorizontal: 'auto',
      marginVertical: 16,
    },
    settingsModalAction: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 8,
      padding: 16,
      backgroundColor: colors.background,
      borderRadius: 8,
    },
    settingsModalActionText: {
      color: colors.text,
      fontSize: 16,
    },
    settingsModalActionTheme: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 8,
      backgroundColor: colors.background,
      borderRadius: 8,
      paddingHorizontal: 16,
      height: 56
    },
  });
}