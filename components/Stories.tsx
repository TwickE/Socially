import Story from "@/components/Story";
import { stories } from "@/constants/mock-data";
import { useAppThemeColors } from "@/hooks/useAppThemeColors";
import { createStyles } from "@/styles/feed.styles";
import { useMemo } from "react";
import { ScrollView } from "react-native";

const StoriesSection = () => {
  const colors = useAppThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.storiesContainer}
    >
      {stories.map((story) => (
        <Story key={story.id} story={story} />
      ))}
    </ScrollView>
  )
}

export default StoriesSection;