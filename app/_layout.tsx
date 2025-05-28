import InitialLayout from "@/components/initialLayout";
import ModalOverlay from "@/components/ModalOverlay";
import { LanguageProvider } from "@/context/LanguageContext";
import { ModalOverlayProvider } from "@/context/ModalOverlayContext";
import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";
import { colors } from "@/styles/theme";
import global_en from "@/translations/en/global.json";
import global_pt from "@/translations/pt/global.json";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import i18next from "i18next";
import { useCallback, useEffect } from "react";
import { I18nextProvider } from 'react-i18next';
import { Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 400,
  fade: true,
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Medium": require("@/assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(colors.background);
      NavigationBar.setButtonStyleAsync('light');
    }
  }, []);

  i18next.init({
    fallbackLng: "en",
    resources: {
      en: {
        global: global_en
      },
      pt: {
        global: global_pt
      }
    }
  });

  return (
    <ClerkAndConvexProvider>
      <I18nextProvider i18n={i18next}>
        <LanguageProvider>
          <ModalOverlayProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} onLayout={onLayoutRootView}>
              <InitialLayout />
              <ModalOverlay />
            </SafeAreaView>
          </SafeAreaProvider>
        </ModalOverlayProvider>
        </LanguageProvider>
      </I18nextProvider>
      <StatusBar style="light" />
    </ClerkAndConvexProvider>
  );
}