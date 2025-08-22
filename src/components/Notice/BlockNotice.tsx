import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";

type NoticeItem = {
  title: string;
  subText: string;
  link: string;
};

const BlockNotice = ({ notice }: { notice: NoticeItem }) => {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(notice.link);
    if (supported) {
      await Linking.openURL(notice.link);
    } else {
      Alert.alert("유효하지 않은 링크입니다.", notice.link);
    }
  };

  return(
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.noticeBlock}>
        <Text style={styles.noticeText}>{notice.title}</Text>
        <Text style={styles.noticeSubText}>{notice.subText}</Text>
      </View>
    </TouchableOpacity>
  );
};

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
