import { useLanguage } from '@/context/LanguageContext';
import { useModalOverlay } from '@/context/ModalOverlayContext';
import { ThemeContext } from '@/context/ThemeContext';
import { useAppThemeColors } from '@/hooks/useAppThemeColors';
import { createStyles } from '@/styles/profile.styles';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Switch, Text, TouchableOpacity, View } from 'react-native';

type SettingsModalProps = {
  visible: boolean;
  onClose: () => void;
}

const SettingsModal = ({
  visible,
  onClose,
}: SettingsModalProps) => {
  const { requestShowOverlay, requestHideOverlay } = useModalOverlay();
  const { t, i18n } = useTranslation("global");
  const { changeLanguage } = useLanguage();

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

  const colors = useAppThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [systemModeSwitch, setSystemModeSwitch] = useState(false);
  const { currentTheme, toggleTheme, setSystemTheme, isSystemTheme } = useContext(ThemeContext);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.settingsModalContainer}>
        <View style={styles.settingsModalContent}>
          {/* HEADER */}
          <View style={styles.settingsModalHeader}>
            <Text style={styles.settingsModalTitle}>{t("profile.settingsModal.title")}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={32} color={colors.text} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "column", gap: 16 }}>
            {/* LANGUAGE SETTINGS */}
            <View style={{ flexDirection: "column", gap: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <MaterialIcons name="language" size={28} color={colors.text} />
                <Text style={[styles.settingsModalActionText, { fontWeight: 600 }]}>{t("profile.settingsModal.language")}</Text>
              </View>
              <TouchableOpacity onPress={() => changeLanguage("en")} style={styles.settingsModalAction}>
                <Text style={styles.settingsModalActionText}>🇬🇧 English</Text>
                <MaterialIcons name={i18n.language === "en" ? "radio-button-checked" : "radio-button-unchecked"} size={24} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeLanguage("pt")} style={styles.settingsModalAction}>
                <Text style={styles.settingsModalActionText}>🇵🇹 Português</Text>
                <MaterialIcons name={i18n.language === "pt" ? "radio-button-checked" : "radio-button-unchecked"} size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            {/* THEME SETTINGS */}
            <View style={{ flexDirection: "column", gap: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Ionicons name="invert-mode-sharp" size={28} color={colors.text} />
                <Text style={[styles.settingsModalActionText, { fontWeight: 600 }]}>{t("profile.settingsModal.theme")}</Text>
              </View>
              <View style={styles.settingsModalActionTheme}>
                <Text style={styles.settingsModalActionText}>{t("profile.settingsModal.darkModeSwitch")}</Text>
                <Switch
                  onValueChange={() => toggleTheme(currentTheme === "light" ? "dark" : "light")}
                  value={!isSystemTheme && currentTheme === "dark"}
                />
              </View>
              <View style={styles.settingsModalActionTheme}>
                <Text style={styles.settingsModalActionText}>{t("profile.settingsModal.systemModeSwitch")}</Text>
                <Switch
                  onValueChange={() => setSystemTheme()}
                  value={isSystemTheme}
                />
              </View>
              <Text style={{ fontSize: 16, color: colors.grey }}>{t("profile.settingsModal.themeDescription")}</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default SettingsModal