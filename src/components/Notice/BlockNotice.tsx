import React from "react";
import { View, Text, StyleSheet } from "react-native";

type NoticeItem = {
  title: string;
  subText: string;
};

const BlockNotice = ({ notice }: { notice: NoticeItem }) => (
  <View style={styles.noticeBlock}>
    <Text style={styles.noticeText}>{notice.title}</Text>
    <Text style={styles.noticeSubText}>{notice.subText}</Text>
  </View>
);

const styles = StyleSheet.create({
  noticeBlock: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 8,
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

export default BlockNotice;
