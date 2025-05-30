import Loader from "@/components/Loader";
import Post from "@/components/Post";
import StoriesSection from "@/components/Stories";
import { api } from "@/convex/_generated/api";
import { useAppThemeColors } from "@/hooks/useAppThemeColors";
import { createStyles } from "@/styles/feed.styles";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { Link } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { signOut } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const colors = useAppThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const posts = useQuery(api.posts.getFeedPosts, { _trigger: refreshKey });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  useEffect(() => {
    if (refreshing && posts !== undefined) {
      setRefreshing(false);
    }
  }, [refreshing, posts]);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Socially</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <Link href="/notifications" asChild>
            <TouchableOpacity >
              <Ionicons name="notifications-outline" size={24} color={colors.text} />
            </TouchableOpacity>
          </Link>
          <TouchableOpacity onPress={() => signOut()}>
            <Ionicons name="log-out-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      {/* STORIES & POSTS */}
      {posts === undefined ? (
        <Loader />
      ) : posts.length === 0 ? (
        <NoPostsFound />
      ) : (
        <FlatList
          data={posts}
          renderItem={({ item }) => <Post post={item} />}
          keyExtractor={(item) => item._id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }}
          ListHeaderComponent={<StoriesSection />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
        />
      )}
    </View>
  );
}

const NoPostsFound = () => {
  const { t } = useTranslation("global");
  const colors = useAppThemeColors();

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Ionicons name="images-outline" size={50} color={colors.primary} />
      <Text style={{ fontSize: 20, color: colors.text }}>{t("home.noPosts")}</Text>
    </View>
  )
}

