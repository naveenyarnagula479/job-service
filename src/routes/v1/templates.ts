import { Router } from "express";
import * as APIPaths from '@constants/api_path_constants';
import { isAdmin } from '@middleware/authentication';
import * as controller from '@controller/templates';
import * as validation from '@validations';
const router = Router();

router.route(APIPaths.MASTER_TEMPLATES)
    .post(validation.saveMasterTemplate, isAdmin,controller.saveMasterTemplates)
    .get(isAdmin,controller.getMasterTemplates)
router.route(APIPaths.TEMPLATES)
    .post(validation.saveTemplates,isAdmin,controller.saveTemplates)
    .get(validation.getTemplates,isAdmin,controller.getTemplates)
router.route(APIPaths.TEMPLATE_BY_UID)
    .put(validation.updateTemplate, isAdmin,controller.updateTemplatesByUid)
    .get(validation.templateUid,isAdmin,controller.getTemplatesByUid)
    .delete(validation.templateUid, isAdmin, controller.deleteTemplatesByUid)
    
export default router;