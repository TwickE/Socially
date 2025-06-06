import Loader from '@/components/Loader';
import { api } from '@/convex/_generated/api';
import { useAppThemeColors } from '@/hooks/useAppThemeColors';
import { createStyles } from '@/styles/bookmarks.styles';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

const Bookmarks = () => {
  const bookmarkedPosts = useQuery(api.bookmarks.getBookmarkedPosts);
  const router = useRouter();
  const { t } = useTranslation("global");
  const colors = useAppThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("bookmarks.title")}</Text>
        <View style={{ width: 24 }} />
      </View>
      {/* BOOKMARKS */}
      {bookmarkedPosts === undefined ? (
        <Loader />
      ) : bookmarkedPosts.length === 0 ? (
        <NoBookmarksFound />
      ) : (
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
      )}
    </View>
  )
}

export default Bookmarks

function NoBookmarksFound() {
  const { t } = useTranslation("global");
  const colors = useAppThemeColors();
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background
      }}
    >
      <Ionicons name="bookmark-outline" size={48} color={colors.primary} />
      <Text style={{ fontSize: 20, color: colors.text }}>{t("bookmarks.noBookmarks")}</Text>
    </View>
  )
}