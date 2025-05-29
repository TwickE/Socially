import { Id } from '@/convex/_generated/dataModel';
import { styles } from '@/styles/notifications.styles';
import { colors } from '@/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { enUS, pt } from 'date-fns/locale';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

type NotificationProps = {
  notification: {
    _id: Id<"notifications">;
    _creationTime: number;
    postId?: Id<"posts"> | undefined;
    commentId?: Id<"comments"> | undefined;
    type: "like" | "comment" | "follow";
    receiverId: Id<"users">;
    senderId: Id<"users">;
    sender: {
      _id: Id<"users">,
      username: string,
      image: string,
    },
    post?: {
      _id: Id<"posts">;
      _creationTime: number;
      caption?: string | undefined;
      userId: Id<"users">;
      imageUrl: string;
      storageId: Id<"_storage">;
      likes: number;
      comments: number;
    } | null,
    comment?: string | undefined;
  }
}

const Notification = ({ notification }: NotificationProps) => {
  const { t, i18n } = useTranslation("global");

  return (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Link href={`/user/${notification.sender._id}`} asChild>
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={notification.sender.image}
              style={styles.avatar}
              contentFit="cover"
              transition={200}
            />
            <View style={styles.iconBadge}>
              {notification.type === 'like' ? (
                <Ionicons name="heart" size={14} color={colors.red} />
              ) : notification.type === 'follow' ? (
                <Ionicons name="person-add" size={14} color="#8B5CF6" />
              ) : (
                <Ionicons name="chatbubble" size={14} color="#3B82F6" />
              )}
            </View>
          </TouchableOpacity>
        </Link>
        <View style={styles.notificationInfo}>
          <Link href={`/user/${notification.sender._id}`} asChild>
            <TouchableOpacity>
              <Text style={styles.username}>{notification.sender.username}</Text>
            </TouchableOpacity>
          </Link>
          <Text style={styles.action}>
            {notification.type === 'follow' ? (
              t("notifications.notification.newFollower")
            ) : notification.type === 'like' ? (
              t("notifications.notification.newLike")
            ) : (
              t("notifications.notification.newComment", {comment: notification.comment})
            )}
          </Text>
          <Text style={styles.timeAgo}>
            {formatDistanceToNow(notification._creationTime, { addSuffix: true, locale: i18n.language === 'pt' ? pt : enUS })}
          </Text>
        </View>
      </View>
      {notification.post && (
        <Image
          source={notification.post.imageUrl}
          style={styles.postImage}
          contentFit="cover"
          transition={200}
        />
      )}
    </View>
  )
}

export default Notification