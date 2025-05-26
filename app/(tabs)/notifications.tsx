import Loader from '@/components/Loader';
import Notification from '@/components/Notification';
import { colors } from '@/constants/theme';
import { api } from '@/convex/_generated/api';
import { styles } from '@/styles/notifications.styles';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { FlatList, Text, View } from 'react-native';

const Notifications = () => {
  const notifications = useQuery(api.notifications.getNotifications);

  if (notifications === undefined) return <Loader />

  if (notifications.length === 0) return <NoNotifications />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
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