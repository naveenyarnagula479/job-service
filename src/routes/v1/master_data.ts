import * as APIPaths from '@constants/api_path_constants';
import * as MasterData from '@controller/master_data';
import { isAdmin } from '@middleware/authentication';
import * as validation from '@validations';
import { Router } from 'express';


const router = Router();

router.route(APIPaths.JOB_TYPE)
    .post(validation.validateMasterData, isAdmin, MasterData.saveJobType)
    .get(isAdmin, MasterData.getJobTypes)

router.route(APIPaths.JOB_TYPE_BY_UID)
    .get(isAdmin, MasterData.getJobTypeByUid)
    .put(isAdmin, MasterData.updateJobType)
    .delete(isAdmin, MasterData.deleteJobType)

router.route(APIPaths.EMPLOYMENT_TYPE)
    .post(validation.validateMasterData, isAdmin, MasterData.saveEmploymentType)
    .get(isAdmin, MasterData.getEmploymentTypes)
    
router.route(APIPaths.EMPLOYMENT_TYPE_BY_UID)
    .put(isAdmin, MasterData.updateEmploymentType)
    .delete(isAdmin, MasterData.deleteEmploymentType)
    .get(isAdmin, MasterData.getEmploymentTypeByUid)

router.route(APIPaths.JOB_SHIFTS)
    .post(validation.validateMasterData, isAdmin, MasterData.saveJobShifts)
    .get(isAdmin, MasterData.getJobShifts)
    
router.route(APIPaths.JOB_SHIFTS_BY_UID)
    .put(isAdmin, MasterData.updateJobShifts)
    .delete(isAdmin, MasterData.deleteJobShifts)
    .get(isAdmin, MasterData.getJobShiftsByUid)

router.route(APIPaths.SKILLS)
    .post(isAdmin, MasterData.saveSkill)
    .get(isAdmin, MasterData.getSkills)
    
router.route(APIPaths.SKILLS_BY_UID)
    .put(isAdmin, MasterData.updateSkill)
    .delete(isAdmin, MasterData.deleteSkill)
    .get(isAdmin, MasterData.getSkillByUid)


router.route(APIPaths.TOOLS)
    .post(isAdmin, MasterData.saveTool)
    .get(isAdmin, MasterData.getTools)

router.route(APIPaths.TOOLS_BY_UID)
    .put(isAdmin, MasterData.updateTool)
    .delete(isAdmin, MasterData.deleteTool)
    .get(isAdmin, MasterData.getToolsByUid)


router.route(APIPaths.INTERVIEW_ROUNDS)
    .post(isAdmin, MasterData.saveInterviewRound)
    .get(isAdmin, MasterData.getInterviewRounds)

router.route(APIPaths.INTERVIEW_ROUNDS_BY_UID)
    .put(isAdmin, MasterData.updateInterviewRound)
    .delete(isAdmin, MasterData.deleteInterviewRound)
    .get(isAdmin, MasterData.getInterviewRoundsByUid)

router.route(APIPaths.COURSE_CATEGORY)
    .post(isAdmin, MasterData.saveCourseCategory)
    .get(isAdmin, MasterData.getCourseCategories)

router.route(APIPaths.COURSE_CATEGORY_BY_ID)
    .put(isAdmin, MasterData.updateCourseCategory)
    .delete(isAdmin, MasterData.deleteCourseCategory)
    .get(isAdmin, MasterData.getCourseCategoriesByUid)













export default router;