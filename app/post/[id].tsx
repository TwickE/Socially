import Loader from '@/components/Loader';
import Post from '@/components/Post';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useAppThemeColors } from '@/hooks/useAppThemeColors';
import { createStyles } from '@/styles/post.styles';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

const PostDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation("global");
  const colors = useAppThemeColors();
    const styles = useMemo(() => createStyles(colors), [colors]);

  const post = useQuery(api.posts.getPostById, { postId: id as Id<"posts"> });

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("home.post.title")}</Text>
        <View style={{ width: 24 }} />
      </View>
      {/* POST CONTENT */}
      {post === undefined ? (
        <Loader />
      ) : (
        <Post post={post} />
      )}
    </View>
  )
}

export default PostDetails