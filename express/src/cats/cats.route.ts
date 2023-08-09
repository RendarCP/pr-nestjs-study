import { Cat, CatType} from './cats.model'
import { Router, Request, Response } from 'express';
import { createCat, deleteCat, readAllcat, readCat, updateCat, updatePartialCat } from './cats.service';

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
router.get("/cats", readAllcat);

// READ 특정 고양이 데이터 가져오기
router.get("/cats/:id", readCat);

// CREATE 고양이 추가 api 
router.post("/cats", createCat);

//* UPDATE 고양이 데이터 업데이트 -> PUT
router.put('/cats/:id', updateCat);

//* UPDATE 고양이 데이터 부분적으로 업데이트 -> PATCH
router.patch('/cats/:id', updatePartialCat);

//* DELETE 고양이 데이터 삭제 -> DELETE
router.delete('/cats/:id', deleteCat);

export default router