# Uniswap clone

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## 기술 스택

- React 18.2
- Typescript 4.9
- tailwindcss 3.3

## 기능 구현

### Header

- Header는 단순히 퍼블리싱만 구현했습니다.

### Main

- pay 영역의 기본토큰은 Ether 토큰입니다.
- 하나라도 토큰이 선택되지 않았으면 두 개의 토큰 개수를 입력 받을 수 없습니다.
- 두 개의 토큰이 선택됐을 경우 하단에 receive 토큰이 1일때의 pay의 토큰 개수가 나타냅니다.
- 가운데 화살표를 누르면 pay와 receive의 토큰들이 교환됩니다.
- connect wallet 기능은 구현하지 않았습니다.
- 언어 변경 기능은 구현하지 않았습니다. (기본으로 en-US를 따릅니다.)

### SelectTokenModal

- 기본으로 ETH, USDC, WBTC 토큰이 주어집니다.
- 검색을하여 토큰을 찾을 수 있습니다.
  - 이때 검색 기능은 useDeferredValue를 이용해서 구현했습니다.
- 바깥 영역을 누르면 창이 닫힙니다.

### 그 외

- 아이콘 같은 경우는 SVG 파일과 Fontawesome을 이용했습니다.
- 나중의 자바스크립트 에러를 대처하기 위한 ErrorBoundary 컴포넌트를 간단히 구현해놨습니다.
