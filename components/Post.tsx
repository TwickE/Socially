import CommentsModal from '@/components/CommentsModal';
import PostActionsModal from '@/components/PostActionsModal';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useAppThemeColors } from '@/hooks/useAppThemeColors';
import { createStyles } from '@/styles/feed.styles';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import { formatDistanceToNow } from 'date-fns';
import { enUS, pt } from 'date-fns/locale';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

type PostProps = {
  post: {
    _id: Id<"posts">;
    imageUrl: string;
    caption?: string;
    likes: number;
    comments: number;
    _creationTime: number;
    isLiked: boolean;
    isBookmarked: boolean;
    author: {
      _id: string;
      username: string;
      image: string;
    }
  }
}

const Post = ({ post }: PostProps) => {
  const [showComments, setShowComments] = useState(false);
  const [showPostActionsModal, setShowPostActionsModal] = useState(false);
  const colors = useAppThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const { user } = useUser();
  const { t, i18n } = useTranslation("global");

  const currentUser = useQuery(api.users.getUserByClerkId, user ? { clerkId: user.id } : "skip");

  const toggleLike = useMutation(api.posts.toggleLike);
  const toggleBookmark = useMutation(api.bookmarks.toggleBookmark);
  const deletePost = useMutation(api.posts.deletePost);

  const handleLike = async () => {
    try {
      await toggleLike({ postId: post._id });
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  }

  const handleBookmark = async () => {
    try {
      await toggleBookmark({ postId: post._id });
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  }

  const handleDelete = async () => {
    Alert.alert(t("home.post.alert.title"), t("home.post.alert.message"), [
      {
        text: t("home.post.alert.cancelButton"),
        style: 'cancel'
      },
      {
        text: t("home.post.alert.confirmButton"),
        style: 'destructive',
        onPress: async () => {
          try {
            await deletePost({ postId: post._id });
          } catch (error) {
            console.error("Error deleting post:", error);
          }
        }
      }
    ]);
  }

  const handleShowActionsModal = () => {
    setShowPostActionsModal(true);
  }

  return (
    <View style={styles.post}>
      {/* POST HEADER */}
      <View style={styles.postHeader}>
        <Link
          href={currentUser?._id === post.author._id ? '/(tabs)/profile' : `/user/${post.author._id}`}
          asChild
        >
          <TouchableOpacity style={styles.postHeaderLeft}>
            <Image
              source={post.author.image}
              style={styles.postAvatar}
              contentFit='cover'
              transition={200}
              cachePolicy='memory-disk'
            />
            <Text style={styles.postUsername}>{post.author.username}</Text>
          </TouchableOpacity>
        </Link>
        {/* POST ACTIONS MODAL TRIGGER */}
        <TouchableOpacity onPress={handleShowActionsModal}>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
      {/* POST IMAGE */}
      <Image
        source={post.imageUrl}
        style={styles.postImage}
        contentFit='cover'
        transition={200}
        cachePolicy='memory-disk'
      />
      {/* POST ACTIONS */}
      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <TouchableOpacity onPress={handleLike}>
            <Ionicons
              name={post.isLiked ? "heart" : "heart-outline"}
              size={24}
              color={post.isLiked ? colors.red : colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowComments(true)}>
            <Ionicons name="chatbubble-outline" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleBookmark}>
          <Ionicons
            name={post.isBookmarked ? "bookmark" : "bookmark-outline"}
            size={22}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>
      {/* POST INFO */}
      <View style={styles.postInfo}>
        <Text style={styles.likesText}>
          {t("home.post.likes", { count: post.likes })}
        </Text>
        {post.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionUsername}>{post.author.username}</Text>
            <Text style={styles.captionText}>{post.caption}</Text>
          </View>
        )}
        {post.comments > 0 && (
          <TouchableOpacity onPress={() => setShowComments(true)}>
            <Text style={styles.commentsText}>{t("home.post.comments", {count: post.comments})}</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.timeAgo}>
          {formatDistanceToNow(post._creationTime, { addSuffix: true, locale: i18n.language === 'pt' ? pt : enUS })}
        </Text>
      </View>
      {/* COMMENTS MODAL */}
      <CommentsModal
        postId={post._id}
        visible={showComments}
        onClose={() => setShowComments(false)}
      />
      {/* POST ACTIONS MODAL */}
      <PostActionsModal
        visible={showPostActionsModal}
        onClose={() => setShowPostActionsModal(false)}
        isLiked={post.isLiked}
        onToggleLike={handleLike}
        isBookmarked={post.isBookmarked}
        onToggleBookmark={handleBookmark}
        onViewComments={() => {
          setShowPostActionsModal(false);
          setShowComments(true);
        }}
        onDeletePost={() => {
          setShowPostActionsModal(false);
          handleDelete();
        }}
        isOwner={post.author._id === currentUser?._id}
      />
    </View>
  )
}

export default Post