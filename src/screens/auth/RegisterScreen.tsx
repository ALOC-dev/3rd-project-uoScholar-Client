import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../../navigation/DrawerNavigator";

interface UserInfo {
  name: string;
  grade: string;
  department: string;
}

type RegisterScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "Register"
>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    grade: "",
    department: "",
  });

  const [showGradePicker, setShowGradePicker] = useState(false);
  const [showDepartmentPicker, setShowDepartmentPicker] = useState(false);

  // 학년 옵션
  const gradeOptions = ["1학년", "2학년", "3학년", "4학년", "졸업생"];

  // 학과 옵션
  const departmentOptions = [
    "컴퓨터과학부",
    "전자전기컴퓨터학부",
    "기계정보공학부",
    "건축학부",
    "도시과학대학",
    "경영대학",
    "문과대학",
    "자연과학대학",
    "예술체육대학",
    "미래융합대학",
  ];

  const handleNameChange = (text: string) => {
    setUserInfo((prev) => ({ ...prev, name: text }));
  };

  const handleGradeSelect = (grade: string) => {
    setUserInfo((prev) => ({ ...prev, grade }));
    setShowGradePicker(false);
  };

  const handleDepartmentSelect = (department: string) => {
    setUserInfo((prev) => ({ ...prev, department }));
    setShowDepartmentPicker(false);
  };

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

    Alert.alert(
      "회원가입 완료",
      `이름: ${userInfo.name}\n학년: ${userInfo.grade}\n학과: ${userInfo.department}`,
      [
        {
          text: "확인",
          onPress: () => {
            // 회원가입 정보 저장 및 HomeScreen으로 이동
            console.log("회원가입 정보:", userInfo);
            navigation.navigate("Home");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>회원가입</Text>
          <Text style={styles.subtitle}>사용자 정보를 입력해주세요</Text>
        </View>

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

            {showGradePicker && (
              <View style={styles.pickerContainer}>
                {gradeOptions.map((grade, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.pickerOption}
                    onPress={() => handleGradeSelect(grade)}
                  >
                    <Text style={styles.pickerOptionText}>{grade}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* 학과 선택 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>학과 *</Text>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowDepartmentPicker(!showDepartmentPicker)}
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

            {showDepartmentPicker && (
              <View style={styles.pickerContainer}>
                {departmentOptions.map((department, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.pickerOption}
                    onPress={() => handleDepartmentSelect(department)}
                  >
                    <Text style={styles.pickerOptionText}>{department}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* 제출 버튼 */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
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
    maxHeight: 200,
  },
  pickerOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  pickerOptionText: {
    fontSize: 16,
    color: "#333",
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
