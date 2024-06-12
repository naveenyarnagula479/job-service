import * as APIPaths from '@constants/api_path_constants';
import { Router } from 'express';
import DummyRoutes from './dummy';

const router = Router();

router.use(APIPaths.ROUTER_DUMMY, DummyRoutes);

export default router;
