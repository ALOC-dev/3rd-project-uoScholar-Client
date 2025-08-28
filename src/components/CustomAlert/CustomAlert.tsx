import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";

interface AlertButton {
  text: string;
  onPress?: () => void;
}

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message?: string;
  buttons?: AlertButton[];
  onClose: () => void;
}

const { width: screenWidth } = Dimensions.get("window");

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  buttons = [{ text: "확인" }],
  onClose,
}) => {
  const handleButtonPress = (button: AlertButton) => {
    if (button.onPress) {
      button.onPress();
    }
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          {/* 제목 */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>

          {/* 메시지 */}
          {message && (
            <View style={styles.messageContainer}>
              <Text style={styles.message}>{message}</Text>
            </View>
          )}

          {/* 버튼들 */}
          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  index === 0 && buttons.length === 1 && styles.singleButton,
                  index === 0 && buttons.length > 1 && styles.firstButton,
                  index > 0 &&
                    index < buttons.length - 1 &&
                    styles.middleButton,
                  index === buttons.length - 1 &&
                    buttons.length > 1 &&
                    styles.lastButton,
                ]}
                onPress={() => handleButtonPress(button)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.buttonText,
                    index === buttons.length - 1 &&
                      buttons.length > 1 &&
                      styles.cancelButtonText,
                  ]}
                >
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  alertContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    width: Math.min(screenWidth - 40, 320),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  titleContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    lineHeight: 22,
  },
  messageContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  message: {
    fontSize: 13,
    color: "#666666",
    textAlign: "center",
    lineHeight: 18,
  },
  buttonContainer: {
    borderTopWidth: 0.5,
    borderTopColor: "#C7C7CC",
  },
  button: {
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  singleButton: {
    borderTopWidth: 0,
  },
  firstButton: {
    borderTopWidth: 0,
  },
  middleButton: {
    borderTopWidth: 0.5,
    borderTopColor: "#C7C7CC",
  },
  lastButton: {
    borderTopWidth: 0.5,
    borderTopColor: "#C7C7CC",
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#007AFF",
  },
  cancelButtonText: {
    color: "#FF3B30",
    fontWeight: "400",
  },
});

export default CustomAlert;
