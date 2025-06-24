// /screens/Notice/GeneralNotice.tsx
import React, { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import BlockNotice from "../../../components/Notice/BlockNotice";
import CardNotice from "../../../components/Notice/CardNotice";

type NoticeItem = {
  title: string;
  subText: string;
};

const GeneralNotice = () => {
  const [blockNotices, setBlockNotices] = useState<NoticeItem[]>([]);
  const [cardNotices, setCardNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dummyBlockNotices = [
          {
            title:
              "시큐리티아카데미 '기업형(SK쉴더스트랙)' 6기 신청 안내 (~7월 6일(일))",

            subText: "컴퓨터과학부 | 2025-06-23 | 32  ",
          },
          {
            title:
              "[학부] ICT 학점연계 프로젝트 인턴십 국내과정 참여 희망 신청 안내",

            subText: "컴퓨터과학부 | 2025-06-23 | 34",
          },
          {
            title: "[학부] 2025-2 학기 복학 및 휴학 신청 안내",

            subText: "컴퓨터과학부 | 2025-06-23 | 5",
          },
          {
            title: "[학부] 학과 특강 안내(6/18(수) 17:00,정보기술관 110호)",

            subText: "컴퓨터과학부 | 2025-06-13 | 383",
          },
        ];
        const dummyCardNotices = [
          {
            title: "[공학인증] ★2025학년도 컴퓨터과학심화프로그램 안내서 공유",
            subText: "공학교육혁신센터 | 2025-06-09 | 567",
          },
          {
            title: "[학부] 공결 신청 안내 (차세대 정보시스템 전산 신청)",
            subText: "컴퓨터과학부 | 2025-02-27 | 492",
          },
          {
            title: "[필독] 2025학년도 교과과정 개편 안내(수정)",
            subText: "컴퓨터과학부 | 2025-01-24 | 1585 ",
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

export default GeneralNotice;
