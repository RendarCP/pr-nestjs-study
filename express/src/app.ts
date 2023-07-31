import * as express from "express";
import { Cat, CatType} from './app.model'

const app: express.Express = express();

// 미들웨어 
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log('this is middleware');
  next(); // 라우터를 찾을수 있도록 (다음행동 지시)
})

// json middleware
app.use(express.json())

app.get("/", (req: express.Request, res: express.Response) => {
  res.send({ cats: Cat });
});

// 블루라는 캣 가져옴
app.get("/cats/blue", (req: express.Request, res: express.Response) => {
  res.send({ blue: Cat[0] });
});

// som 이라는 캣 가져옴
app.get("/cats/som", (req: express.Request, res: express.Response) => {
  res.send({ som: Cat[1] });
});

// READ 고양이 정보 모두 가져오기
app.get("/cats", (req: express.Request, res: express.Response) => {
  try {
    // db연결의 경우 예외 처리
    const cats = Cat;
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

// CREATE 고양이 추가 api 
app.post("/cats", (req: express.Request, res: express.Response) => {
  try {
    const data = req.body // body값 가져오기
    Cat.push(data); // 데이터 추가 (데이터베이스의경우 데이터 추가)
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

// 에러 미들웨어 
app.use((req, res, next) => {
  console.log("this is error middleware");
  res.send({ error: "404 not found error" });
});

app.listen(8000, () => {
  console.log("server is on....");
});
