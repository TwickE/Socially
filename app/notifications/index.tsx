import Loader from '@/components/Loader';
import Notification from '@/components/Notification';
import { api } from '@/convex/_generated/api';
import { styles } from '@/styles/notifications.styles';
import { colors } from '@/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { useRouter } from 'expo-router';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

const Notifications = () => {
  const notifications = useQuery(api.notifications.getNotifications);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>
      {/* NOTIFICATIONS LIST */}
      {notifications === undefined ? (
        <Loader />
      ) : notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={({ item }) => <Notification notification={item} />}
          keyExtractor={(item) => item._id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <NoNotifications />
      )}

    </View>
  )
}

export default Notifications

function NoNotifications() {
  return (
    <View style={[styles.container, styles.centered]}>
      <Ionicons name="notifications-outline" size={48} color={colors.primary} />
      <Text style={{ fontSize: 20, color: colors.white }}>No notifications yet</Text>
    </View>
  )
}