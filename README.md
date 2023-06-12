# Longs FE Code Convention Guide (React)

해당 문서는 롱스 FE 멤버들의 React code convention을 맞추기 위해 작성되었습니다.  
팀원들의 합의에 따라서 언제든 바뀔 수 있으며, 가급적 해당 컨벤션을 맞춰주세요.

본 내용은 [airbnb\_스타일가이드](https://github.com/tipjs/javascript-style-guide) 를 참고하여 작성하였습니다.

## 코드 컨벤션

<b>폴더구조</b>

```cmd
.
├── components
│   ├── common
│   └── otherfiles.jsx
├── styles
├── assets
└── utils
```

<b>명명규칙</b>

- 디렉토리

  - 소문자로 시작하고 복수일 때 s를 붙입니다.
  - 여러 단어로 이루어진 경우 언더바(\_)로 잇습니다.

```cmd
├── components_common
```

- 클래스

  - 케밥 형식을 따릅니다.

```javascript
<div className={'class-name'}>
```

- 함수

  - 카멜 케이스를 따릅니다.
  - `handleOn이벤트명` 을 따릅니다.
  - arrow function 을 사용합나디. (예외허용)

```javascript
const handleOnClick = () => {};
```

<b>SCSS</b>

- 태그

  - 최상단 태그는 `컴포넌트명-root`로 합니다.
  - 공통된 속성은 `%컴포넌트명` 으로 빼고, `@extend %컴포넌트명` 으로 상속받는다.

```css
%search-field {
  & {
    display: flex;
    align-items: center;
    width: fit-content;
  }
}

.search-field-root {
  .search-field-container-bordered {
    border: 1px solid #cccccc;
    border-radius: 2px;
    padding: 4px 8px;

    @extend %search-field;
  }

  .search-field-container-borderless {
    border: none;

    @extend %search-field;
  }
}
```
