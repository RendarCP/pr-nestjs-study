import * as express from "express";
import catsRouter from './cats/cats.route'

const app: express.Express = express();

// 미들웨어 
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log('this is middleware');
  next(); // 라우터를 찾을수 있도록 (다음행동 지시)
})

// json middleware
app.use(express.json())

app.use(catsRouter)


// 에러 미들웨어 
app.use((req, res, next) => {
  console.log("this is error middleware");
  res.send({ error: "404 not found error" });
});

app.listen(8000, () => {
  console.log("server is on....");
});


