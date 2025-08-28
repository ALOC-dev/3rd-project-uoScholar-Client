# 3rd-project-uoScholar-Client ( React Native )

서울시립대학교 공지사항에 대해 사용자가 질문하면 자연어로 답할 수 있는 챗봇 어플리케이션 개발.

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
- **Zustand**
  - ✅ 가볍고 심플한 전역 상태 관리 라이브러리로, Redux 대비 보일러플레이트 코드가 적습니다.
  - ✅ persist 미들웨어를 활용하여 사용자 정보(로그인 상태, 토큰 등)를 로컬 스토리지에 저장해 앱 재시작 시에도 상태를 유지할 수 있습니다.
  - ✅ AsyncStorage와 연동해 네이티브 환경에서도 영구 저장이 가능하며, 직렬화/역직렬화 과정을 자동 처리합니다.
  - ✅ React Context 대비 퍼포먼스 효율이 높고, 구조가 단순해 유지보수가 쉽습니다.

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

## 🔧 API 설정

### Base URL 분리
- **일반 API**: 공지사항, 키워드 등 일반적인 API 요청
- **Chat API**: 챗봇 관련 API 요청 (별도 서버)

## 📁 폴더 구조
React Native 프로젝트를 구조화할 때, **유지보수와 확장성**을 우선 고려하였습니다. 서비스 개발을 하면서도 계속적인 기능 수정이 이루어졌기 때문에, 다음과 같은 구조를 채택하였습니다.
```
src/
├── api/ # Axios 인스턴스 선언의 공통화와 API 요청 함수 분리
│   ├── chatApi.ts # Chat API (별도 baseURL 사용)
│   ├── noticeApi.ts # 공지사항 API
│   └── keywordApi.ts # 키워드 API
├── assets/ # 정적 파일들의 통합 관리
├── components/ # 재사용 가능한 UI 단위 컴포넌트
├── constants/ # 앱 전역에서 사용하는 상수
│   ├── colors.ts # 색상 상수
│   └── config.ts # API 설정 및 환경별 설정
├── navigation/ # 화면 이동(Drawer Navigator) 설정
└── screens/ # 화면 페이지 컴포넌트들의 기능별 분리
```

## 🙋 문의

질문 또는 버그 제보는 [Issues](https://github.com/ALOC-dev/3rd-project-uoScholar-Client/issues)를 통해 남겨주세요.
