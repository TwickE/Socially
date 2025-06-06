import FollowsModal from '@/components/FollowModal';
import Loader from '@/components/Loader';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useAppThemeColors } from '@/hooks/useAppThemeColors';
import { createStyles } from '@/styles/profile.styles';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import { Image } from 'expo-image';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native';

const UserProfileScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation("global");
  const colors = useAppThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const profile = useQuery(api.users.getUserProfile, { id: id as Id<"users"> });
  const posts = useQuery(api.posts.getPostsByUser, { userId: id as Id<"users"> });
  const isFollowing = useQuery(api.users.isFollowing, { followingId: id as Id<"users"> });

  const toggleFollow = useMutation(api.users.toggleFollow);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  }

  const [followsModal, setFollowsModal] = useState({
    visible: false,
    type: 'followers' as 'followers' | 'following',
  });

  if (profile === undefined || posts === undefined || isFollowing === undefined) {
    return (
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("profile.userLoadingTitle")}</Text>
          <View style={{ width: 24 }} />
        </View>
        {/* LOADER */}
        <Loader />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{profile.username}</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.profileInfo}>
        {/* AVATAR */}
        <View style={styles.avatarAndStats}>
          <Image
            source={profile.image}
            style={styles.avatar}
            contentFit="cover"
            transition={200}
            cachePolicy='memory-disk'
          />
          {/* STATS */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profile.posts}</Text>
              <Text style={styles.statLabel}>{t("profile.posts")}</Text>
            </View>
            <TouchableOpacity
              onPress={() => setFollowsModal({ visible: true, type: "followers" })}
              style={styles.statItem}
            >
              <Text style={styles.statNumber}>{profile.followers}</Text>
              <Text style={styles.statLabel}>{t("profile.followers")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFollowsModal({ visible: true, type: "following" })}
              style={styles.statItem}
            >
              <Text style={styles.statNumber}>{profile.following}</Text>
              <Text style={styles.statLabel}>{t("profile.following")}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* NAME AND BIO */}
        <Text style={styles.name}>{profile.fullname}</Text>
        {profile.bio && <Text style={styles.bio}>{profile.bio}</Text>}
        {/* FOLLOW BUTTON */}
        <Pressable
          style={[styles.followButton, isFollowing && styles.followingButton]}
          onPress={() => toggleFollow({ followingId: id as Id<"users"> })}
        >
          <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
            {t("profile.followButton", { context: String(isFollowing) })}
          </Text>
        </Pressable>
      </View>
      {/* POSTS */}
      {posts.length === 0 ? (
        <NoPostsFound />
      ) : (
        <FlatList
          data={posts}
          numColumns={3}
          scrollEnabled={true}
          renderItem={({ item }) => (
            <Link href={{ pathname: "/post/[id]", params: { id: item._id.toString() } }} asChild>
              <TouchableOpacity style={styles.gridItem}>
                <Image
                  source={item.imageUrl}
                  style={styles.gridImage}
                  contentFit="cover"
                  transition={200}
                  cachePolicy='memory-disk'
                />
              </TouchableOpacity>
            </Link>
          )}
        />
      )}
      {/* FOLLOWS MODAL */}
      <FollowsModal
        id={profile._id}
        type={followsModal.type}
        visible={followsModal.visible}
        onClose={() => setFollowsModal({ visible: false, type: 'followers' })}
      />
    </View>
  )
}

export default UserProfileScreen

function NoPostsFound() {
  const { t } = useTranslation("global");
  const colors = useAppThemeColors();

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Ionicons name="image-outline" size={48} color={colors.primary} />
      <Text style={{ fontSize: 20, color: colors.text }}>{t("home.noPosts")}</Text>
    </View>
  )
}