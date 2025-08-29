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
  - ✅ Drawer Navigator를 사용하여 사이드 메뉴 구현
  - ✅ 커뮤니티와 문서가 잘 정리되어 있어 유지보수와 커스터마이징이 쉽습니다.
- **Axios**
  - ✅ 요청 및 응답을 자동으로 JSON 처리 해줍니다.
  - ✅ 에러 핸들링에서 ```status```로 분기가 가능합니다.
- **Zustand**
  - ✅ 가볍고 심플한 전역 상태 관리 라이브러리로, Redux 대비 보일러플레이트 코드가 적습니다.
  - ✅ persist 미들웨어를 활용하여 사용자 정보(선택된 대학 정보)를 로컬 스토리지에 저장해 앱 재시작 시에도 상태를 유지할 수 있습니다.
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
├── api/                    # API 통신 관련
│   ├── Api.ts             # 공통 API 설정 및 타입 정의
│   ├── chatApi.ts         # 챗봇 API (별도 baseURL 사용)
│   ├── noticeApi.ts       # 공지사항 API
│   └── keywordApi.ts      # 키워드 API
├── assets/                # 정적 파일들의 통합 관리
│   ├── images/           # 이미지 파일들
│   └── demo.gif          # 데모 영상
├── components/           # 재사용 가능한 UI 단위 컴포넌트
│   ├── Chat/            # 채팅 관련 컴포넌트
│   │   ├── ChatBubble.tsx
│   │   ├── ChatContainer.tsx
│   │   └── ChatInput.tsx
│   ├── Notice/          # 공지사항 관련 컴포넌트
│   │   ├── BlockNotice.tsx
│   │   └── CardNotice.tsx
│   ├── CustomAlert/     # 커스텀 알림 컴포넌트
│   ├── CustomKeyboardAvoidingView/ # 키보드 처리 컴포넌트
│   └── LoadingScreen.tsx
├── constants/           # 앱 전역에서 사용하는 상수
│   ├── colors.ts       # 색상 상수
│   ├── config.ts       # API 설정 및 환경별 설정
│   └── index.ts        # 상수 export
├── hooks/              # 커스텀 훅
│   └── use-college.ts  # 대학 선택 관련 훅
├── navigation/         # 화면 이동 설정
│   ├── DrawerNavigator.tsx  # Drawer 네비게이션
│   ├── MainTabs.tsx        # 메인 탭 네비게이션
│   └── RootNavigation.tsx  # 루트 네비게이션
├── screens/            # 화면 페이지 컴포넌트들
│   ├── auth/          # 인증 관련 화면
│   │   └── RegisterScreen.tsx  # 대학 선택/등록 화면
│   └── main/          # 메인 화면들
│       ├── HomeScreen/     # 홈 화면 (채팅)
│       └── SearchScreen/   # 검색 화면들
│           ├── NoticeScreen.tsx      # 공지사항 목록
│           ├── SearchInputScreen.tsx # 검색 입력
│           └── SearchResultScreen.tsx # 검색 결과
├── store/             # 전역 상태 관리
│   └── use-college-store.ts  # 대학 선택 상태 관리 (Zustand)
├── types/             # TypeScript 타입 정의
│   └── college.ts     # 대학 관련 타입
├── utils/             # 유틸리티 함수들
└── App.tsx           # 앱 진입점
```

## 🎯 주요 기능

### 1. 챗봇 기능
- **자연어 질의**: 사용자가 자연어로 공지사항에 대해 질문
- **AI 응답**: 챗봇이 관련 공지사항을 찾아서 답변
- **실시간 채팅**: 키보드가 올라올 때 자동 스크롤

### 2. 공지사항 검색
- **카테고리별 검색**: 일반공지, 학사공지, 학과공지
- **키워드 검색**: 사용자가 직접 키워드 입력
- **인기 키워드**: 자주 검색되는 키워드 제공
- **무한 스크롤**: 페이지네이션으로 성능 최적화

### 3. 대학 선택 기능
- **다중 선택**: 여러 대학을 동시에 선택 가능
- **영구 저장**: 선택한 대학 정보를 로컬에 저장
- **상태 관리**: Zustand를 사용한 전역 상태 관리

### 4. 사용자 경험
- **Drawer 네비게이션**: 사이드 메뉴로 화면 전환
- **로딩 상태**: 데이터 로딩 중 적절한 피드백
- **에러 처리**: 사용자 친화적인 에러 메시지
- **반응형 UI**: 다양한 화면 크기에 대응

## 🔄 상태 관리

### Zustand Store 구조
```typescript
// 대학 선택 상태 관리
interface CollegeState {
  selectedCollegeCodes: College[];
  toggleCollege: (code: College) => void;
  setSelectedCollegeCodes: (codes: College[]) => void;
  clear: () => void;
}
```

### Persist 설정
- AsyncStorage를 사용하여 선택한 대학 정보 영구 저장
- 앱 재시작 시에도 사용자 설정 유지
- Hydration 상태 관리로 초기 로딩 처리

## 🎨 UI/UX 특징

### 컴포넌트 설계
- **재사용성**: 공통 컴포넌트로 중복 코드 최소화
- **일관성**: 일관된 디자인 시스템 적용
- **접근성**: 다양한 사용자를 고려한 UI 설계

### 네비게이션
- **Drawer Navigator**: 직관적인 사이드 메뉴
- **화면 전환**: 부드러운 애니메이션과 전환 효과
- **뒤로가기**: 적절한 뒤로가기 동작

## 🚀 성능 최적화

### 코드 최적화
- **함수 분리**: 중복 코드 제거 및 재사용성 향상
- **메모이제이션**: useCallback, useMemo 활용
- **지연 로딩**: 필요한 데이터만 요청

### 네트워크 최적화
- **API 분리**: 일반 API와 챗봇 API 분리
- **에러 처리**: 사용자 친화적인 에러 메시지
- **타임아웃 설정**: 적절한 네트워크 타임아웃

## 🙋 문의

질문 또는 버그 제보는 [Issues](https://github.com/ALOC-dev/3rd-project-uoScholar-Client/issues)를 통해 남겨주세요.
