import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import { useTheme } from '@/utils/styles/useTheme';
import { commonStyles } from '@/utils/styles/common';
import { ArrowRight } from 'lucide-react-native';
import { spacing } from '@/utils/styles/theme';

export type SearchResult = {
  id: string;
  title: string;
  snippet: string;
  category: string;
};

type SearchResultsProps = {
  isLoading: boolean;
  results: SearchResult[];
  query: string;
  onResultPress: (result: SearchResult) => void;
};

export default function SearchResults({ isLoading, results, query, onResultPress }: SearchResultsProps) {
  const { colors, spacing } = useTheme();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.text.primary} />
        <Text style={[styles.loadingText, { color: colors.text.secondary }]}>
          Searching for "{query}"...
        </Text>
      </View>
    );
  }

  if (results.length === 0 && query) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
          No results found for "{query}"
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {results.map((result) => (
        <Pressable
          key={result.id}
          style={[
            styles.resultCard,
            {
              backgroundColor: colors.muted,
              borderColor: colors.border,
            },
          ]}
          onPress={() => onResultPress(result)}
        >
          <View style={styles.resultContent}>
            <View style={styles.resultHeader}>
              <Text style={[styles.category, { color: colors.text.secondary }]}>
                {result.category}
              </Text>
              <ArrowRight size={16} color={colors.text.secondary} />
            </View>
            <Text style={[styles.title, { color: colors.text.primary }]}>
              {result.title}
            </Text>
            <Text
              style={[styles.snippet, { color: colors.text.secondary }]}
              numberOfLines={2}
            >
              {result.snippet}
            </Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 12,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    gap: 16,
  },
  loadingText: {
    ...commonStyles.text,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    ...commonStyles.text,
  },
  resultCard: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  resultContent: {
    padding: 16,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    ...commonStyles.textMuted,
    textTransform: 'uppercase',
  },
  title: {
    ...commonStyles.subtitle,
    marginBottom: 8,
  },
  snippet: {
    ...commonStyles.text,
  },
}); 