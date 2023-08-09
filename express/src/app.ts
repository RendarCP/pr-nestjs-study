import * as express from "express";
import catsRouter from './cats/cats.route'

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  // 라우트 분리
  private setRoute() {
    this.app.use(catsRouter)
  }

  // 미들웨어 분리
  private setMiddleware() {
    // 미들웨어 
    this.app.use((req, res, next) => {
      console.log(req.rawHeaders[1]);
      console.log('this is middleware');
      next(); // 라우터를 찾을수 있도록 (다음행동 지시)
    })

    // json middleware
    this.app.use(express.json())

    this.setRoute();

    // 에러 미들웨어 
    this.app.use((req, res, next) => {
      console.log("this is error middleware");
      res.send({ error: "404 not found error" });
    });
  }
  
  // 서버 실행 로직
  public listen() {
    this.setMiddleware();
    this.app.listen(8000, () => {
      console.log("server is on....");
    });
  }
}

// const app: express.Express = express();

function init() {
  const server = new Server();
  server.listen();
}

init();




