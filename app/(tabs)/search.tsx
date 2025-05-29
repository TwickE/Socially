import Loader from '@/components/Loader';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { styles } from '@/styles/search.styles';
import { colors } from '@/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Search = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const { t } = useTranslation("global");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const searchResults = useQuery(
    api.users.searchUsersByUsername,
    debouncedSearchTerm.length >= 2 ? { searchQuery: debouncedSearchTerm } : "skip"
  );

  const handleClearSearch = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
  }

  const renderResults = () => {
    if (searchResults === undefined && debouncedSearchTerm.length >= 2) {
      return <Loader />;
    }

    if (searchResults && searchResults.length === 0 && debouncedSearchTerm.length >= 2) {
      return <Text style={styles.infoText}>{t("search.noResults", {term: debouncedSearchTerm})}</Text>;
    }

    if (searchResults && searchResults.length > 0) {
      return (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => <UserListItem user={item} />}
          keyExtractor={(item) => item._id.toString()}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      );
    }

    return null;
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("search.title")}</Text>
        <View style={{ width: 24 }} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* SEARCH BAR */}
        <View style={styles.searchInput}>
          <TextInput
            style={styles.input}
            placeholder={t("search.inputPlaceholder")}
            placeholderTextColor={colors.grey}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <TouchableOpacity style={searchTerm === "" ? styles.hidden : ""} onPress={handleClearSearch}>
            <Ionicons name='close-circle-outline' size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
        {/* SEARCH RESULTS */}
        <View style={{ flex: 1 }}>
          {renderResults()}
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default Search

function UserListItem({ user }: { user: Doc<"users">; }) {
  return (
    <Link href={`/user/${user._id}`} asChild>
      <TouchableOpacity style={styles.itemContainer}>
        <Image
          source={{ uri: user.image }}
          style={styles.avatar}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.containerText}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.fullname}>{user.fullname}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  )
}