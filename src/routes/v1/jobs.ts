import { Router } from "express";
import * as APIPaths from '@constants/api_path_constants';
import { isAdmin, isUser } from '@middleware/authentication';
import * as controller from '@controller/jobs';
import { USER_ROLES } from "@constants/master_data_constants";
const router = Router();

router.route(APIPaths.JOBS)
    .post(isUser([USER_ROLES.recruiter]), controller.saveJobDeatils)
    .get(isUser([USER_ROLES.recruiter, USER_ROLES.admin]), controller.getJobDetails);

router.route(APIPaths.JOBS_BY_UID)
    .put(isUser([USER_ROLES.recruiter]), controller.updateJobsByUid)
    .get(isUser([USER_ROLES.recruiter]), controller.getJobsByUid)
    .delete(isUser([USER_ROLES.recruiter]), controller.deleteJobsByUid)
    .patch(isUser([USER_ROLES.recruiter]), controller.submitRecruiterRequest);

router.route(APIPaths.JOBS_STATUS)
    .patch(isAdmin, controller.updateJobStatus);

export default router;