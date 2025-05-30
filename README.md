# 3rd-project-uoScholar-Client ( React Native )

서울시립대학교 학칙에 대해 사용자가 질문하면 자연어로 답할 수 있는 챗봇 어플리케이션 개발.

## 📱 데모

<img src="./src/assets/demo.gif" width="300" />

## 🛠 기술 스택

- React Native (CLI)
- TypeScript
- React Navigation
- Axios

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
```
src/
├── api/ # 서버 통신 관련 함수 (ex: Axios 인스턴스, API 요청 함수)
├── assets/ # 이미지, 아이콘, 폰트 등 정적 파일
├── components/ # 재사용 가능한 UI 컴포넌트
├── constants/ # 앱 전역에서 사용하는 상수 (색상, 문자열 등)
├── navigation/ # 화면 이동(Navigation Stack) 설정
└── screens/ # 각종 화면 페이지 컴포넌트
```

## 🙋 문의

질문 또는 버그 제보는 [Issues](https://github.com/username/project/issues)를 통해 남겨주세요.