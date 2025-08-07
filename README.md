# 3rd-project-uoScholar-Client ( React Native )

서울시립대학교 학칙에 대해 사용자가 질문하면 자연어로 답할 수 있는 챗봇 어플리케이션 개발.

## 📱 데모

<img src="./src/assets/demo.gif" width="300" />

## 🛠 기술 스택

- **React Native (CLI)**
  - ✅ 세부적인 플랫폼 설정을 자유롭게 커스터마이징 가능합니다.
  - ❌ Expo는 네이티브 기능 확장과 SDK 연동에 제약이 많기 때문에 적합하지 않았습니다.
- **TypeScript**
  - ✅ 정적 타입을 통해 컴파일 타임에 오류를 사전에 방지하였습니다.
  - ✅ 코드 자동완성과 명확한 타입 추론 덕분에 **협업 및 유지보수 효율성**이 향상하였습니다.
- **React Navigation**
  - ✅ BottomTab, Drawer 등 다양한 네비게이션 패턴을 손쉽게 구현 가능합니다.
  - ✅ 커뮤니티와 문서가 잘 정리되어 있어 유지보수와 커스터마이징이 쉽습니다.
- **Axios**
  - ✅ 요청 및 응답을 자동으로 JSON 처리 해줍니다.
  - ✅ 에러 핸들링에서 ```status```로 분기가 가능합니다.

## 🚀 설치 및 실행 방법

```bash
# clone repository
git clone https://github.com/ALOC-dev/3rd-project-uoScholar-Client.git
cd 3rd-project-uoScholar-Client

# install package
npm install

# clean npm cache
npm cache clean --force

# start app
npx react-native run-android
# 또는
npx react-native run-ios
```

## 📁 폴더 구조
React Native 프로젝트를 구조화할 때, **유지보수와 확장성**을 우선 고려하였습니다. 서비스 개발을 하면서도 계속적인 기능 수정이 이루어졌기 때문에, 다음과 같은 구조를 채택하였습니다.
```
src/
├── api/ # Axios 인스턴스 선언의 공통화와 API 요청 함수 분리
├── assets/ # 정적 파일들의 통합 관리리
├── components/ # 재사용 가능한 UI 단위 컴포넌트
├── constants/ # 앱 전역에서 사용하는 상수 (색상)
├── navigation/ # 화면 이동(Drawer Navigator) 설정
└── screens/ # 화면 페이지 컴포넌트들의 기능별 분리
```

## 🙋 문의

질문 또는 버그 제보는 [Issues](https://github.com/ALOC-dev/3rd-project-uoScholar-Client/issues)를 통해 남겨주세요.