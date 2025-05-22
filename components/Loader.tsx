import { colors } from '@/constants/theme';
import { ActivityIndicator, View } from 'react-native';

const Loader = () => {
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