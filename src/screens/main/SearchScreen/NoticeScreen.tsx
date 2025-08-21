import React, { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import BlockNotice from "../../../components/Notice/BlockNotice";
import CardNotice from "../../../components/Notice/CardNotice";
import { noticeApi } from "../../../api/Api"; // 추가
import COLORS from "../../../constants/colors";
import { useIsFocused } from '@react-navigation/native';

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

  useEffect(() => {
    if (!isFocused) return;
    const fetchData = async () => {
      try {
        let apiResult;
        if (noticeType === "general") {
          console.log("General Keyword : ", keyword);
          apiResult = await noticeApi.getGeneralNotices(0, 15, keyword);
          console.log(apiResult);
        } else if (noticeType === "academic") {
          console.log("Academic Keyword : ", keyword);
          apiResult = await noticeApi.getAcademicNotices(0, 15, keyword);
          console.log(apiResult);
        } else if (noticeType === "department") {
          console.log("Department Keyword : ", keyword);
          apiResult = await noticeApi.getDepartmentNotices(0, 15, keyword);
          console.log(apiResult);
        }

        // API에서 받은 데이터를 화면에 맞게 변환
        const notices = apiResult?.content || [];
        const mappedNotices = notices.map((item) => ({
          title: item.title,
          subText: `${item.department} | ${item.date || item.postedDate} | ${item.views || ''}`,
        }));

        setBlockNotices(mappedNotices);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [noticeType, keyword, isFocused]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.MAIN_BACKGROUND }}
      contentContainerStyle={styles.scrollContainer}
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
});

export default NoticeScreen;