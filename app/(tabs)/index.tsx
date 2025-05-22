import Loader from "@/components/Loader";
import Post from "@/components/Post";
import Story from "@/components/Story";
import { stories } from "@/constants/mock-data";
import { colors } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/feed.styles";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { signOut } = useAuth();

  const posts = useQuery(api.posts.getFeedPosts);

  if (posts === undefined) {
    return <Loader />
  }

  if (posts.length === 0) {
    return <NoPostsFound />
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
      {/* STORIES */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.storiesContainer}
        >
          {stories.map((story) => (
            <Story key={story.id} story={story} />
          ))}
        </ScrollView>
        {/* POSTS */}
        {posts.map((post) => (
          <Post key={post.author._id} post={post} />
        ))}
      </ScrollView>
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

