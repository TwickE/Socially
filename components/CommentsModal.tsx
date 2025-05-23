import Comment from '@/components/Comment';
import Loader from '@/components/Loader';
import { colors } from '@/constants/theme';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { styles } from '@/styles/feed.styles';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

type CommentsModalProps = {
  postId: Id<"posts">;
  visible: boolean
  onClose: () => void;
  onCommentAdded: () => void;
}

const CommentsModal = ({ onClose, onCommentAdded, postId, visible }: CommentsModalProps) => {
  const [newComment, setNewComment] = useState("");
  const comments = useQuery(api.comments.getComments, { postId });
  const addComment = useMutation(api.comments.addComment);

  const handleAddComment = async () => {
    if(!newComment.trim()) return;

    try {
      await addComment({ content: newComment, postId });

      setNewComment("");
      onCommentAdded();
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
            <Ionicons name="close" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Comments</Text>
          <View style={{ width: 24 }} />
        </View>
        {/* COMMENTS */}
        {comments === undefined ? (
          <Loader />
        ): (
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
            placeholder="Add a comment..."
            placeholderTextColor={colors.grey}
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />
          <TouchableOpacity
            onPress={handleAddComment}
            disabled={!newComment.trim()}
          >
            <Text style={[styles.postButton, !newComment.trim() && styles.postButtonDisabled]}>Post</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default CommentsModal