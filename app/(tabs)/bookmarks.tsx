import Loader from '@/components/Loader';
import { colors } from '@/constants/theme';
import { api } from '@/convex/_generated/api';
import { styles } from '@/styles/bookmarks.styles';
import { useQuery } from 'convex/react';
import { Image } from 'expo-image';
import { FlatList, Text, View } from 'react-native';

const Bookmarks = () => {
  const bookmarkedPosts = useQuery(api.bookmarks.getBookmarkedPosts);

  if (bookmarkedPosts === undefined) return <Loader />;

  if (bookmarkedPosts.length === 0) return <NoBookmarksFound />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookmarks</Text>
      </View>
      {/* POSTS */}
      <FlatList
        data={bookmarkedPosts}
        keyExtractor={(item) => item!._id.toString()}
        renderItem={({ item }) =>
          item ? (
          <View style={styles.containerItem}>
            <Image
                source={{ uri: item.imageUrl }}
                style={styles.image}
                contentFit="cover"
                transition={200}
                cachePolicy="memory-disk"
              />
          </View>
        ): null}
        numColumns={3}
        columnWrapperStyle={styles.postsContainer}
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
      <Text style={{ color: colors.primary, fontSize: 22 }}>No bookmarked posts yet</Text>
    </View>
  )
}