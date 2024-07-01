import * as APIPaths from '@constants/api_path_constants';
import { USER_ROLES } from '@constants/master_data_constants';
import * as MasterData from '@controller/master_data';
import { isAdmin, isUser } from '@middleware/authentication';
import * as validation from '@validations';
import { Router } from 'express';


const router = Router();

router.route(APIPaths.JOB_TYPE)
    .post(validation.validateMasterData, isAdmin, MasterData.saveJobType)
    .get(validation.getMasterData, isUser([USER_ROLES.admin, USER_ROLES.recruiter]), MasterData.getJobTypes)

router.route(APIPaths.JOB_TYPE_BY_UID)
    .get(validation.getJobTypeByUid, isAdmin, MasterData.getJobTypeByUid)
    .put(validation.updateJobType, isAdmin, MasterData.updateJobType)
    .delete(isAdmin, MasterData.deleteJobType)

router.route(APIPaths.EMPLOYMENT_TYPE)
    .post(validation.validateMasterData, isAdmin, MasterData.saveEmploymentType)
    .get(validation.getMasterData, isUser([USER_ROLES.admin, USER_ROLES.recruiter]), MasterData.getEmploymentTypes)

router.route(APIPaths.EMPLOYMENT_TYPE_BY_UID)
    .put(validation.updateEmploymentType, isAdmin, MasterData.updateEmploymentType)
    .delete(isAdmin, MasterData.deleteEmploymentType)
    .get(isAdmin, MasterData.getEmploymentTypeByUid)

router.route(APIPaths.JOB_SHIFTS)
    .post(validation.validateMasterData, isAdmin, MasterData.saveJobShifts)
    .get(validation.getMasterData, isUser([USER_ROLES.admin, USER_ROLES.recruiter]), MasterData.getJobShifts)

router.route(APIPaths.JOB_SHIFTS_BY_UID)
    .put(validation.updateJobShifts, isAdmin, MasterData.updateJobShifts)
    .delete(isAdmin, MasterData.deleteJobShifts)
    .get(validation.getJobShiftsByUid, isAdmin, MasterData.getJobShiftsByUid)

router.route(APIPaths.SKILLS)
    .post(validation.validateMasterDataWithCategoryId, isAdmin, MasterData.saveSkill)
    .get(validation.getMasterData, isUser([USER_ROLES.admin, USER_ROLES.recruiter]), MasterData.getSkills)

router.route(APIPaths.SKILLS_BY_UID)
    .put(validation.updateSkill, isAdmin, MasterData.updateSkill)
    .delete(isAdmin, MasterData.deleteSkill)
    .get(validation.fetchSkillByUid, isAdmin, MasterData.getSkillByUid)


router.route(APIPaths.TOOLS)
    .post(validation.validateMasterDataWithCategoryId, isAdmin, MasterData.saveTool)
    .get(validation.getMasterData, isUser([USER_ROLES.admin, USER_ROLES.recruiter]), MasterData.getTools)

router.route(APIPaths.TOOLS_BY_UID)
    .put(validation.updateTool, isAdmin, MasterData.updateTool)
    .delete(isAdmin, MasterData.deleteTool)
    .get(validation.fetchToolByUid, isAdmin, MasterData.getToolsByUid)


router.route(APIPaths.INTERVIEW_ROUNDS)
    .post(validation.validateMasterDataWithCategoryId, isAdmin, MasterData.saveInterviewRound)
    .get(validation.getMasterData, isUser([USER_ROLES.admin, USER_ROLES.recruiter]), MasterData.getInterviewRounds)

router.route(APIPaths.INTERVIEW_ROUNDS_BY_UID)
    .put(validation.updateInterviewRound, isAdmin, MasterData.updateInterviewRound)
    .delete(isAdmin, MasterData.deleteInterviewRound)
    .get(validation.fetchInterviewRoundByUid, isAdmin, MasterData.getInterviewRoundsByUid)

router.route(APIPaths.COURSE_CATEGORY)
    .post(validation.saveCourseCategory, isAdmin, MasterData.saveCourseCategory)
    .get(isUser([USER_ROLES.admin, USER_ROLES.recruiter]), MasterData.getCourseCategories)

router.route(APIPaths.COURSE_CATEGORY_BY_ID)
    .put(validation.updateCourseCategory, isAdmin, MasterData.updateCourseCategory)
    .delete(isAdmin, MasterData.deleteCourseCategory)
    .get(validation.getCourseCategoriesByUid, isAdmin, MasterData.getCourseCategoriesByUid)


export default router;