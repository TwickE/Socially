import { useAppThemeColors } from '@/hooks/useAppThemeColors';
import { createStyles } from '@/styles/feed.styles';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity } from 'react-native';

type PostActionsModalProps = {
  isLiked: boolean;
  onToggleLike: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onViewComments: () => void;
  onDeletePost: () => void | undefined;
  isOwner: boolean;
  ref: any;
}

const PostActionsModal = ({
  isLiked,
  onToggleLike,
  isBookmarked,
  onToggleBookmark,
  onViewComments,
  onDeletePost,
  isOwner,
  ref
}: PostActionsModalProps) => {
  const snapPoints = useMemo(() => ['35%', '50%'], []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
    ),
    []
  );

  const { t } = useTranslation("global");
  const colors = useAppThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <BottomSheetModal
      snapPoints={snapPoints}
      ref={ref}
      enablePanDownToClose={true}
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: colors.surface }}
      handleIndicatorStyle={{ backgroundColor: colors.text }}
    >
      <BottomSheetScrollView style={{ paddingHorizontal: 20, flex: 1 }} contentContainerStyle={{ gap: 8 }}>
      {/* HEADER */}
      <Text style={styles.postModalTitle}>{t("home.post.postActionsModal.title")}</Text>
      {/* Actions */}
      
        <BottomSheetView style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
        </BottomSheetView>
        <BottomSheetView style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 32 }}>
          <TouchableOpacity onPress={onViewComments} style={isOwner ? styles.postModalAction : styles.postModalActionSingle}>
            <Ionicons name="chatbubble-outline" size={28} color={colors.text} />
            <Text style={styles.postModalText}>{t("home.post.postActionsModal.comments")}</Text>
          </TouchableOpacity>
          {isOwner && (
            <TouchableOpacity onPress={onDeletePost} style={styles.postModalAction}>
              <Ionicons name="trash-outline" size={28} color={colors.red} />
              <Text style={styles.postModalDeleteText}>{t("home.post.postActionsModal.delete")}</Text>
            </TouchableOpacity>
          )}
        </BottomSheetView>
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
}

export default PostActionsModal