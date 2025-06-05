import Loader from '@/components/Loader';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useAppThemeColors } from '@/hooks/useAppThemeColors';
import { createStyles } from '@/styles/follows.styles';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

interface FollowsModalProps {
  id: Id<"users">;
  type: 'followers' | 'following';
  visible: boolean
  onClose: () => void;
}

const FollowsModal = ({ id, type, visible, onClose }: FollowsModalProps) => {
  const { t } = useTranslation("global");
  const colors = useAppThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const query = type === 'followers' ? api.users.getUserFollowers : api.users.getUserFollowing;
  const queryData = useQuery(query, { id: id as Id<"users"> });

  return (

    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {type === "followers" ? t("follows.titleFollow") : t("follows.titleFollowing")}
          </Text>
          <View style={{ width: 24 }} />
        </View>
        {/* LOADER OR LIST OF USERS */}
        {queryData === undefined ? (
          <Loader />
        ) : queryData.length > 0 ? (
          <FlatList
            data={queryData}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => <UserListItem user={item.user} onCloseModal={onClose} />}
          />
        ) : (
          <NoFollows type={type[0]} />
        )}
      </View>
    </Modal>

  )
}

export default FollowsModal

interface UserListItemProps {
  id: Id<"users">;
  username: string;
  fullname: string;
  image: string;
}

function UserListItem({ user, onCloseModal }: { user: UserListItemProps, onCloseModal: () => void }) {
  const { t } = useTranslation("global");
  const colors = useAppThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const toggleFollow = useMutation(api.users.toggleFollow);

  const { userId } = useAuth();
  const currentUser = useQuery(api.users.getUserByClerkId, userId ? { clerkId: userId } : "skip");
  const isLoggedInUser = currentUser && currentUser._id === user.id;
  const isFollowing = useQuery(api.users.isFollowing, { followingId: user.id as Id<"users"> });

  return (
    <View style={styles.itemContainer}>
      <Link  href={currentUser?._id === user.id ? '/(tabs)/profile' : `/user/${user.id}`} asChild>
        <TouchableOpacity
          onPress={onCloseModal}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
        >
          <Image
            source={{ uri: user.image }}
            style={styles.avatar}
            contentFit="cover"
            transition={200}
          />
          <View style={styles.containerText}>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.fullname}>{user.fullname}</Text>
          </View>
        </TouchableOpacity>
      </Link>
      {!isLoggedInUser && (
        <Pressable
          onPress={() => toggleFollow({ followingId: user.id as Id<"users"> })}
          style={isFollowing ? styles.followingButton : styles.followButton}
        >
          <Text style={{ fontWeight: '600', color: isFollowing ? colors.text : "white" }}>
            {t("profile.followButton", { context: String(isFollowing) })}
          </Text>
        </Pressable>
      )}
    </View>
  )
}

function NoFollows({ type }: { type: string }) {
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
      <Ionicons name="people-outline" size={48} color={colors.primary} />
      <Text style={{ fontSize: 20, color: colors.text }}>
        {type === "followers" ? t("follows.noFollowers") : t("follows.noFollowing")}
      </Text>
    </View>
  )
}