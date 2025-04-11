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
