import React, { useEffect, useState, useCallback } from "react";
import { ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import BlockNotice from "../../../components/Notice/BlockNotice";
import CardNotice from "../../../components/Notice/CardNotice";
import { noticeApi } from "../../../api/Api";
import COLORS from "../../../constants/colors";
import { useIsFocused } from "@react-navigation/native";
import { useCollege } from "../../../hooks/use-college";

type NoticeItem = {
  title: string;
  subText: string;
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
    console.log("loadInitialData called", { isFocused, noticeType, keyword });

    setLoading(true);
    setCurrentPage(0);
    setHasMore(true);

    try {
      let apiResult;
      if (noticeType === "general") {
        console.log("General Keyword : ", keyword);
        apiResult = await noticeApi.getGeneralNotices(0, ITEMS_PER_PAGE, keyword);
      } else if (noticeType === "academic") {
        console.log("Academic Keyword : ", keyword);
        apiResult = await noticeApi.getAcademicNotices(0, ITEMS_PER_PAGE, keyword);
      } else if (noticeType === "department") {
        console.log("Department Keyword : ", keyword);
        apiResult = await noticeApi.getDepartmentNotices(
          Array.from(selectedColleges),
          0,
          ITEMS_PER_PAGE,
          keyword
        );
      }

      console.log("API Result structure:", {
        data: apiResult?.data,
        content: apiResult?.content,
        hot: apiResult?.hot,
        totalPages: apiResult?.totalPages,
        currentPage: apiResult?.currentPage,
      });

      // ✅ hot 공지사항 처리 (page 0일 때만)
      const hotNotices = apiResult?.hot || [];
      const mappedHotNotices = hotNotices.map((item) => ({
        title: item.title,
        subText: `${item.department} | ${item.date || item.postedDate} | ${item.viewCount || ""}`,
      }));
      setCardNotices(mappedHotNotices);

      // ✅ 일반 공지사항 처리
      const notices = apiResult?.data || apiResult?.content || [];
      const mappedNotices = notices.map((item) => ({
        title: item.title,
        subText: `${item.department} | ${item.date || item.postedDate} | ${item.viewCount || ""}`,
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
    console.log("useEffect triggered", { isFocused, noticeType, keyword, selectedColleges });
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
});

export default NoticeScreen;