import React, { useEffect, useState, useCallback } from "react";
import { ScrollView, ActivityIndicator, StyleSheet, Text, View } from "react-native";
import BlockNotice from "../../../components/Notice/BlockNotice";
import CardNotice from "../../../components/Notice/CardNotice";
import { noticeApi } from "../../../api/Api";
import COLORS from "../../../constants/colors";
import { useIsFocused } from "@react-navigation/native";
import { useCollege } from "../../../hooks/use-college";

// Types
type NoticeItem = {
  title: string;
  subText: string;
  link: string;
};

type NoticeScreenProps = {
  noticeType: "general" | "academic" | "department";
  keyword?: string;
};

type ApiResult = {
  data?: any[];
  content?: any[];
  hot?: any[];
  totalPages?: number;
};

// Constants
const ITEMS_PER_PAGE = 15;
const SCROLL_PADDING_TO_BOTTOM = 20;

const NoticeScreen = ({ noticeType, keyword }: NoticeScreenProps) => {
  const isFocused = useIsFocused();
  const { selectedColleges } = useCollege();
  
  // State
  const [blockNotices, setBlockNotices] = useState<NoticeItem[]>([]);
  const [cardNotices, setCardNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  // Helper functions
  const mapNoticeToItem = (item: any): NoticeItem => ({
    title: item.title,
    subText: `${item.department} | ${item.date || item.postedDate} | ${item.viewCount || item.views || ""}`,
    link: item.link,
  });

  const fetchNotices = async (page: number): Promise<ApiResult> => {
    switch (noticeType) {
      case "general":
        return await noticeApi.getGeneralNotices(page, ITEMS_PER_PAGE, keyword);
      case "academic":
        return await noticeApi.getAcademicNotices(page, ITEMS_PER_PAGE, keyword);
      case "department":
        return await noticeApi.getDepartmentNotices(Array.from(selectedColleges), page, ITEMS_PER_PAGE, keyword);
      default:
        throw new Error(`Unknown notice type: ${noticeType}`);
    }
  };

  const processApiResult = (apiResult: ApiResult, isInitialLoad: boolean = false, currentPage: number = 0) => {
    // Process hot notices (only for initial load)
    if (isInitialLoad) {
      const hotNotices = apiResult?.hot || [];
      const mappedHotNotices = hotNotices.map(mapNoticeToItem);
      setCardNotices(mappedHotNotices);
    }

    // Process regular notices
    const notices = apiResult?.data || apiResult?.content || [];
    const mappedNotices = notices.map(mapNoticeToItem);
    
    if (isInitialLoad) {
      setBlockNotices(mappedNotices);
    } else {
      setBlockNotices(prev => [...prev, ...mappedNotices]);
    }

    // Update pagination state
    const totalPages = apiResult?.totalPages || 0;
    setTotalPages(totalPages);
    setHasMore(currentPage < totalPages);
  };

  // Data loading functions
  const loadInitialData = useCallback(async () => {
    setLoading(true);
    setCurrentPage(0);
    setHasMore(true);

    try {
      const apiResult = await fetchNotices(0);
      processApiResult(apiResult, true, 0);
    } catch (error) {
      console.error("Error in loadInitialData:", error);
      // TODO: Add user-friendly error handling
    } finally {
      setLoading(false);
    }
  }, [noticeType, keyword, selectedColleges]);

  const loadMoreData = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    const nextPage = currentPage + 1;

    try {
      const apiResult = await fetchNotices(nextPage);
      processApiResult(apiResult, false, nextPage);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error in loadMoreData:", error);
      // TODO: Add user-friendly error handling
    } finally {
      setLoadingMore(false);
    }
  }, [currentPage, hasMore, loadingMore, noticeType, keyword, selectedColleges]);

  // Scroll handler
  const handleScroll = useCallback(
    (event: any) => {
      const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

      if (layoutMeasurement.height + contentOffset.y >= contentSize.height - SCROLL_PADDING_TO_BOTTOM) {
        loadMoreData();
      }
    },
    [loadMoreData]
  );

  // Effects
  useEffect(() => {
    if (isFocused) {
      loadInitialData();
    }
  }, [isFocused, noticeType, keyword, loadInitialData]);

  // Render functions
  const renderHotNotices = () => (
    cardNotices.map((notice, idx) => (
      <CardNotice key={`card-${idx}`} notice={notice} />
    ))
  );

  const renderRegularNotices = () => (
    blockNotices.map((notice, idx) => (
      <BlockNotice key={`block-${idx}`} notice={notice} />
    ))
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>앗, 조건에 맞는 검색 결과가 없어요 😢</Text>
    </View>
  );

  const renderLoadingMore = () => (
    loadingMore && <ActivityIndicator size="small" color="gray" style={styles.loadingMore} />
  );

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="gray" />;
    }

    const hasNoResults = cardNotices.length === 0 && blockNotices.length === 0;

    return (
      <>
        {renderHotNotices()}
        {renderRegularNotices()}
        {hasNoResults && renderEmptyState()}
        {renderLoadingMore()}
      </>
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.MAIN_BACKGROUND }}
      contentContainerStyle={styles.scrollContainer}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      {renderContent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  loadingMore: {
    marginVertical: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    minHeight: 400,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default NoticeScreen;