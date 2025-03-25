import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '@/utils/styles/useTheme';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeftCircle, Brain, Sparkles, BookOpen, MessageSquareMore } from 'lucide-react-native';
import { APP_THEME } from '@/utils/config';
import Navbar from '@/components/Navbar';
import { commonStyles } from '@/utils/styles/common';
import { typography } from '@/utils/styles/theme';
import PaidView from '@/components/PaidView';

type Analysis = {
  summary: string;
  keyPoints: string[];
  relatedTopics: string[];
  aiInsights: string;
};

export default function ResultDetail() {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<{
    title: string;
    category: string;
    fullContent: string;
    analysis: Analysis;
  } | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setContent({
          title: 'The History of Quantum Computing',
          category: 'Technology',
          fullContent: 'Quantum computing represents one of the most significant technological leaps in modern computing history. Beginning with theoretical foundations in the 1980s, researchers have pursued the dream of harnessing quantum mechanical phenomena for computational purposes. Unlike classical computers that use bits (0s and 1s), quantum computers utilize quantum bits or qubits, which can exist in multiple states simultaneously through a phenomenon called superposition...',
          analysis: {
            summary: 'A comprehensive exploration of quantum computing evolution, from theoretical concepts to practical applications, highlighting key milestones and future potential.',
            keyPoints: [
              'Introduction of quantum bits (qubits) and superposition',
              'Development of first quantum algorithms',
              'Challenges in maintaining quantum coherence',
              'Recent breakthroughs in quantum error correction'
            ],
            relatedTopics: [
              'Quantum Mechanics',
              'Computer Architecture',
              'Quantum Cryptography',
              'Quantum Algorithms'
            ],
            aiInsights: "The field of quantum computing stands at a pivotal moment. While significant challenges remain in scaling quantum systems, recent breakthroughs in error correction and qubit stability suggest we're approaching a new era of practical quantum applications. The next decade could see quantum computers solving problems in chemistry and materials science that are intractable for classical computers."
          }
        });
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Navbar
          leftIcon={
            <Pressable onPress={() => router.back()}>
              <ArrowLeftCircle stroke={APP_THEME.$primary_color} strokeWidth={1.5} size={30} style={{marginVertical: "auto"}}/>
            </Pressable>
          }
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.text.primary} />
          <Text style={[styles.loadingText, { color: colors.text.secondary }]}>
            Analyzing content...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!content) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Navbar
          leftIcon={
            <Pressable onPress={() => router.back()}>
              <ArrowLeftCircle stroke={APP_THEME.$primary_color} strokeWidth={1.5} size={30} style={{marginVertical: "auto"}}/>
            </Pressable>
          }
        />
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text.secondary }]}>
            Content not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Navbar
        leftIcon={
          <Pressable onPress={() => router.back()}>
            <ArrowLeftCircle stroke={APP_THEME.$primary_color} strokeWidth={1.5} size={30} style={{marginVertical: "auto"}}/>
          </Pressable>
        }
        title={<Text style={[styles.category, { color: colors.text.primary }]}>{content.category}</Text>}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text.primary }]}>
              {content.title}
            </Text>
          </View>

          <View style={[styles.section, { borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <BookOpen size={20} color={colors.text.primary} />
              <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
                Full Content
              </Text>
            </View>
            <Text style={[styles.text, { color: colors.text.primary }]}>
              {content.fullContent}
            </Text>
          </View>

          <View style={[styles.section, { borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <Sparkles size={20} color={colors.text.primary} />
              <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
                Key Points
              </Text>
            </View>
            <PaidView>
              {content.analysis.keyPoints.map((point, index) => (
                <Text key={index} style={[styles.listItem, { color: colors.text.primary }]}>
                  • {point}
                </Text>
              ))}
            </PaidView>
          </View>

          <View style={[styles.section, { borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <MessageSquareMore size={20} color={colors.text.primary} />
              <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
                AI Insights
              </Text>
            </View>
            <PaidView>
              <Text style={[styles.text, { color: colors.text.muted, fontStyle: 'italic', marginBottom: 8 }]}>
                Note: AI analysis may contain inaccuracies. Please verify important information.
              </Text>
              <Text style={[styles.text, { color: colors.text.primary }]}>
                {content.analysis.aiInsights}
              </Text>
            </PaidView>
          </View>

          <View style={styles.relatedTopics}>
            <Text style={[styles.relatedTitle, { color: colors.text.secondary }]}>
              Related Topics
            </Text>
            <View style={styles.topicsList}>
              {content.analysis.relatedTopics.map((topic, index) => (
                <Pressable
                  key={index}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loadingText: {
    ...commonStyles.text,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    ...commonStyles.text,
  },
  header: {
    marginBottom: 24,
  },
  category: {
    ...commonStyles.textMuted,
    fontSize: typography.fontSize.lg,
    textTransform: 'uppercase',
    marginTop: 6
  },
  title: {
    ...commonStyles.title,
    marginTop: 24
  },
  section: {
    marginBottom: 24,
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    ...commonStyles.subtitle,
  },
  text: {
    ...commonStyles.text,
    lineHeight: 24,
  },
  listItem: {
    ...commonStyles.text,
    marginBottom: 8,
  },
  relatedTopics: {
    marginTop: 32,
  },
  relatedTitle: {
    ...commonStyles.subtitle,
    marginBottom: 16,
  },
  topicsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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