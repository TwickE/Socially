import { useLanguage } from '@/context/LanguageContext';
import { ThemeContext } from '@/context/ThemeContext';
import { useAppThemeColors } from '@/hooks/useAppThemeColors';
import { createStyles } from '@/styles/profile.styles';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Text, TouchableOpacity } from 'react-native';

const SettingsModal = ({ ref }: { ref: any }) => {
  const snapPoints = useMemo(() => ['70%'], []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
    ),
    []
  );

  const { signOut } = useAuth();
  const { t, i18n } = useTranslation("global");
  const { changeLanguage } = useLanguage();

  const colors = useAppThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { currentTheme, toggleTheme, setSystemTheme, isSystemTheme } = useContext(ThemeContext);

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
      <BottomSheetView style={{ paddingHorizontal: 20 }}>
        {/* HEADER */}
        <Text style={styles.settingsModalTitle}>{t("profile.settingsModal.title")}</Text>
        <BottomSheetView style={{ flexDirection: "column", gap: 16 }}>
          {/* LANGUAGE SETTINGS */}
          <BottomSheetView style={{ flexDirection: "column", gap: 8 }}>
            <BottomSheetView style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <MaterialIcons name="language" size={28} color={colors.text} />
              <Text style={[styles.settingsModalActionText, { fontWeight: 600 }]}>{t("profile.settingsModal.language")}</Text>
            </BottomSheetView>
            <TouchableOpacity onPress={() => changeLanguage("en")} style={styles.settingsModalAction}>
              <Text style={styles.settingsModalActionText}>🇬🇧 English</Text>
              <MaterialIcons name={i18n.language === "en" ? "radio-button-checked" : "radio-button-unchecked"} size={24} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLanguage("pt")} style={styles.settingsModalAction}>
              <Text style={styles.settingsModalActionText}>🇵🇹 Português</Text>
              <MaterialIcons name={i18n.language === "pt" ? "radio-button-checked" : "radio-button-unchecked"} size={24} color={colors.text} />
            </TouchableOpacity>
          </BottomSheetView>
          {/* THEME SETTINGS */}
          <BottomSheetView style={{ flexDirection: "column", gap: 8 }}>
            <BottomSheetView style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Ionicons name="invert-mode-sharp" size={28} color={colors.text} />
              <Text style={[styles.settingsModalActionText, { fontWeight: 600 }]}>{t("profile.settingsModal.theme")}</Text>
            </BottomSheetView>
            <BottomSheetView style={styles.settingsModalActionTheme}>
              <Text style={styles.settingsModalActionText}>{t("profile.settingsModal.darkModeSwitch")}</Text>
              <Switch
                onValueChange={() => toggleTheme(currentTheme === "light" ? "dark" : "light")}
                value={!isSystemTheme && currentTheme === "dark"}
              />
            </BottomSheetView>
            <BottomSheetView style={styles.settingsModalActionTheme}>
              <Text style={styles.settingsModalActionText}>{t("profile.settingsModal.systemModeSwitch")}</Text>
              <Switch
                onValueChange={() => setSystemTheme()}
                value={isSystemTheme}
              />
            </BottomSheetView>
            <Text style={{ fontSize: 16, color: colors.grey }}>{t("profile.settingsModal.themeDescription")}</Text>
          </BottomSheetView>
          {/* LOGOUT BUTTON */}
          <TouchableOpacity onPress={() => signOut()} style={styles.settingsModalLogoutButton}>
            <Ionicons name="log-out-outline" size={24} color="white" />
            <Text style={{color: "white"}}>{t("profile.settingsModal.logout")}</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

export default SettingsModal