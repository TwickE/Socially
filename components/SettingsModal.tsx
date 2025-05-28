import { useModalOverlay } from '@/context/ModalOverlayContext';
import { styles } from '@/styles/feed.styles';
import { colors } from '@/styles/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

type SettingsModalProps = {
  visible: boolean;
  onClose: () => void;
}

const SettingsModal = ({
  visible,
  onClose,
}: SettingsModalProps) => {
  const { requestShowOverlay, requestHideOverlay } = useModalOverlay();

  useEffect(() => {
    if (visible) {
      requestShowOverlay();
    } else {
      requestHideOverlay();
    }

    return () => {
      if (visible) {
        requestHideOverlay();
      }
    }
  }, [visible, requestShowOverlay, requestHideOverlay]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.postModalContainer}>
        <View style={styles.postModalContent}>
          {/* HEADER */}
          <View style={styles.postModalHeader}>
            <Text style={styles.postModalTitle}>Settings</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={32} color={colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.postModalActions}>
            {/* LANGUAGE SETTINGS */}
            <View style={{ flexDirection: "column", gap: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <MaterialIcons name="language" size={28} color="white" />
                <Text style={{ color: "white", fontSize: 16, fontWeight: 600 }}>Language</Text>
              </View>
              <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                <Text style={{ color: "white", fontSize: 16 }}>🇵🇹 Portuguese</Text>
                <MaterialIcons name="radio-button-unchecked" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                <Text style={{ color: "white", fontSize: 16 }}>🇬🇧 English</Text>
                <MaterialIcons name="radio-button-unchecked" size={24} color="white" />
              </TouchableOpacity>
            </View>
            {/* THEME SETTINGS */}
            {/* <TouchableOpacity onPress={onToggleBookmark} style={styles.postModalAction}>
              <Ionicons
                name={isBookmarked ? "bookmark" : "bookmark-outline"}
                size={28}
                color={colors.white}
              />
              <Text style={styles.postModalText}>Bookmark Post</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onToggleLike} style={styles.postModalAction}>
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={28}
                color={isLiked ? colors.red : colors.white}
              />
              <Text style={styles.postModalText}>Like Post</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onViewComments} style={styles.postModalAction}>
              <Ionicons name="chatbubble-outline" size={28} color={colors.white} />
              <Text style={styles.postModalText}>See Comments</Text>
            </TouchableOpacity>
            {isOwner && (
              <TouchableOpacity onPress={onDeletePost} style={styles.postModalAction}>
                <Ionicons name="trash-outline" size={28} color={colors.red} />
                <Text style={styles.postModalDeleteText}>Delete Post</Text>
              </TouchableOpacity>
            )} */}
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default SettingsModal