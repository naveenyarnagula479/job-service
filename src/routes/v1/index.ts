import * as APIPaths from '@constants/api_path_constants';
import { Router } from 'express';
import DummyRoutes from './dummy';
import MasterDataRoutes from "./master_data";
import TemplateRoutes from './templates';
import JobRoutes from './jobs';
const router = Router();

router.use(APIPaths.ROUTER_DUMMY, DummyRoutes);
router.use(APIPaths.MASTER_DATA, MasterDataRoutes)

router.use(APIPaths.ROUTER_TEMPLATES, TemplateRoutes)
router.use(APIPaths.ROUTER_JOBS, JobRoutes)

export default router;
