import { Router } from "express";
import * as APIPaths from '@constants/api_path_constants';
import { isAdmin, isUser } from '@middleware/authentication';
import * as controller from '@controller/jobs';
import { USER_ROLES } from "@constants/master_data_constants";
import * as validation from '@validations';
const router = Router();

router.route(APIPaths.JOBS)
    .post(validation.saveJobs,isUser([USER_ROLES.recruiter]),controller.saveJobDeatils)
    .get(validation.getJobs, isUser([USER_ROLES.recruiter]),controller.getJobDetails);
router.route(APIPaths.JOBS_BY_UID)
    .put(validation.updateJob,isUser([USER_ROLES.recruiter]),controller.updateJobsByUid)
    .get(validation.jobUid,isUser([USER_ROLES.recruiter]),controller.getJobsByUid)
    .delete(validation.jobUid,isUser([USER_ROLES.recruiter]),controller.deleteJobsByUid);
router.route(APIPaths.JOBS_STATUS)
    .patch(isAdmin, controller.updateJobStatus);

export default router;