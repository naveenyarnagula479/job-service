export const ROUTER_DUMMY = '/dummy';
export const ROUTER_TEMPLATES = `/`;
export const ROUTER_JOBS = '/';

export const MASTER_TEMPLATES = '/master-templates';
export const TEMPLATES = '/templates';
export const TEMPLATE_BY_UID =`${TEMPLATES}/:templateUid`;

export const JOBS ='/jobs';
export const JOBS_BY_UID = `${JOBS}/:jobUid`;
export const JOBS_STATUS = `${JOBS_BY_UID}/status`
export const MASTER_DATA = '/master-data'

//paths related to configurational data
export const JOB_TYPE = '/job-type';
export const JOB_TYPE_BY_UID = `${JOB_TYPE}/:jobTypeUid`;

export const EMPLOYMENT_TYPE = '/employment-type';
export const EMPLOYMENT_TYPE_BY_UID =   `${EMPLOYMENT_TYPE}/:employmentTypeUid`;

export const JOB_SHIFTS = '/job-shift';
export const JOB_SHIFTS_BY_UID = `${JOB_SHIFTS}/:jobShiftUid`;

export const SKILLS = '/skill'
export const SKILLS_BY_UID = `${SKILLS}/:skillUid`

export const TOOLS = '/tool'
export const TOOLS_BY_UID =  `${TOOLS}/:toolUid`

export const INTERVIEW_ROUNDS = '/interview-round'
export const INTERVIEW_ROUNDS_BY_UID = `${INTERVIEW_ROUNDS}/:interViewRoundUid`

export const COURSE_CATEGORY = '/course-category'
export const COURSE_CATEGORY_BY_ID = `${COURSE_CATEGORY}/:categoryUid`
