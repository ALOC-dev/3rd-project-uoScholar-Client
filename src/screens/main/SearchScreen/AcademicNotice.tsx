// /screens/Notice/GeneralNotice.tsx
import React, { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import BlockNotice from "../../../components/Notice/BlockNotice";
import CardNotice from "../../../components/Notice/CardNotice";

type NoticeItem = {
  title: string;
  subText: string;
};

const AcademicNotice = () => {
  const [blockNotices, setBlockNotices] = useState<NoticeItem[]>([]);
  const [cardNotices, setCardNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dummyBlockNotices = [
          {
            title: "2025학년도 여름계절수업 [대학영어W] 강의실 변경 안내",

            subText: "교양교육부 | 2025-06-20 | 472  ",
          },
          {
            title:
              "2025학년도 2학기 국내학점교류 안내(포항공과대학교_인공지능혁신융합대학사업단)(~7/9 오전 11시)",
            subText: "인공지능혁신융합대학사업단 | 2025-06-20 | 542",
          },
          {
            title: "[교직]2025학년도 교직과정 이수신청자 최종면접 일정 안내",

            subText: "교무과 | 2025-06-19 | 801  ",
          },
          {
            title: "[교직] 2025학년도 제1학기 산업체현장실습 신청 안내",

            subText: "교무과 | 2025-06-19 | 2104  ",
          },
          {
            title:
              "[마감]📢 2025학년도 여름계절수업 하계스포츠(수상스키) 청강생 모집 안내",

            subText: "교양교육부 | 2025-06-17 | 2290    ",
          },
        ];
        const dummyCardNotices = [
          {
            title: "📢2025학년도 제2학기 복학 및 휴학 신청 기간 안내",
            subText: "교무과 | 2025-06-20 | 1443  ",
          },
          {
            title: "[교직]2025학년도 교직과정 이수신청자 최종면접 일정 안내",
            subText: "교무과 | 2025-06-19 | 1188  ",
          },
        ];
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setBlockNotices(dummyBlockNotices);
        setCardNotices(dummyCardNotices);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1 }}
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

export default AcademicNotice;
