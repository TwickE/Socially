import Loader from '@/components/Loader';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useAppThemeColors } from '@/hooks/useAppThemeColors';
import { createStyles } from '@/styles/follows.styles';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import { Image } from 'expo-image';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native';

const Follows = () => {
  const { t } = useTranslation("global");
  const colors = useAppThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const router = useRouter();
  const { id, type } = useLocalSearchParams();

  const query = type === 'followers' ? api.users.getUserFollowers : api.users.getUserFollowing;
  const queryData = useQuery(query, { id: id as Id<"users"> });

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
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
          renderItem={({ item }) => <UserListItem user={item.user} />}
        />
      ) : (
        <NoFollows type={type[0]} />
      )}
    </View>
  )
}

export default Follows

interface UserListItemProps {
  id: Id<"users">;
  username: string;
  fullname: string;
  image: string;
  bothFollow: boolean;
}

function UserListItem({ user }: { user: UserListItemProps }) {
  const { t } = useTranslation("global");
  const colors = useAppThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const toggleFollow = useMutation(api.users.toggleFollow);

  return (
    <Link href={`/user/${user.id}`} asChild>
      <View style={styles.itemContainer}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
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
        <Pressable
          onPress={() => toggleFollow({ followingId: user.id as Id<"users"> })}
          style={user.bothFollow ? styles.followingButton : styles.followButton}
        >
          <Text style={{ fontWeight: '600', color: user.bothFollow ? colors.text : "white" }}>
            {t("profile.followButton", { context: String(user.bothFollow) })}
          </Text>
        </Pressable>
      </View>
    </Link >
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