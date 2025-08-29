import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AppState,
  InteractionManager,
  Dimensions,
} from "react-native";
import {
  useNavigation,
  DrawerActions,
  useIsFocused,
} from "@react-navigation/native";
import useCollege from "../../hooks/use-college";
import { College, COLLEGE_LABELS } from "../../types/college";
import { useCollegeHydration } from "../../store/use-college-store";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../../navigation/DrawerNavigator";
import IMAGES from "../../assets/index";
import COLORS from "../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomAlert from "../../components/CustomAlert";

interface UserInfo {
  colleges: string[];
}

interface RegisterScreenProps {
  title?: string;
  mode?: "register" | "edit";
  initialUserInfo?: UserInfo;
  onSubmit?: (userInfo: UserInfo) => void;
}

// labels moved to shared type

type RegisterScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "Register"
>;

const RegisterScreen: React.FC<RegisterScreenProps> = ({
  initialUserInfo,
  onSubmit,
}) => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const isFocused = useIsFocused();
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const [userInfo, setUserInfo] = useState<UserInfo>(
    initialUserInfo || {
      colleges: [],
    }
  );

  const [mode, setMode] = useState<"register" | "edit">("register");
  const [title, setTitle] = useState<string>("회원가입");
  const insets = useSafeAreaInsets();
  const { selectedColleges, toggleCollege } = useCollege();
  const { hasHydrated } = useCollegeHydration();

  // 커스텀 알림창 상태
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertButtons, setAlertButtons] = useState<
    Array<{ text: string; onPress?: () => void }>
  >([]);

  // UI용 목록 (코드 + 라벨)
  const colleges = Object.values(College).map((code) => ({
    code,
    label: COLLEGE_LABELS[code as College],
  }));

  // 선택 상태가 바뀔 때 userInfo.colleges를 코드 문자열 배열로 동기화
  useEffect(() => {
    setUserInfo((prev) => ({
      ...prev,
      colleges: Array.from(selectedColleges),
    }));
  }, [selectedColleges]);

  const appStateRef = useRef(AppState.currentState);
  const [isAppActive, setIsAppActive] = useState(true);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      appStateRef.current = nextState;
      setIsAppActive(nextState === "active");
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const showAlertIfPossible = useCallback(
    (
      title: string,
      message?: string,
      buttons?: Array<{ text: string; onPress?: () => void }>
    ) => {
      if (!isFocused || !isAppActive) {
        console.warn(
          "Skip Alert: screen not focused or app not active (Android activity may be detached)."
        );
        return;
      }

      InteractionManager.runAfterInteractions(() => {
        setAlertTitle(title);
        setAlertMessage(message || "");
        setAlertButtons(buttons || [{ text: "확인" }]);
        setAlertVisible(true);
      });
    },
    [isFocused, isAppActive]
  );

  const handleCollegeToggle = (code: College) => {
    toggleCollege(code);
  };

  const handleSubmit = () => {
    if (selectedColleges.size === 0) {
      showAlertIfPossible("오류", "적어도 하나의 대학을 선택해주세요.");
      return;
    }

    if (onSubmit) {
      onSubmit({ ...userInfo, colleges: Array.from(selectedColleges) });
    } else {
      // register 모드에서는 알림 표시 후 Home으로 이동하고 모드를 edit로 변경
      if (mode === "register") {
        showAlertIfPossible(
          "회원가입 완료",
          `선택된 대학: ${Array.from(selectedColleges)
            .map((c) => COLLEGE_LABELS[c as College])
            .join(", ")}`,
          [
            {
              text: "확인",
              onPress: () => {

                setMode("edit");
                setTitle("정보 수정");
                navigation.navigate("Home");
              },
            },
          ]
        );
      } else {
        // edit 모드에서는 알림 표시
        showAlertIfPossible(
          "정보 수정 완료",
          `선택된 대학: ${Array.from(selectedColleges)
            .map((c) => COLLEGE_LABELS[c as College])
            .join(", ")}`,
          [
            {
              text: "확인",
              onPress: () => {

              },
            },
          ]
        );
      }
    }
  };

  // 스토어가 복원(hydrate)된 뒤에, 이미 선택된 대학이 존재하면 모드를 edit로 변경 (최초 로드 시에만)
  useEffect(() => {
    if (!hasHydrated) return;
    // 이미 저장된 대학이 있고, 현재 register 모드라면 edit 모드로 변경 (최초 로드 시에만)
    if (selectedColleges.size > 0 && mode === "register") {
      setMode("edit");
      setTitle("정보 수정");
    }
  }, [hasHydrated, mode]); // selectedColleges.size 제거

  return (
    <View style={styles.container}>
      {mode === "edit" && (
        <View style={{ paddingTop: insets.top + 15 }}>
          {/* 헤더 */}
          <View style={styles.topContainer}>
            {/* 왼쪽 TabIcon */}
            <TouchableOpacity
              style={styles.tabBtn}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Image source={IMAGES.TABICON} style={styles.tabIcon} />
            </TouchableOpacity>

            {/* 중앙 텍스트 */}
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
        </View>
      )}

      {/* 메인 컨텐츠 - 중앙 정렬 */}
      <View style={[styles.centeredContent, { maxWidth: screenWidth * 0.9 }]}>
        {mode === "register" && (
          <View style={styles.registerNoticeContainer}>
            <Text style={[styles.noticeText, { fontSize: Math.min(25, screenWidth * 0.06) }]}>관심 대학을 선택해주세요.</Text>
            <Text style={[styles.subNoticeText, { fontSize: Math.min(20, screenWidth * 0.05) }]}>(중복 선택 가능)</Text>
          </View>
        )}
        {/* 폼 컨텐츠 */}
        <View style={styles.formContainer}>
          {/* 대학 선택 */}
          <View style={styles.inputContainer}>
            <View style={styles.checkboxContainer}>
              {colleges.map((college) => (
                <TouchableOpacity
                  key={college.code}
                  style={[styles.checkboxRow, { paddingVertical: Math.max(12, screenHeight * 0.015) }]}
                  onPress={() => handleCollegeToggle(college.code as College)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      { 
                        width: Math.min(24, screenWidth * 0.06),
                        height: Math.min(24, screenWidth * 0.06),
                      },
                      selectedColleges.has(college.code as College) &&
                        styles.checkboxChecked,
                    ]}
                  ></View>
                  <Text style={[styles.checkboxLabel, { fontSize: Math.min(16, screenWidth * 0.04) }]}>{college.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 제출 버튼 */}
          <TouchableOpacity 
            style={[
              styles.submitButton, 
              { 
                paddingVertical: Math.max(16, screenHeight * 0.02),
                marginTop: Math.max(20, screenHeight * 0.025)
              }
            ]} 
            onPress={handleSubmit}
          >
            <Text style={[styles.submitButtonText, { fontSize: Math.min(18, screenWidth * 0.045) }]}>
              {mode === "register" ? "회원가입" : "정보 수정"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 커스텀 알림창 */}
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        buttons={alertButtons}
        onClose={() => setAlertVisible(false)}
      />
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
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    alignSelf: "center",
    width: "100%",
  },
  tabBtn: {
    position: "absolute",
    left: 10,
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    position: "absolute",
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 32,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  checkboxContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#333",
    borderRadius: 6,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  checkboxChecked: {
    backgroundColor: "#333",
  },
  checkmark: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  submitButton: {
    backgroundColor: "#333",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  registerNoticeContainer: {
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  noticeText: {
    fontSize: 25,
    color: "#333",
    fontWeight: "bold",
  },
  subNoticeText: {
    fontSize: 20,
    color: "#666",
  },
});

export default RegisterScreen;
