import * as APIPaths from '@constants/api_path_constants';
import { Router } from 'express';
import DummyRoutes from './dummy';
import MasterDataRoutes from "./master_data"
const router = Router();

router.use(APIPaths.ROUTER_DUMMY, DummyRoutes);
router.use(APIPaths.MASTER_DATA, MasterDataRoutes)


export default router;
