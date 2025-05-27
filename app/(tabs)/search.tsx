import { styles } from '@/styles/search.styles';
import { colors } from '@/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Search = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={{ width: 24 }} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{}}
      >
        {/* SEARCH BAR */}
        <View style={styles.searchInput}>
          <TextInput
            style={styles.input}
            placeholder="Search for a user"
            placeholderTextColor={colors.grey}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <TouchableOpacity style={searchTerm === "" ? styles.hidden : ""} onPress={() => setSearchTerm("")}>
            <Ionicons name='close-circle-outline' size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
      {/* <FlatList
        data={notifications}
        renderItem={({ item }) => <Notification notification={item} />}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      /> */}
    </View>
  )
}

export default Search