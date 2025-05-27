import Loader from "@/components/Loader";
import Post from "@/components/Post";
import StoriesSection from "@/components/Stories";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/feed.styles";
import { colors } from "@/styles/theme";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { signOut } = useAuth();
  const [refreshing, setRefreshing] = useState(false)

  const posts = useQuery(api.posts.getFeedPosts);

  if (posts === undefined) {
    return <Loader />
  }

  if (posts.length === 0) {
    return <NoPostsFound />
  }

  // TODO: Implement pull to refresh
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Socially</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <Link href="/notifications" asChild>
            <TouchableOpacity >
              <Ionicons name="notifications-outline" size={24} color={colors.white} />
            </TouchableOpacity>
          </Link>
          <TouchableOpacity onPress={() => signOut()}>
            <Ionicons name="log-out-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      {/* STORIES & POSTS */}
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
    </View>
  );
}

const NoPostsFound = () => (
  <View style={{
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  }}>
    <Ionicons name="images-outline" size={50} color={colors.primary} />
    <Text style={{ fontSize: 20, color: colors.white }}>No posts yet</Text>
  </View>
);

