import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../../navigation/DrawerNavigator";
import IMAGES from "../../assets/index";
import COLORS from "../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface UserInfo {
  colleges: string[];
}

interface RegisterScreenProps {
  title?: string;
  mode?: "register" | "edit";
  initialUserInfo?: UserInfo;
  onSubmit?: (userInfo: UserInfo) => void;
}

interface College {
  name: string;
}

type RegisterScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "Register"
>;

const RegisterScreen: React.FC<RegisterScreenProps> = ({
  initialUserInfo,
  onSubmit,
}) => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [userInfo, setUserInfo] = useState<UserInfo>(
    initialUserInfo || {
      colleges: [],
    }
  );

  const [mode, setMode] = useState<"register" | "edit">("register");
  const [title, setTitle] = useState<string>("회원가입");
  const insets = useSafeAreaInsets();

  const colleges: College[] = [
    { name: "정경대학" },
    { name: "경영대학" },
    { name: "공과대학" },
    { name: "인문대학" },
    { name: "자연과학대학" },
    { name: "도시과학대학" },
    { name: "예술체육대학" },
    { name: "자유융합대학" },
  ];

  const handleCollegeToggle = (collegeName: string) => {
    setUserInfo((prev) => {
      const isSelected = prev.colleges.includes(collegeName);
      if (isSelected) {
        return {
          ...prev,
          colleges: prev.colleges.filter(college => college !== collegeName)
        };
      } else {
        return {
          ...prev,
          colleges: [...prev.colleges, collegeName]
        };
      }
    });
  };

  const handleSubmit = () => {
    if (userInfo.colleges.length === 0) {
      Alert.alert("오류", "적어도 하나의 대학을 선택해주세요.");
      return;
    }

    if (onSubmit) {
      onSubmit(userInfo);
    } else {
      Alert.alert(
        mode === "register" ? "회원가입 완료" : "정보 수정 완료",
        `선택된 대학: ${userInfo.colleges.join(", ")}`,
        [
          {
            text: "확인",
            onPress: () => {
              console.log(
                `${mode === "register" ? "회원가입" : "정보 수정"} 정보:`,
                userInfo
              );

              // title이 '회원가입'일 때만 Home으로 이동
              if (title === "회원가입") {
                navigation.navigate("Home");
              }

              setMode("edit");
              setTitle("정보 수정");
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      {mode === "edit" && (
        <View style={{ paddingTop: insets.top }}>
          <View style={styles.topContainer}>
            {/* 왼쪽 TabIcon */}
            <TouchableOpacity
              style={styles.tabBtn}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Image source={IMAGES.TABICON} style={styles.tabIcon} />
            </TouchableOpacity>

            {/* 중앙 텍스트 */}
            <Text style={styles.headerTitle}>마이 페이지</Text>
          </View>
        </View>
      )}
      
      {/* 메인 컨텐츠 - 중앙 정렬 */}
      <View style={styles.centeredContent}>
        {mode === "register" && (
          <View style={styles.registerNoticeContainer}>
            <Text style={styles.noticeText}>
              관심 대학을 선택해주세요.
            </Text>
            <Text style={styles.subNoticeText}>
              (중복 선택 가능)
            </Text>
          </View>
        )}
        {/* 폼 컨텐츠 */}
        <View style={styles.formContainer}>
          {/* 대학 선택 */}
          <View style={styles.inputContainer}>
            <View style={styles.checkboxContainer}>
              {colleges.map((college) => (
                <TouchableOpacity
                  key={college.name}
                  style={styles.checkboxRow}
                  onPress={() => handleCollegeToggle(college.name)}
                >
                  <View style={styles.checkbox}>
                    {userInfo.colleges.includes(college.name) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>{college.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 제출 버튼 */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>
              {mode === "register" ? "회원가입" : "정보 수정"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.MAIN_BACKGROUND,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    position: "relative",
    backgroundColor: COLORS.HEADER_BACKGROUND,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  tabBtn: {
    position: "absolute",
    left: 10,
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 32,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  checkboxContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 6,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  checkmark: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  registerNoticeContainer: {
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  noticeText: {
    fontSize: 25,
    color: "#666",
    fontWeight: 'bold',
  },
  subNoticeText: {
    fontSize: 20,
    color: "#666",
  }
});

export default RegisterScreen;