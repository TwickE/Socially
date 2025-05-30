import Comment from '@/components/Comment';
import Loader from '@/components/Loader';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useAppThemeColors } from '@/hooks/useAppThemeColors';
import { createStyles } from '@/styles/feed.styles';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

type CommentsModalProps = {
  postId: Id<"posts">;
  visible: boolean
  onClose: () => void;
}

const CommentsModal = ({ onClose, postId, visible }: CommentsModalProps) => {
  const [newComment, setNewComment] = useState("");
  const comments = useQuery(api.comments.getComments, { postId });
  const addComment = useMutation(api.comments.addComment);
  const { t } = useTranslation("global");
  const colors = useAppThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await addComment({ content: newComment, postId });

      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        {/* HEADER */}
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{t("home.post.commentsModal.title")}</Text>
          <View style={{ width: 24 }} />
        </View>
        {/* COMMENTS */}
        {comments === undefined ? (
          <Loader />
        ) : (
          <FlatList
            data={comments}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => <Comment comment={item} />}
            contentContainerStyle={styles.commentsList}
          />
        )}
        {/* ADD COMMENT */}
        <View style={styles.commentInput}>
          <TextInput
            style={styles.input}
            placeholder={t("home.post.commentsModal.inputPlaceholder")}
            placeholderTextColor={colors.grey}
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />
          <TouchableOpacity
            onPress={handleAddComment}
            disabled={!newComment.trim()}
          >
            <Text style={[styles.postButton, !newComment.trim() && styles.postButtonDisabled]}>
              {t("home.post.commentsModal.postButton")}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default CommentsModal