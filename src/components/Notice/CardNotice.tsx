import React from "react";
import { View, Text, StyleSheet } from "react-native";

type NoticeItem = {
  title: string;
  subText: string;
};

const CardNotice = ({ notice }: { notice: NoticeItem }) => (
  <View style={styles.noticeCard}>
    <Text style={styles.noticeText}>{notice.title}</Text>
    <Text style={styles.noticeSubText}>{notice.subText}</Text>
  </View>
);

const styles = StyleSheet.create({
  noticeCard: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noticeText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  noticeSubText: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
});

export default CardNotice;
