import { Router } from "express";
import * as APIPaths from '@constants/api_path_constants';
import { isAdmin } from '@middleware/authentication';
import * as controller from '@controller/templates'
const router = Router();

router.route(APIPaths.MASTER_TEMPLATES)
    .post(isAdmin,controller.saveMasterTemplates)
    .get(isAdmin,controller.getMasterTemplates)
router.route(APIPaths.TEMPLATES)
    .post(isAdmin,controller.saveTemplates)
    .get(isAdmin,controller.getTemplates)
router.route(APIPaths.TEMPLATE_BY_UID)
    .put(isAdmin,controller.updateTemplatesByUid)
    .get(isAdmin,controller.getTemplatesByUid)
    .delete(isAdmin, controller.deleteTemplatesByUid)
    
export default router;