import Loader from "@/components/Loader";
import Post from "@/components/Post";
import StoriesSection from "@/components/Stories";
import { colors } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/feed.styles";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
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
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={24} color={colors.white} />
        </TouchableOpacity>
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
    <Text style={{
      fontSize: 20,
      color: colors.primary
    }}>No posts yet</Text>
  </View>
);

