import React, { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import BlockNotice from "../../../components/Notice/BlockNotice";
import CardNotice from "../../../components/Notice/CardNotice";

type NoticeItem = {
  title: string;
  subText: string;
};

type NoticeScreenProps = {
  noticeType: "general" | "academic" | "department";
};

const NoticeScreen = ({ noticeType }: NoticeScreenProps) => {
  const [blockNotices, setBlockNotices] = useState<NoticeItem[]>([]);
  const [cardNotices, setCardNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let dummyBlockNotices: NoticeItem[] = [];
        let dummyCardNotices: NoticeItem[] = [];

        switch (noticeType) {
          case "general":
            dummyBlockNotices = [
              {
                title:
                  "[빅데이터혁신융합대학사업단] (경기과기대) 2025년 하계 YBM COS Pro 자격증 2급 특강 개최 안내(선착순 모집)",
                subText: "빅데이터혁신융합대학사업단 | 2025-06-23 | 222 ",
              },
              {
                title:
                  "[차세대통신혁신융합대학사업단] 2025 NCCOSS 프로그램 참여 후기 공모전 안내(~7/31)",
                subText: "차세대통신혁신융합대학사업단 | 2025-06-23 | 206",
              },
              {
                title:
                  "2025 전공 교육과정 만족도 조사 기간연장 안내(~6월 30일까지)",
                subText: "교무과 | 2025-06-23 | 294",
              },
              {
                title:
                  "(사전 공고) 2025학년도 「UOS커리어원정대」프로그램 사전 안내",
                subText: "인재개발실 | 2025-06-23 | 1234 ",
              },
              {
                title:
                  "🔥 [현장실습지원센터] 2025년 2학기 HD현대 채용연계형 현장실습 학생 모집 (~6. 27.)",
                subText: "인재개발실 | 2025-06-23 | 1890",
              },
              {
                title:
                  '📌"AI, 더는 선택이 아닌 생존 스킬"– 취업시장 70% 실무형 AI 인재 선호, 여름방학 단 5일 오프라인 AI스킬 완전정복',
                subText: "인재개발실 | 2025-06-23 | 348  ",
              },
              {
                title: "「서울시립대학교 장학규정」 일부개정 공포",
                subText: "국제교류과 | 2025-06-23 | 164",
              },
              {
                title:
                  "💥미래 창업가를 위한 글로벌 인사이트 신청자 모집, 별별포인트 지급, 모집중",
                subText: "창업지원단 | 2025-06-23 | 1672",
              },
              {
                title: "2025학년도 하계 볼런투어 참가자 모집",
                subText: "글로벌서울사회공헌단 | 2025-06-20 | 3009",
              },
              {
                title: "2025 서울프렌즈(SEOUL FRIENDS) 모집",
                subText: "국제도시개발프로그램 | 2025-06-20 | 7365",
              },
            ];
            dummyCardNotices = [
              {
                title:
                  "🏳️‍🌈 실리콘밸리 멘토(美 본사 Google/Tesla/Apple)와 함께하는 GLOBAL역량강화 교육 신청안내",
                subText: "인재개발실 | 2025-06-23 | 5303",
              },
              {
                title:
                  "📢[현장실습지원센터] 2025학년도 2학기 ICT 학점연계 프로젝트 인턴십 국내과정 학생 모집 안내",
                subText: "인재개발실 | 2025-06-23 | 2959",
              },
              {
                title:
                  "📌[직무역량 레벨업] 탈잉 ➀진짜 현장 엑셀, ②Chat GPT 실무 활용 All in one, ③피그마...",
                subText: "인재개발실 | 2025-06-23 | 5268 ",
              },
            ];
            break;

          case "academic":
            dummyBlockNotices = [
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
                title:
                  "[교직]2025학년도 교직과정 이수신청자 최종면접 일정 안내",
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
            dummyCardNotices = [
              {
                title: "📢2025학년도 제2학기 복학 및 휴학 신청 기간 안내",
                subText: "교무과 | 2025-06-20 | 1443  ",
              },
              {
                title:
                  "[교직]2025학년도 교직과정 이수신청자 최종면접 일정 안내",
                subText: "교무과 | 2025-06-19 | 1188  ",
              },
            ];
            break;

          case "department":
            dummyBlockNotices = [
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
              {
                title:
                  "[학부] 2025학년도 2학기 학생미래설계학기 교과목 시행 안내(자기주도연구 등)",
                subText: "컴퓨터과학부 | 2025-06-10 | 271",
              },
            ];
            dummyCardNotices = [
              {
                title:
                  "[공학인증] ★2025학년도 컴퓨터과학심화프로그램 안내서 공유",
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
            break;
        }

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
  }, [noticeType]);

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

export default NoticeScreen;
