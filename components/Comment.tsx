import { useAppThemeColors } from '@/hooks/useAppThemeColors';
import { createStyles } from '@/styles/feed.styles';
import { formatDistanceToNow } from 'date-fns';
import { enUS, pt } from 'date-fns/locale';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';

interface CommentProps {
  content: string;
  _creationTime: number;
  user: {
    fullName: string;
    image: string;
  }
}

const Comment = ({ comment }: { comment: CommentProps }) => {
  const { i18n } = useTranslation("global");
  const colors = useAppThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.commentContainer}>
      <Image source={{ uri: comment.user.image }} style={styles.commentAvatar} />
      <View style={styles.commentContent}>
        <Text style={styles.commentUsername}>{comment.user.fullName}</Text>
        <Text style={styles.commentText}>{comment.content}</Text>
        <Text style={styles.commentTime}>
          {formatDistanceToNow(comment._creationTime, { addSuffix: true, locale: i18n.language === 'pt' ? pt : enUS })}
        </Text>
      </View>
    </View>
  )
}

export default Comment