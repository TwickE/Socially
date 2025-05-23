import { colors } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

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
    fontSize: 24,
    fontFamily: "JetBrainsMono-Medium",
    color: colors.primary,
  },
  postsContainer: {
    justifyContent: "flex-start",
    gap: 1,
    paddingHorizontal: 8,
    marginBottom: 1,
  },
  containerItem: {
    width: width / 3,
  },
  image: {
    width: width / 3,
    aspectRatio: 1,
  }
});