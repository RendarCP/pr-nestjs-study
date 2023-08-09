import { Cat, CatType} from './cats.model'
import { Router, Request, Response } from 'express';

const router = Router();


router.get("/", (req: Request, res: Response) => {
  res.send({ cats: Cat });
});

// 블루라는 캣 가져옴
router.get("/cats/blue", (req: Request, res: Response) => {
  res.send({ blue: Cat[0] });
});

// som 이라는 캣 가져옴
router.get("/cats/som", (req: Request, res: Response) => {
  res.send({ som: Cat[1] });
});

// READ 고양이 정보 모두 가져오기
router.get("/cats", (req: Request, res: Response) => {
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
router.get("/cats/:id", (req: Request, res: Response) => {
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
router.post("/cats", (req: Request, res: Response) => {
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

//* UPDATE 고양이 데이터 업데이트 -> PUT
router.put('/cats/:id', (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    let result;
    Cat.forEach((cat) => {
      if (cat.id === params.id) {
        cat = body;
        result = cat;
      }
    });
    res.status(200).send({
      success: true,
      data: {
        cat: result,
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//* UPDATE 고양이 데이터 부분적으로 업데이트 -> PATCH
router.patch('/cats/:id', (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    let result;
    Cat.forEach((cat) => {
      if (cat.id === params.id) {
        cat = { ...cat, ...body };
        result = cat;
      }
    });
    res.status(200).send({
      success: true,
      data: {
        cat: result,
      },
    });
  } catch (error:any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//* DELETE 고양이 데이터 삭제 -> DELETE
router.delete('/cats/:id', (req, res) => {
  try {
    const params = req.params;
    const newCat = Cat.filter((cat) => cat.id !== params.id);
    res.status(200).send({
      success: true,
      data: newCat,
    });
  } catch (error:any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

export default router