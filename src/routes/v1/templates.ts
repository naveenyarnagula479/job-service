import { Router } from "express";
import * as APIPaths from '@constants/api_path_constants';
import { isAdmin, isUser } from '@middleware/authentication';
import * as controller from '@controller/templates'
import { USER_ROLES } from "@constants/master_data_constants";
const router = Router();

router.route(APIPaths.MASTER_TEMPLATES)
    .post(isAdmin, controller.saveMasterTemplates)
    .get(isAdmin, controller.getMasterTemplates)

router.route(APIPaths.TEMPLATES)
    .post(isAdmin, controller.saveTemplates)
    .get(isUser([USER_ROLES.admin, USER_ROLES.recruiter]), controller.getTemplates)

router.route(APIPaths.TEMPLATE_BY_UID)
    .put(isAdmin, controller.updateTemplatesByUid)
    .get(isUser([USER_ROLES.admin, USER_ROLES.recruiter]), controller.getTemplatesByUid)
    .delete(isAdmin, controller.deleteTemplatesByUid)

export default router;