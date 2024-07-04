import { Router } from "express";
import * as APIPaths from '@constants/api_path_constants';
import { isAdmin, isUser } from '@middleware/authentication';
import * as controller from '@controller/jobs';
import { USER_ROLES } from "@constants/master_data_constants";
import * as validation from '@validations';
const router = Router();

router.route(APIPaths.JOBS)
    .post(validation.saveJobs,isUser([USER_ROLES.recruiter]), controller.saveJobDeatils)
    .get(isUser([USER_ROLES.recruiter, USER_ROLES.admin]), controller.getJobDetails);

router.route(APIPaths.JOBS_BY_UID)
    .put(validation.updateJob,isUser([USER_ROLES.recruiter]), controller.updateJobsByUid)
    .get(validation.jobUid,isUser([USER_ROLES.recruiter]), controller.getJobsByUid)
    .delete(validation.jobUid,isUser([USER_ROLES.recruiter]), controller.deleteJobsByUid)
    .patch(validation.jobUid,isUser([USER_ROLES.recruiter]), controller.submitRecruiterRequest);

router.route(APIPaths.JOBS_STATUS)
    .patch(validation.updateJobStatus,isUser([USER_ROLES.recruiter, USER_ROLES.admin]), controller.updateJobStatus);

router.route(APIPaths.APPLY_JOB)
    .post(validation.jobUid,isUser([USER_ROLES.student]), controller.applyStudentJob);

router.route(APIPaths.SAVE_JOB)
    .post(validation.saveStudentJobs,isUser([USER_ROLES.student]), controller.toggleSaveJobStatus);

export default router;