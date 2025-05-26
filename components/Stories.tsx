import Story from "@/components/Story";
import { stories } from "@/constants/mock-data";
import { styles } from "@/styles/feed.styles";
import { ScrollView } from "react-native";

const StoriesSection = () => {
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