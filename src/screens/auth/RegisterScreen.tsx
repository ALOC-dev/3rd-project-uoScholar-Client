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
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../../navigation/DrawerNavigator";
import IMAGES from "../../assets/index";

interface UserInfo {
  name: string;
  grade: string;
  college: string;
  department: string;
}

interface RegisterScreenProps {
  title?: string;
  subtitle?: string;
  mode?: "register" | "edit";
  initialUserInfo?: UserInfo;
  onSubmit?: (userInfo: UserInfo) => void;
}

interface College {
  name: string;
  departments: string[];
}

type RegisterScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "Register"
>;

const RegisterScreen: React.FC<RegisterScreenProps> = ({
  subtitle = "사용자 정보를 입력해주세요",
  initialUserInfo,
  onSubmit,
}) => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [userInfo, setUserInfo] = useState<UserInfo>(
    initialUserInfo || {
      name: "",
      grade: "",
      college: "",
      department: "",
    }
  );

  const [showGradePicker, setShowGradePicker] = useState(false);
  const [showCollegePicker, setShowCollegePicker] = useState(false);
  const [selectedCollegeIndex, setSelectedCollegeIndex] = useState<
    number | null
  >(null);
  const [mode, setMode] = useState<"register" | "edit">("register");
  const [title, setTitle] = useState<string>("회원가입");

  // 학년 옵션
  const gradeOptions = ["1학년", "2학년", "3학년", "4학년", "졸업생"];

  const colleges: College[] = [
    {
      name: "정경대학",
      departments: [
        "경제학부",
        "사회복지학과",
        "국제관계학과",
        "세무학과",
        "행정학과",
      ],
    },
    {
      name: "경영대학",
      departments: ["경영학부"],
    },
    {
      name: "공과대학",
      departments: [
        "기계정보공학과",
        "신소재공학과",
        "인공지능학과",
        "전기전자컴퓨터공학부",
        "토목공학과",
        "컴퓨터과학부",
        "화학공학과",
      ],
    },
    {
      name: "인문대학",
      departments: [
        "국사학과",
        "국어국문학과",
        "영어영문학과",
        "중국어문화학과",
        "철학과",
      ],
    },
    {
      name: "자연과학대학",
      departments: [
        "물리학과",
        "생명과학과",
        "수학과",
        "융합응용화학과",
        "통계학과",
        "환경원예학과",
      ],
    },
    {
      name: "도시과학대학",
      departments: [
        "건축학부",
        "공간정보공학과",
        "교통공학과",
        "도시공학과",
        "도시사회학과",
        "도시행정학과",
        "소방방재학과",
        "조경학과",
        "환경공학부",
      ],
    },
    {
      name: "예술체육대학",
      departments: ["디자인학과", "스포츠과학과", "음악학과", "조각학과"],
    },
    {
      name: "자유융합대학",
      departments: ["융합전공학부", "자유전공학부", "교양교육부"],
    },
  ];

  // userInfo 에서 name 속성만 text로 교체!
  const handleNameChange = (text: string) => {
    setUserInfo((prev) => ({ ...prev, name: text }));
  };

  const handleGradeSelect = (grade: string) => {
    setUserInfo((prev) => ({ ...prev, grade }));
    setShowGradePicker(false);
  };

  const handleCollegeSelect = (collegeName: string) => {
    const index = colleges.findIndex((c) => c.name === collegeName);
    setSelectedCollegeIndex(index >= 0 ? index : null);
    setUserInfo((prev) => ({
      ...prev,
      college: collegeName,
      department: "",
    }));
  };

  const handleDepartmentSelect = (department: string) => {
    setUserInfo((prev) => ({ ...prev, department }));
    setShowCollegePicker(false);
    setSelectedCollegeIndex(null);
  };
  // 에러 처리
  const handleSubmit = () => {
    if (!userInfo.name.trim()) {
      Alert.alert("오류", "이름을 입력해주세요.");
      return;
    }
    if (!userInfo.grade) {
      Alert.alert("오류", "학년을 선택해주세요.");
      return;
    }
    if (!userInfo.department) {
      Alert.alert("오류", "학과를 선택해주세요.");
      return;
    }

    if (onSubmit) {
      onSubmit(userInfo);
    } else {
      Alert.alert(
        mode === "register" ? "회원가입 완료" : "정보 수정 완료",
        `이름: ${userInfo.name}\n학년: ${userInfo.grade}\n대학: ${userInfo.college}\n학과: ${userInfo.department}`,
        [
          {
            text: "확인",
            onPress: () => {
              console.log(
                `${mode === "register" ? "회원가입" : "정보 수정"} 정보:`,
                userInfo
              );
              navigation.navigate("Home");
              // 네비게이션 후 상태 업데이트
              setMode("edit");
              setTitle("정보 수정");
            },
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 컨텐츠 */}
      <View style={styles.header}>
        {/*뒤로가기 버튼 */}
        {mode === "edit" && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={IMAGES.BACKWARD} style={styles.backIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.headerContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
      {/* 폼 컨텐츠 */}
      <View style={styles.formContainer}>
        {/* 이름 입력 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>이름 *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="이름을 입력하세요"
            value={userInfo.name}
            onChangeText={handleNameChange}
            autoCapitalize="words"
          />
        </View>

        {/* 학년 선택 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>학년 *</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowGradePicker(!showGradePicker)}
          >
            <Text
              style={[
                styles.pickerButtonText,
                !userInfo.grade && styles.placeholderText,
              ]}
            >
              {userInfo.grade || "학년을 선택하세요"}
            </Text>
            <Text style={styles.arrow}>▼</Text>
          </TouchableOpacity>

          {/*학년 선택 드롭다운 */}
          {showGradePicker && (
            <FlatList
              data={gradeOptions}
              style={styles.pickerContainer}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  style={styles.pickerOption}
                  onPress={() => handleGradeSelect(item)}
                >
                  <Text style={styles.pickerOptionText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={true}
            />
          )}
        </View>

        {/* 학과 선택 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>학과 *</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowCollegePicker(!showCollegePicker)}
          >
            <Text
              style={[
                styles.pickerButtonText,
                !userInfo.department && styles.placeholderText,
              ]}
            >
              {userInfo.department || "학과를 선택하세요"}
            </Text>
            <Text style={styles.arrow}>▼</Text>
          </TouchableOpacity>

          {showCollegePicker && (
            <View style={[styles.pickerContainer, styles.dualPickerContainer]}>
              <View style={styles.collegeListContainer}>
                <ScrollView>
                  {colleges.map((college, index) => (
                    <TouchableOpacity
                      key={college.name}
                      style={[
                        styles.pickerOption,
                        selectedCollegeIndex === index && styles.selectedOption,
                      ]}
                      onPress={() => handleCollegeSelect(college.name)}
                    >
                      <Text style={styles.pickerOptionText}>
                        {college.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View style={styles.departmentListContainer}>
                {selectedCollegeIndex !== null ? (
                  <ScrollView>
                    {colleges[selectedCollegeIndex].departments.map((dept) => (
                      <TouchableOpacity
                        key={dept}
                        style={styles.pickerOption}
                        onPress={() => handleDepartmentSelect(dept)}
                      >
                        <Text style={styles.pickerOptionText}>{dept}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                ) : (
                  <View style={styles.emptyDepartmentContainer}>
                    <Text style={styles.placeholderText}>
                      왼쪽에서 대학을 선택하세요
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>

        {/* 제출 버튼 */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            {mode === "register" ? "회원가입" : "정보 수정"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: "#007AFF",
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  pickerButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerButtonText: {
    fontSize: 16,
    color: "#333",
  },
  placeholderText: {
    color: "#999",
  },
  arrow: {
    fontSize: 12,
    color: "#666",
  },
  pickerContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 220,
  },
  dualPickerContainer: {
    flexDirection: "row",
  },
  collegeListContainer: {
    width: "50%",
    borderRightWidth: 1,
    borderRightColor: "#f0f0f0",
  },
  departmentListContainer: {
    width: "50%",
  },
  pickerOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  selectedOption: {
    backgroundColor: "#F2F7FF",
  },
  pickerOptionText: {
    fontSize: 16,
    color: "#333",
  },
  emptyDepartmentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default RegisterScreen;
