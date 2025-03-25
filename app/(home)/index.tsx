import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Keyboard, TouchableWithoutFeedback, Pressable, useColorScheme, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '@/utils/styles/useTheme';
import { commonStyles } from '@/utils/styles/common';
import { Search, CircleUserRound, Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { APP_THEME } from '@/utils/config';
import { Image } from 'expo-image';
import Navbar from '@/components/Navbar';

export default function Home() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const windowWidth = Dimensions.get('window').width;
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    router.replace('/(auth)/sign-in');
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    router.push({
      pathname: "/(home)/search",
      params: { query: searchQuery }
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <Navbar
        leftIcon={
          <Pressable onPress={() => {
            router.push("/(home)/account");
          }}>
            <CircleUserRound stroke={APP_THEME.$primary_color} strokeWidth={1.5} size={30} style={{marginVertical: "auto"}}/>
          </Pressable>
        }
        title={<Image source={require('../../assets/images/QUSS-Logo-Light-Outline.png')} style={{width: 25, height: 40}} />}
        rightIcon={
          <Pressable onPress={() => {
            router.push("/(home)/settings");
          }}>
            <Settings stroke={APP_THEME.$primary_color} strokeWidth={1.5} size={30} style={{marginVertical: "auto"}}/>
          </Pressable>
        }
      />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.contentContainer}>
            <Text style={[styles.tagline, { color: colors.text.primary }]}>
              What are you curious about today?
            </Text>
            <View style={[
              styles.searchContainer,
              { 
                backgroundColor: colors.muted,
                borderColor: colors.border,
                width: windowWidth > 768 ? '70%' : '90%'
              }
            ]}>
              <Search size={24} color={colors.text.muted} style={styles.searchIcon} />
              <TextInput
                style={[
                  styles.searchInput,
                  { color: colors.text.primary }
                ]}
                placeholder="Search for anything..."
                placeholderTextColor={colors.text.muted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
              />
            </View>
            
            <View style={styles.topicsContainer}>
              <Text style={[styles.topicsTitle, { color: colors.text.secondary }]}>
                Recommended Searches
              </Text>
              <View style={styles.topicsList}>
                {['Technology', 'Science', 'History', 'Arts'].map((topic) => (
                  <Pressable
                    key={topic}
                    onPress={() => {
                      router.push({
                        pathname: "/(home)/search",
                        params: { query: topic }
                      });
                    }}
                    style={[
                      styles.topicChip,
                      { 
                        backgroundColor: colors.muted,
                        borderColor: colors.border
                      }
                    ]}
                  >
                    <Text style={[styles.topicText, { color: colors.text.primary }]}>
                      {topic}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    width: '100%',
  },
  tagline: {
    ...commonStyles.title,
    textAlign: 'center',
    marginBottom: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 40,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'NotoSans',
  },
  topicsContainer: {
    alignItems: 'center',
    width: '100%',
  },
  topicsTitle: {
    ...commonStyles.subtitle,
    marginBottom: 16,
  },
  topicsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  topicChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  topicText: {
    ...commonStyles.text,
  },
});