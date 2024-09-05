import * as APIPaths from '@constants/api_path_constants';
import { USER_ROLES } from "@constants/master_data_constants";
import * as controller from '@controller/jobs';
import { isUser } from '@middleware/authentication';
import { Router } from "express";
import * as validations from '@validations';
const router = Router();

router.route(APIPaths.JOBS)
    .post(validations.validateJobs,isUser([USER_ROLES.recruiter]), controller.saveJobDeatils)
    .get(isUser([USER_ROLES.recruiter, USER_ROLES.admin, USER_ROLES.student]), controller.getJobDetails);

router.route(APIPaths.JOBS_BY_UID)
    .put(validations.updateJobs,isUser([USER_ROLES.recruiter]), controller.updateJobsByUid)
    .get(validations.jobUid,isUser([USER_ROLES.recruiter, USER_ROLES.admin, USER_ROLES.student]), controller.getJobsByUid)
    .delete(validations.jobUid,isUser([USER_ROLES.recruiter]), controller.deleteJobsByUid)
    .patch(validations.jobUid,isUser([USER_ROLES.recruiter]), controller.submitRecruiterRequest);

router.route(APIPaths.JOBS_BY_STUDENT_UID)
    .get(validations.getJobsByStudentUid,isUser([USER_ROLES.recruiter]), controller.getJobsByStudentUid)

router.route(APIPaths.STUDENT_JOB_STATUS)
    .put(validations.updateStudentJobStatus, isUser([USER_ROLES.recruiter]), controller.updateStudentJobStatus);

router.route(APIPaths.JOBS_STATUS)
    .patch(validations.updateJobStatus,isUser([USER_ROLES.recruiter, USER_ROLES.admin]), controller.updateJobStatus);

router.route(APIPaths.APPLY_JOB)
    .post(validations.jobUid,isUser([USER_ROLES.student]), controller.applyStudentJob);

router.route(APIPaths.SAVE_JOB)
    .post(validations.saveStudentJobs,isUser([USER_ROLES.student]), controller.toggleSaveJobStatus);

router.route(APIPaths.CANDIDATES)
    .get(validations.candidates,isUser([USER_ROLES.recruiter]), controller.fetchAppliedCandidates);

export default router;