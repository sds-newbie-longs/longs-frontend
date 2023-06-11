# Node.js 버전 18을 선택합니다.
FROM node:18 as build

# 작업 디렉토리를 생성하고 필요한 파일을 복사합니다.
WORKDIR /app
COPY package.json package-lock.json ./

# 필요한 패키지를 설치합니다.
RUN npm ci

# 소스 코드를 복사하고 앱을 빌드합니다.
COPY . .
RUN npm run build


# 이전 단계에서 빌드한 React 앱의 결과물을 사용합니다.
FROM build as final

# NginX 이미지를 기반으로 합니다.
FROM nginx:alpine

# NginX 설정 파일을 복사합니다.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# React 앱을 빌드한 결과물을 NginX의 정적 파일 디렉토리로 복사합니다.
COPY --from=final /app/build /usr/share/nginx/html

# NginX를 실행합니다.
CMD ["nginx", "-g", "daemon off;"]
