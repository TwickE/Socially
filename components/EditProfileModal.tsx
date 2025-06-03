import { api } from '@/convex/_generated/api';
import { useAppThemeColors } from '@/hooks/useAppThemeColors';
import { createStyles } from '@/styles/profile.styles';
import { useAuth } from '@clerk/clerk-expo';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { useMutation, useQuery } from 'convex/react';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity } from 'react-native';

const EditedProfileModal = ({ ref }: { ref: any }) => {
  const snapPoints = useMemo(() => ['50%'], []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
    ),
    []
  );

  const { t, } = useTranslation("global");
  const colors = useAppThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const { userId } = useAuth();
  const currentUser = useQuery(api.users.getUserByClerkId, userId ? { clerkId: userId } : "skip");
  const [editedProfile, setEditedProfile] = useState({
    fullname: currentUser?.fullname || '',
    bio: currentUser?.bio || '',
  });

  const updateProfile = useMutation(api.users.updateProfile);

  const handleSaveProfile = async () => {
    await updateProfile(editedProfile);
    ref.current?.dismiss();
  }

  return (
    <BottomSheetModal
      snapPoints={snapPoints}
      ref={ref}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={false}
      backgroundStyle={{ backgroundColor: colors.surface }}
      handleIndicatorStyle={{ backgroundColor: colors.text }}
    >
      {/* HEADER */}
      <Text style={styles.modalTitle}>{t("profile.editModal.title")}</Text>
      <BottomSheetScrollView style={{ paddingHorizontal: 20 }}>
        {/* NAME INPUT */}
        <BottomSheetView style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("profile.editModal.name")}</Text>
          <BottomSheetTextInput
            style={styles.input}
            value={editedProfile.fullname}
            onChangeText={(text) => setEditedProfile((prev) => ({ ...prev, fullname: text }))}
            placeholderTextColor={colors.grey}
          />
        </BottomSheetView>
        {/* Bio Input */}
        <BottomSheetView style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("profile.editModal.bio")}</Text>
          <BottomSheetTextInput
            style={[styles.input, styles.bioInput]}
            value={editedProfile.bio}
            onChangeText={(text) => setEditedProfile((prev) => ({ ...prev, bio: text }))}
            multiline
            numberOfLines={4}
            placeholderTextColor={colors.grey}
          />
        </BottomSheetView>
        {/* SAVE BUTTON */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
          <Text style={styles.saveButtonText}>{t("profile.editModal.saveChanges")}</Text>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
}

export default EditedProfileModal