import React, { useEffect, useState, useCallback } from "react";
import { ScrollView, ActivityIndicator, StyleSheet, Text, View } from "react-native";
import BlockNotice from "../../../components/Notice/BlockNotice";
import CardNotice from "../../../components/Notice/CardNotice";
import { noticeApi } from "../../../api/Api";
import COLORS from "../../../constants/colors";
import { useIsFocused } from "@react-navigation/native";
import { useCollege } from "../../../hooks/use-college";

type NoticeItem = {
  title: string;
  subText: string;
  link: string;
};

type NoticeScreenProps = {
  noticeType: "general" | "academic" | "department";
  keyword?: string;
};

const NoticeScreen = ({ noticeType, keyword }: NoticeScreenProps) => {
  const ITEMS_PER_PAGE = 15;
  const isFocused = useIsFocused();
  const { selectedColleges } = useCollege();
  const [blockNotices, setBlockNotices] = useState<NoticeItem[]>([]);
  const [cardNotices, setCardNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  // ✅ 초기 데이터 로드
  const loadInitialData = useCallback(async () => {
    setLoading(true);
    setCurrentPage(0);
    setHasMore(true);

    try {
      let apiResult;
      if (noticeType === "general") {
        apiResult = await noticeApi.getGeneralNotices(0, ITEMS_PER_PAGE, keyword);
      } else if (noticeType === "academic") {
        apiResult = await noticeApi.getAcademicNotices(0, ITEMS_PER_PAGE, keyword);
      } else if (noticeType === "department") {
        apiResult = await noticeApi.getDepartmentNotices(
          Array.from(selectedColleges),
          0,
          ITEMS_PER_PAGE,
          keyword
        );
      }



      // ✅ hot 공지사항 처리 (page 0일 때만)
      const hotNotices = apiResult?.hot || [];
      const mappedHotNotices = hotNotices.map((item) => ({
        title: item.title,
        subText: `${item.department} | ${item.date || item.postedDate} | ${item.viewCount}`,
        link: item.link,
      }));
      setCardNotices(mappedHotNotices);

      // ✅ 일반 공지사항 처리
      const notices = apiResult?.data || apiResult?.content || [];
      const mappedNotices = notices.map((item) => ({
        title: item.title,
        subText: `${item.department} | ${item.date || item.postedDate} | ${item.viewCount}`,
        link: item.link,
      }));

      setBlockNotices(mappedNotices);
      setTotalPages(apiResult?.totalPages || 0);
      setHasMore(apiResult?.totalPages > 1);
    } catch (err) {
      console.error("Error in loadInitialData:", err);
    } finally {
      setLoading(false);
    }
  }, [noticeType, keyword, selectedColleges]);

  // ✅ 추가 데이터 로드
  const loadMoreData = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    const nextPage = currentPage + 1;

    try {
      let apiResult;
      if (noticeType === "general") {
        apiResult = await noticeApi.getGeneralNotices(nextPage, ITEMS_PER_PAGE, keyword);
      } else if (noticeType === "academic") {
        apiResult = await noticeApi.getAcademicNotices(nextPage, ITEMS_PER_PAGE, keyword);
      } else if (noticeType === "department") {
        apiResult = await noticeApi.getDepartmentNotices(
          Array.from(selectedColleges),
          nextPage,
          ITEMS_PER_PAGE,
          keyword
        );
      }

      // ✅ 추가 페이지에서는 hot이 없으므로 일반 공지만 처리
      const notices = apiResult?.data || apiResult?.content || [];
      const mappedNotices = notices.map((item) => ({
        title: item.title,
        subText: `${item.department} | ${item.date || item.postedDate} | ${item.views || ""}`,
        link: item.link,
      }));

      setBlockNotices((prev) => [...prev, ...mappedNotices]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < (apiResult?.totalPages || 0));
    } catch (err) {
      console.error("Error in loadMoreData:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [currentPage, hasMore, loadingMore, noticeType, keyword, selectedColleges]);

  // ✅ 스크롤 이벤트 핸들러
  const handleScroll = useCallback(
    (event: any) => {
      const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
      const paddingToBottom = 20;

      if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
        loadMoreData();
      }
    },
    [loadMoreData]
  );

  useEffect(() => {
    if (isFocused) {
      loadInitialData();
    }
  }, [isFocused, noticeType, keyword, loadInitialData]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.MAIN_BACKGROUND }}
      contentContainerStyle={styles.scrollContainer}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      {loading ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        <>
          {/* ✅ Hot 공지사항들을 CardNotice로 렌더링 */}
          {cardNotices.map((notice, idx) => (
            <CardNotice key={`card-${idx}`} notice={notice} />
          ))}
          {/* ✅ 일반 공지사항들을 BlockNotice로 렌더링 */}
          {blockNotices.map((notice, idx) => (
            <BlockNotice key={`block-${idx}`} notice={notice} />
          ))}
          
          {/* 빈 결과 메시지 */}
          {!loading && cardNotices.length === 0 && blockNotices.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>앗, 조건에 맞는 검색 결과가 없어요 😢</Text>
            </View>
          )}
          
          {loadingMore && <ActivityIndicator size="small" color="gray" style={styles.loadingMore} />}
        </>
      )}
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