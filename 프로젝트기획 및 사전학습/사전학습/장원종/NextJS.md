[TOC]

# NextJS

- React와의 차이점
  - React
    - Library : 자유도
    - client-side rendering : 브라우저가 자바스크립트를 가져와서 자바스크립트가 모든 UI 만듬 (div id="root")
  - NextJS
    - Framework : 특정한 규칙에 따라 해야 함
    - pre-rendering : SEO에 좋음



# Tailwind CSS

- class
  - `min-h-screen` : 화면 세로 끝까지 bg 채우기
  - `aspect-square` :  정사각형
  - `space-x/y` : flex 간의 거리 자동으로 계산해 넣어줌



# 설치

## Project

```bash
npx create-next-app@latest
```

- TypeScript 추가

```bash
npx create-next-app@latest --typescript
```

- React 18

```bash
npm i next@latest react@rc react-dom@rc

# TypeError: Cannot set properties of undefined (setting 'reactRoot')
npm i next@12.0.8 react@rc react-dom@rc
```

- Tailwind CSS

> https://tailwindcss.com
>
> https://tailwind.build/classes

```bash
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# plugin
npm i @tailwindcss/forms
```

- 실행

```bash
npm run dev
```



## Extension

- Tailwind CSS IntelliSense : 자동 완성 `ctrl+space`



heroicons
