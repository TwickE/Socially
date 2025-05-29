import Loader from '@/components/Loader';
import SettingsModal from '@/components/SettingsModal';
import { useModalOverlay } from '@/context/ModalOverlayContext';
import { api } from '@/convex/_generated/api';
import { styles } from '@/styles/profile.styles';
import { colors } from '@/styles/theme';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const Profile = () => {
  const { signOut, userId } = useAuth();
  const { requestShowOverlay, requestHideOverlay } = useModalOverlay();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const currentUser = useQuery(api.users.getUserByClerkId, userId ? { clerkId: userId } : "skip");
  const router = useRouter();
  const { t } = useTranslation("global");

  const [editedProfile, setEditedProfile] = useState({
    fullname: currentUser?.fullname || '',
    bio: currentUser?.bio || '',
  });

  const posts = useQuery(api.posts.getPostsByUser, {});

  const updateProfile = useMutation(api.users.updateProfile);

  const handleSaveProfile = async () => {
    await updateProfile(editedProfile);
    setIsEditModalVisible(false);
  }

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
    setEditedProfile({
      fullname: currentUser?.fullname || '',
      bio: currentUser?.bio || '',
    });
  }
  
  useEffect(() => {
    if (isEditModalVisible || isSettingsModalVisible) {
      requestShowOverlay();
    } else {
      requestHideOverlay();
    }

    return () => {
      if (isEditModalVisible || isSettingsModalVisible) {
        requestHideOverlay();
      }
    }
  }, [isEditModalVisible, isSettingsModalVisible, requestShowOverlay, requestHideOverlay]);

  if (!currentUser || posts === undefined) {
    return (
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("profile.loadingTitle")}</Text>
          <TouchableOpacity style={styles.headerIcon} onPress={() => signOut()}>
            <Ionicons name="log-out-outline" size={24} color={colors.white} />
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
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentUser.username}</Text>
        <TouchableOpacity style={styles.headerIcon} onPress={() => setIsSettingsModalVisible(true)}>
          <Ionicons name="settings-outline" size={24} color={colors.white} />
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
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditModalVisible(true)}>
              <Text style={styles.editButtonText}>{t("profile.editProfile")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="share-outline" size={20} color={colors.white} />
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
      <Modal
        visible={isEditModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseEditModal}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={styles.modalContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{t("profile.editModal.title")}</Text>
                <TouchableOpacity onPress={handleCloseEditModal}>
                  <Ionicons name="close" size={24} color={colors.white} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{t("profile.editModal.name")}</Text>
                <TextInput
                  style={styles.input}
                  value={editedProfile.fullname}
                  onChangeText={(text) => setEditedProfile((prev) => ({ ...prev, fullname: text }))}
                  placeholderTextColor={colors.grey}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{t("profile.editModal.bio")}</Text>
                <TextInput
                  style={[styles.input, styles.bioInput]}
                  value={editedProfile.bio}
                  onChangeText={(text) => setEditedProfile((prev) => ({ ...prev, bio: text }))}
                  multiline
                  numberOfLines={4}
                  placeholderTextColor={colors.grey}
                />
              </View>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                <Text style={styles.saveButtonText}>{t("profile.editModal.saveChanges")}</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
      {/* SETTINGS MODAL */}
      <SettingsModal
        visible={isSettingsModalVisible}
        onClose={() => setIsSettingsModalVisible(false)}
      />
    </View>
  )
}

export default Profile

function NoPostsFound() {
  const { t } = useTranslation("global");

  return (
    <View style={{
      height: '100%',
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Ionicons name="image-outline" size={48} color={colors.primary} />
      <Text style={{ fontSize: 20, color: colors.white }}>{t("home.noPosts")}</Text>
    </View>
  )
}