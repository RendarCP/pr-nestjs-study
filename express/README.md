# express

---

## 설치과정

```bash
# express 설치
npm install express --save

# express에서 typescript 사용하기위해서
npm install @type/express -D
```

- devDependency로 설치하는 이유는 어차피 js파일로 실행되기때문에 개발환경에서만 필요

## express 구현 및 실행

- 공식 문서 참조 https://expressjs.com/en/starter/hello-world.html

```javascript
// app.ts
// const express = require('express')
//- > 이부분 수정
import * as express from "express";
const app = express();
const port = 3000;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

- req는 request로 요청 프론트나 서버측으로오는 요청
- res는 response로 응답으로써 프론트나 요청이 온곳으로 다시 보낸다.

### 데이터 모킹(mocking)하기

- app.model.ts 생성
- 모킹 데이터 생성 및 관련 라우트에서 import

```typescript
export type CatType = {
  id: string;
  name: string;
  age: number;
  species: string;
  isCute: boolean;
  friends: string[];
};

export const Cat: CatType[] = [
  {
    id: "fsduifh",
    name: "blue",
    age: 8,
    species: "Russian Blue",
    isCute: true,
    friends: ["asdfhj29009", "WE09tju2j"],
  },
  {
    id: "iohf2309q4hr",
    name: "som",
    age: 4,
    species: "Sphynx cat",
    isCute: true,
    friends: ["weju0fj20qj", "asdfhj29009", "weju0fj20qj"],
  },
  {
    id: "WE09tju2j",
    name: "lean",
    age: 6,
    species: "Munchkin",
    isCute: false,
    friends: [],
  },
  {
    id: "asdfhj29009",
    name: "star",
    age: 10,
    species: "Scottish Fold",
    isCute: true,
    friends: ["weju0fj20qj"],
  },
  {
    id: "weju0fj20qj",
    name: "red",
    age: 2,
    species: "Sharm",
    isCute: false,
    friends: [],
  },
];
```

## express 미들웨어 구현

- https://expressjs.com/en/guide/writing-middleware.html 참조

- express 서버의 경우 최상단에서 아래로 Route를 찾는다 (순서가 중요하다는 이야기)

- 매번 라우트에서 반복되는 로직 (로그, 헤더 등)을 따로 빼서 미들웨어로 관리

```typescript
// 라우터 최상단에 작성
// 미들웨어
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  next(); // 라우터를 찾을수 있도록 (다음행동 지시)
});
```

- 쉽게 라우터 중간에 로깅등이 필요하다 싶으면 라우터 중간에 넣어주면 된다

```typescript
// 블루라는 캣 가져옴
app.get("/cats/blue", (req: express.Request, res: express.Response) => {
  res.send({ blue: Cat[0] });
});

app.use((req, res, next) => {
  // some logging
});

// som 이라는 캣 가져옴
app.get("/cats/som", (req: express.Request, res: express.Response) => {
  res.send({ som: Cat[1] });
});
```

- 라우터 전용 미들웨어도 제작가능하다

```typescript
app.get("/cats/som", (req, res, next) => {
  console.log("this is som middleware");
  next();
});
```

- 에러전용 미들웨어의경우 맨하단에 작성

```typescript
app.use((req, res, next) => {
  console.log("this is error middleware");
  res.send({ error: "404 not found error" });
});
```

## express Create API 개발

- CRUD로 API를 개발하는데 여기서는 CREATE,READ API 개발

### READ API

1. 고양이 정보 모두를 조회하는 api

- db연결시에는 예외처리르 해줘야된다

```typescript
app.get("/cat", (req, res) => {
  try {
    // db연결의 경우 예외 처리
    const cats = Cat;
    res.send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});
```

2. 특정 고양이 정보 조회

```typescript
// READ 특정 고양이 데이터 가져오기
app.get("/cats/:id", (req: express.Request, res: express.Response) => {
  try {
    // db연결의 경우 예외 처리
    const params = req.params; // 파라미터값을 가져와서
    const cats = Cat.find((cat) => cat.id === params.id); // 데이터 조회
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});
```

3. 고양이 create api

```typescript
// CREATE 고양이 추가 api
app.post("/cats", (req: express.Request, res: express.Response) => {
  try {
    const data = req.body;
    Cat.push(data);
    res.status(200).send({
      success: true,
      data: { data },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});
```

- 기본적으로 express는 json을 읽을수 없으므로 json을 읽을수 있게 미들웨어 추가

```typescript
// json middleware
app.use(express.json());
```
