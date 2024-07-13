import { Router } from "express";
import * as APIPaths from '@constants/api_path_constants';
import { isAdmin, isUser } from '@middleware/authentication';
import * as controller from '@controller/jobs';
import { USER_ROLES } from "@constants/master_data_constants";
const router = Router();

router.route(APIPaths.JOBS)
    .post(isUser([USER_ROLES.recruiter]), controller.saveJobDeatils)
    .get(isUser([USER_ROLES.recruiter, USER_ROLES.admin, USER_ROLES.student]), controller.getJobDetails);

router.route(APIPaths.JOBS_BY_UID)
    .put(isUser([USER_ROLES.recruiter]), controller.updateJobsByUid)
    .get(isUser([USER_ROLES.recruiter, USER_ROLES.admin, USER_ROLES.student]), controller.getJobsByUid)
    .delete(isUser([USER_ROLES.recruiter]), controller.deleteJobsByUid)
    .patch(isUser([USER_ROLES.recruiter]), controller.submitRecruiterRequest);

router.route(APIPaths.JOBS_BY_STUDENT_UID)
    .get(isUser([USER_ROLES.recruiter]), controller.getJobsByStudentUid)

router.route(APIPaths.STUDENT_JOB_STATUS)
    .put(isUser([USER_ROLES.recruiter]), controller.updateStudentJobStatus);

router.route(APIPaths.JOBS_STATUS)
    .patch(isUser([USER_ROLES.recruiter, USER_ROLES.admin]), controller.updateJobStatus);

router.route(APIPaths.APPLY_JOB)
    .post(isUser([USER_ROLES.student]), controller.applyStudentJob);

router.route(APIPaths.SAVE_JOB)
    .post(isUser([USER_ROLES.student]), controller.toggleSaveJobStatus);

router.route(APIPaths.CANDIDATES)
    .get(isUser([USER_ROLES.recruiter]), controller.fetchAppliedCandidates);

export default router;