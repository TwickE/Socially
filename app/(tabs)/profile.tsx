import EditedProfileModal from '@/components/EditProfileModal';
import Loader from '@/components/Loader';
import SettingsModalV2 from '@/components/SettingsModalV2';
import { api } from '@/convex/_generated/api';
import { useAppThemeColors } from '@/hooks/useAppThemeColors';
import { createStyles } from '@/styles/profile.styles';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useQuery } from 'convex/react';
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Profile = () => {
  const { userId } = useAuth();
  const currentUser = useQuery(api.users.getUserByClerkId, userId ? { clerkId: userId } : "skip");
  const router = useRouter();

  const { t } = useTranslation("global");
  const colors = useAppThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const posts = useQuery(api.posts.getPostsByUser, {});

  const settingsModalV2 = useRef<BottomSheetModal>(null);
  const handleOpenSettingsModalV2 = () => {
    settingsModalV2.current?.present();
  }
  const editProfileModal = useRef<BottomSheetModal>(null);
  const handleOpenEditProfileModal = () => {
    editProfileModal.current?.present();
  }

  if (!currentUser || posts === undefined) {
    return (
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("profile.loadingTitle")}</Text>
          <TouchableOpacity style={styles.headerIcon} onPress={handleOpenSettingsModalV2}>
            <Ionicons name="settings-outline" size={24} color={colors.text} />
          </TouchableOpacity>
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
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentUser.username}</Text>
        <TouchableOpacity style={styles.headerIcon} onPress={handleOpenSettingsModalV2}>
          <Ionicons name="settings-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileInfo}>
          {/* AVATAR */}
          <View style={styles.avatarAndStats}>
            <View style={styles.avatarContainer}>
              <Image
                source={currentUser.image}
                style={styles.avatar}
                contentFit="cover"
                transition={200}
              />
            </View>
            {/* STATS */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{currentUser.posts}</Text>
                <Text style={styles.statLabel}>{t("profile.posts")}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{currentUser.followers}</Text>
                <Text style={styles.statLabel}>{t("profile.followers")}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{currentUser.following}</Text>
                <Text style={styles.statLabel}>{t("profile.following")}</Text>
              </View>
            </View>
          </View>
          {/* NAME AND BIO */}
          <Text style={styles.name}>{currentUser.fullname}</Text>
          {currentUser.bio && <Text style={styles.bio}>{currentUser.bio}</Text>}
          {/* EDIT PROFILE BUTTON */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton} onPress={handleOpenEditProfileModal}>
              <Text style={styles.editButtonText}>{t("profile.editProfile")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="share-outline" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
        {/* POSTS */}
        {posts.length === 0 && <NoPostsFound />}
        <FlatList
          data={posts}
          numColumns={3}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <Link href={{ pathname: "/post/[id]", params: { id: item._id.toString() } }} asChild>
              <TouchableOpacity style={styles.gridItem}>
                <Image
                  source={item.imageUrl}
                  style={styles.gridImage}
                  contentFit="cover"
                  transition={200}
                />
              </TouchableOpacity>
            </Link>
          )}
        />
      </ScrollView>
      {/* EDIT PROFILE MODAL */}
      <EditedProfileModal ref={editProfileModal} />
      {/* SETTINGS MODAL */}
      <SettingsModalV2 ref={settingsModalV2} />
    </View>
  )
}

export default Profile

function NoPostsFound() {
  const { t } = useTranslation("global");
  const colors = useAppThemeColors();

  return (
    <View style={{
      height: '100%',
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Ionicons name="image-outline" size={48} color={colors.primary} />
      <Text style={{ fontSize: 20, color: colors.text }}>{t("home.noPosts")}</Text>
    </View>
  )
}