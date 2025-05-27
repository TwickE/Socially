import Loader from '@/components/Loader';
import Notification from '@/components/Notification';
import { colors } from '@/constants/theme';
import { api } from '@/convex/_generated/api';
import { styles } from '@/styles/notifications.styles';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { useRouter } from 'expo-router';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

const Notifications = () => {
  const notifications = useQuery(api.notifications.getNotifications);
  const router = useRouter();

  if (notifications === undefined) return <Loader />

  if (notifications.length === 0) return <NoNotifications />;

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
      <FlatList
        data={notifications}
        renderItem={({ item }) => <Notification notification={item} />}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

export default Notifications

function NoNotifications() {
  return (
    <View style={[styles.container, styles.centered]}>
      <Ionicons name="notifications-outline" size={50} color={colors.primary} />
      <Text style={{ fontSize: 20, color: colors.white }}>No notifications yet</Text>
    </View>
  )
}