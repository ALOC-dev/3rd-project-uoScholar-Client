import React, { useEffect, useState, useCallback } from "react";
import { ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import BlockNotice from "../../../components/Notice/BlockNotice";
import CardNotice from "../../../components/Notice/CardNotice";
import { noticeApi } from "../../../api/Api"; // 추가
import COLORS from "../../../constants/colors";
import { useIsFocused } from "@react-navigation/native";

type NoticeItem = {
  title: string;
  subText: string;
};

type NoticeScreenProps = {
  noticeType: "general" | "academic" | "department";
  keyword?: string;
};

const NoticeScreen = ({ noticeType, keyword }: NoticeScreenProps) => {
  const isFocused = useIsFocused();
  const [blockNotices, setBlockNotices] = useState<NoticeItem[]>([]);
  const [cardNotices, setCardNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  // 초기 데이터 로드
  const loadInitialData = useCallback(async () => {
    console.log("loadInitialData called", { isFocused, noticeType, keyword });

    setLoading(true);
    setCurrentPage(0);
    setHasMore(true);

    try {
      let apiResult;
      if (noticeType === "general") {
        console.log("General Keyword : ", keyword);
        apiResult = await noticeApi.getGeneralNotices(0, 15, keyword);
        console.log("General API Result:", apiResult);
      } else if (noticeType === "academic") {
        console.log("Academic Keyword : ", keyword);
        apiResult = await noticeApi.getAcademicNotices(0, 15, keyword);
        console.log("Academic API Result:", apiResult);
      } else if (noticeType === "department") {
        console.log("Department Keyword : ", keyword);
        apiResult = await noticeApi.getDepartmentNotices(0, 15, keyword);
        console.log("Department API Result:", apiResult);
      }

      console.log("API Result structure:", {
        data: apiResult?.data,
        content: apiResult?.content,
        totalPages: apiResult?.totalPages,
        currentPage: apiResult?.currentPage,
      });

      // API에서 받은 데이터를 화면에 맞게 변환
      const notices = apiResult?.data || apiResult?.content || [];
      console.log("Notices to map:", notices);

      const mappedNotices = notices.map((item) => ({
        title: item.title,
        subText: `${item.department} | ${item.date || item.postedDate} | ${
          item.views || ""
        }`,
      }));

      console.log("Mapped notices:", mappedNotices);
      setBlockNotices(mappedNotices);
      setTotalPages(apiResult?.totalPages || 0);
      setHasMore(apiResult?.totalPages > 1);
    } catch (err) {
      console.error("Error in loadInitialData:", err);
    } finally {
      setLoading(false);
    }
  }, [noticeType, keyword]);

  // 추가 데이터 로드
  const loadMoreData = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    const nextPage = currentPage + 1;

    try {
      let apiResult;
      if (noticeType === "general") {
        apiResult = await noticeApi.getGeneralNotices(nextPage, 15, keyword);
      } else if (noticeType === "academic") {
        apiResult = await noticeApi.getAcademicNotices(nextPage, 15, keyword);
      } else if (noticeType === "department") {
        apiResult = await noticeApi.getDepartmentNotices(nextPage, 15, keyword);
      }

      const notices = apiResult?.data || apiResult?.content || [];
      const mappedNotices = notices.map((item) => ({
        title: item.title,
        subText: `${item.department} | ${item.date || item.postedDate} | ${
          item.views || ""
        }`,
      }));

      setBlockNotices((prev) => [...prev, ...mappedNotices]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < (apiResult?.totalPages || 0));
    } catch (err) {
      console.error("Error in loadMoreData:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [currentPage, hasMore, loadingMore, noticeType, keyword]);

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(
    (event: any) => {
      const { layoutMeasurement, contentOffset, contentSize } =
        event.nativeEvent;
      const paddingToBottom = 20; // 스크롤 끝에서 20px 전에 로드 시작

      if (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      ) {
        loadMoreData();
      }
    },
    [loadMoreData]
  );

  useEffect(() => {
    console.log("useEffect triggered", { isFocused, noticeType, keyword });
    if (isFocused) {
      loadInitialData();
    }
  }, [isFocused, noticeType, keyword, loadInitialData]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.MAIN_BACKGROUND }}
      contentContainerStyle={styles.scrollContainer}
      onScroll={handleScroll}
      scrollEventThrottle={16} // 스크롤 이벤트 최적화
    >
      {loading ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        <>
          {cardNotices.map((notice, idx) => (
            <CardNotice key={`card-${idx}`} notice={notice} />
          ))}
          {blockNotices.map((notice, idx) => (
            <BlockNotice key={`block-${idx}`} notice={notice} />
          ))}
          {loadingMore && (
            <ActivityIndicator
              size="small"
              color="gray"
              style={styles.loadingMore}
            />
          )}
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
