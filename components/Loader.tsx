import { useAppThemeColors } from '@/hooks/useAppThemeColors';
import { ActivityIndicator, View } from 'react-native';

const Loader = () => {
  const colors = useAppThemeColors();
  
  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  )
}

export default Loader