import { useAppThemeColors } from '@/hooks/useAppThemeColors';
import { createStyles } from '@/styles/auth.styles';
import { useSSO } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const Login = () => {
  const colors = useAppThemeColors();
  const { startSSOFlow } = useSSO();
  const router = useRouter();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation("global");

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy: 'oauth_google' });

      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.brandSection}>
        <View style={styles.brandIcon}>
          <Image
            source={require('@/assets/images/adaptive-icon.png')}
            style={{ width: 60, height: 60 }}
            resizeMode='contain'
          />
        </View>
        <Text style={styles.appName}>Socially</Text>
        <Text style={styles.tagline}>{t("auth.tagline")}</Text>
      </View>
      <View style={styles.illustrationContainer}>
        <Image
          source={require('@/assets/images/auth-illustration.png')}
          style={styles.illustration}
          resizeMode='contain'
        />
      </View>
      <View style={styles.loginSection}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.9}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name='logo-google' size={24} color={colors.surface} />
          </View>
          <Text style={styles.googleButtonText}>{t("auth.googleButton")}</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>{t("auth.termsAndPrivacy")}</Text>
      </View>
    </View>
  )
}

export default Login