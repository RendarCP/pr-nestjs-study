import * as express from "express";
import { Cat, CatType} from './app.model'

const app: express.Express = express();

// 미들웨어 
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log('this is middleware');
  next(); // 라우터를 찾을수 있도록 (다음행동 지시)
})

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

// 에러 미들웨어 
app.use((req, res, next) => {
  console.log("this is error middleware");
  res.send({ error: "404 not found error" });
});

app.listen(8000, () => {
  console.log("server is on....");
});
