import { useAppThemeColors } from "@/hooks/useAppThemeColors";
import { createStyles } from "@/styles/feed.styles";
import { useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from 'react-native';

type StoryType = {
  id: string;
  username: string;
  avatar: string;
  hasStory: boolean;
}

export default function Story({ story }: { story: StoryType }) {
  const colors = useAppThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  
  return (
    <TouchableOpacity style={styles.storyWrapper}>
      <View style={[styles.storyRing, !story.hasStory && styles.noStory]}>
        <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
      </View>
      <Text style={styles.storyUsername}>{story.username}</Text>
    </TouchableOpacity>
  )
}
