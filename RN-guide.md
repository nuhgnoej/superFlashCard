# RN Guide

## 1. 프로젝트 환경 셋업

프로젝트 초기화
npx create-expo-app@latest

## 2. 앱 실행하기

npm run web
npx expo start

### EXPO GO가 외부 네트워크인 경우

npx expo start --tunnel

## 3. 깃허브 원격 저장소 연결

### git 초기화

git init

### GitHub 원격 저장소 연결

git remote add origin https://github.com/nuhgnoej/superFlashCard.gi

### 확인용 커맨드

git remote -v

### 커밋 & 푸시

git add .
git commit -m "🎉 Initial Expo project setup"
git branch -M main
git push -u origin main

### 원격 저장소(origin) 삭제

git remote remove origin

### 원격 저장소 재설정 (PAT 포함)

git remote add origin https://<USERNAME>:<YOUR_PAT>@github.com/<USERNAME>/<REPO>.git

### 최초 push (브랜치 이름은 main 또는 master 확인 필요)

git push -u origin main

## 학습 내용 순서

컴포넌트 설명
View 레이아웃 컨테이너 (HTML의 div 느낌)
Text 텍스트 출력 (HTML의 p, span 등)
Image 이미지 표시 (HTML의 img)
ScrollView 스크롤 가능한 영역
FlatList 성능 좋은 리스트 (많은 데이터에 적합)
TouchableOpacity / Pressable 터치 가능한 요소 (버튼처럼 사용)
TextInput 텍스트 입력 필드
Button 기본 버튼 (커스터마이징 제한적)
SafeAreaView 노치/상단바 고려한 안전 영역
KeyboardAvoidingView 키보드가 올라올 때 UI 겹침 방지

### ✨ 추천 학습 순서

- [ ] View, Text, StyleSheet → 레이아웃과 텍스트
- [ ] FlatList, ScrollView → 리스트와 스크롤
- [ ] TouchableOpacity, Button → 사용자 입력
- [ ] TextInput → 입력 필드 다루기
- [ ] React Navigation or Expo Router → 화면 간 이동
- [ ] useState/useEffect + API 연동 → 동적 데이터 처리
- [ ] Context or Redux (필요할 때) → 상태 전역관리

## async-storage expo module 설치 명령어

$ npx expo install @react-native-async-storage/async-storage
