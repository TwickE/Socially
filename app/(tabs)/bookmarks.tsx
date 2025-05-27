import Loader from '@/components/Loader';
import { api } from '@/convex/_generated/api';
import { styles } from '@/styles/bookmarks.styles';
import { colors } from '@/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

const Bookmarks = () => {
  const bookmarkedPosts = useQuery(api.bookmarks.getBookmarkedPosts);
  const router = useRouter();

  if (bookmarkedPosts === undefined) return <Loader />;

  if (bookmarkedPosts.length === 0) return <NoBookmarksFound />;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bookmarks</Text>
        <View style={{ width: 24 }} />
      </View>
      {/* POSTS */}
      {/* `/post/${item._id.toString()}` */}
      <FlatList
        data={bookmarkedPosts}
        keyExtractor={(item) => item!._id.toString()}
        renderItem={({ item }) =>
          item ? (
            <Link href={{ pathname: "/post/[id]", params: { id: item._id.toString() } }} asChild>
              <TouchableOpacity style={styles.containerItem}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.image}
                  contentFit="cover"
                  transition={200}
                  cachePolicy="memory-disk"
                />
              </TouchableOpacity>
            </Link>
          ) : null}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default Bookmarks

function NoBookmarksFound() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background
      }}
    >
      <Ionicons name="bookmark-outline" size={50} color={colors.primary} />
      <Text style={{ fontSize: 20, color: colors.white }}>No bookmarked posts yet</Text>
    </View>
  )
}