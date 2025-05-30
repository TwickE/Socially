import { useModalOverlay } from '@/context/ModalOverlayContext';
import { useAppThemeColors } from '@/hooks/useAppThemeColors';
import { createStyles } from '@/styles/feed.styles';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

type PostActionsModalProps = {
  visible: boolean;
  onClose: () => void;
  isLiked: boolean;
  onToggleLike: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onViewComments: () => void;
  onDeletePost: () => void | undefined;
  isOwner: boolean;
}

const PostActionsModal = ({
  visible,
  onClose,
  isLiked,
  onToggleLike,
  isBookmarked,
  onToggleBookmark,
  onViewComments,
  onDeletePost,
  isOwner
}: PostActionsModalProps) => {
  const { requestShowOverlay, requestHideOverlay } = useModalOverlay();
  const { t } = useTranslation("global");
  const colors = useAppThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

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
            <Text style={styles.postModalTitle}>{t("home.post.postActionsModal.title")}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={32} color={colors.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.postModalActions}>
            {/* Actions */}
            <TouchableOpacity onPress={onToggleBookmark} style={styles.postModalAction}>
              <Ionicons
                name={isBookmarked ? "bookmark" : "bookmark-outline"}
                size={28}
                color={colors.text}
              />
              <Text style={styles.postModalText}>{t("home.post.postActionsModal.bookmark", { context: String(isBookmarked) })}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onToggleLike} style={styles.postModalAction}>
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={28}
                color={isLiked ? colors.red : colors.text}
              />
              <Text style={styles.postModalText}>{t("home.post.postActionsModal.like", { context: String(isLiked) })}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onViewComments} style={styles.postModalAction}>
              <Ionicons name="chatbubble-outline" size={28} color={colors.text} />
              <Text style={styles.postModalText}>{t("home.post.postActionsModal.comments")}</Text>
            </TouchableOpacity>
            {isOwner && (
              <TouchableOpacity onPress={onDeletePost} style={styles.postModalAction}>
                <Ionicons name="trash-outline" size={28} color={colors.red} />
                <Text style={styles.postModalDeleteText}>{t("home.post.postActionsModal.delete")}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default PostActionsModal