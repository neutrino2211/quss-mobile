import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Pressable, Text } from 'react-native';
import { useTheme } from '@/utils/styles/useTheme';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeftCircle } from 'lucide-react-native';
import SearchResults, { SearchResult } from '@/components/SearchResults';
import Navbar from '@/components/Navbar';
import { APP_THEME } from '@/utils/config';

export default function SearchScreen() {
  const { colors, colorScheme } = useTheme();
  const router = useRouter();
  const { query } = useLocalSearchParams();
  const [isSearching, setIsSearching] = useState(true);
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const performSearch = async () => {
      try {
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockResults: SearchResult[] = [
          {
            id: '1',
            title: 'The History of Quantum Computing',
            snippet: 'Explore the fascinating journey of quantum computing from its theoretical beginnings to modern practical applications...',
            category: 'Technology',
          },
          {
            id: '2',
            title: 'Understanding Black Holes',
            snippet: 'A comprehensive guide to understanding black holes, their formation, and their impact on our understanding of the universe...',
            category: 'Science',
          },
          {
            id: '3',
            title: 'Ancient Egyptian Architecture',
            snippet: 'Discover the remarkable architectural achievements of ancient Egypt, from the pyramids to the temples...',
            category: 'History',
          },
        ];
        
        setResults(mockResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [query]);

  const handleResultPress = (result: SearchResult) => {
    router.push({
      pathname: "/(home)/result/[id]",
      params: { id: result.id }
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Navbar
        leftIcon={
          <Pressable onPress={() => router.back()}>
            <ArrowLeftCircle stroke={APP_THEME.$primary_color} strokeWidth={1.5} size={30} style={{marginVertical: "auto"}}/>
          </Pressable>
        }
        rightIcon={<Text style={{color: APP_THEME.primary_heading_color(colorScheme), fontSize: 16, fontFamily: "NotoSans-ExtraLight", marginTop: 8}}>Search Results</Text>}
      />
      <View style={styles.content}>
        <SearchResults
          isLoading={isSearching}
          results={results}
          query={query as string}
          onResultPress={handleResultPress}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    maxWidth: 800,
    marginTop: 20,
    width: '100%',
    alignSelf: 'center',
  },
}); 