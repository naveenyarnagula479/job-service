import * as APIPaths from '@constants/api_path_constants';
import { Router } from 'express';
import DummyRoutes from './dummy';
import TemplateRoutes from './templates';
const router = Router();

router.use(APIPaths.ROUTER_DUMMY, DummyRoutes);
router.use(APIPaths.ROUTER_TEMPLATES, TemplateRoutes)

export default router;
