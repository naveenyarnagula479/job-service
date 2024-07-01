import { QueryParams } from "@constants/api_param_constants"
import { fetchRecord, fetchRecords, saveRecord, updateRecord } from "@db/helpers/query_execution"
import logger from "@logger"
import { IMasterData, IUserSession } from "@models"
import { toCamelCase } from "@utils/formatter"
import crypto from 'crypto'
import { PoolClient } from "pg"

const TAG = "data_stores_mysql_lib_master_data"

export async function checkJobTypeNameExist(connection: PoolClient, payload: IMasterData, jobTypeUid?: string): Promise<any> {
    logger.info(`${TAG}.checkJobTypeNameExist() ===> `, payload);
    try {
        let query: string = `select * from job_types where name ILIKE $1 and is_deleted = false `;
        if (jobTypeUid) {
            query += ` and uid != '${jobTypeUid}'`
        }
        const result = await fetchRecord(connection, query, [payload.name]);
        return toCamelCase(result);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.checkJobTypeNameExist() `, error);
        throw error;
    }
}

export async function checkJobTypeUidExist(connection: PoolClient, jobTypeUid: string): Promise<any> {
    logger.info(`${TAG}.checkJobTypeUidExist()`);
    try {
        const query: string = `select * from job_types where uid = $1 and is_deleted = false`;
        const result = await fetchRecord(connection, query, [jobTypeUid]);
        return toCamelCase(result);
    } catch (error) {
        logger.error(`Error occured in ${TAG}.checkJobTypeUidExist()`, error);
        throw error;
    }
}

export async function checkEmploymentTypeNameExist(connection: PoolClient, employmentDetails: IMasterData, employmentTypeUid?: string): Promise<any> {
    logger.info(`${TAG}.checkEmploymentTypeNameExist()`);
    try {
        let query: string = `select * from employment_types where name ILIKE $1 and is_deleted = false `;
        if (employmentTypeUid) {
            query += ` and uid != '${employmentTypeUid}'`
        }
        const result = await fetchRecord(connection, query, [employmentDetails.name])
        return toCamelCase(result);
    } catch (error) {
        logger.error(`Error occured in ${TAG}.checkEmploymentTypeNameExist()`, error);
        throw error;
    }
}

export async function checkJobShiftsNameExist(connection: PoolClient, jobShiftDetails: IMasterData, jobShiftUid?: string): Promise<any> {
    logger.info(`${TAG}.checkJobShiftsNameExist()`);
    try {
        let query: string = `select * from job_shifts where name ILIKE $1 and is_deleted = false `;
        if (jobShiftUid) {
            query += ` and uid != '${jobShiftUid}'`;
        }
        const result = await fetchRecord(connection, query, [jobShiftDetails.name])
        return toCamelCase(result);
    } catch (error) {
        logger.error(`Error occured in ${TAG}.checkJobShiftsNameExist()`, error);
        throw error;
    }
}

export async function checkEmploymentTypeUidExist(connection: PoolClient, employmentTypeUid: string): Promise<any> {
    logger.info(`${TAG}.checkEmploymentTypeUidExist()`);
    try {
        const query: string = `select * from employment_types where uid = $1 and is_deleted = false`;
        const result = await fetchRecord(connection, query, [employmentTypeUid]);
        return toCamelCase(result);
    } catch (error) {
        logger.error(`Error occured in ${TAG}.checkEmploymentTypeUidExist()`, error);
        throw error;
    }
}

export async function checkJobShiftsUidExist(connection: PoolClient, jobShiftsUid: string): Promise<any> {
    logger.info(`${TAG}.checkJobShiftsUidExist()`);
    try {
        const query: string = `select * from job_shifts where uid = $1 and is_deleted = false`;
        const result = await fetchRecord(connection, query, [jobShiftsUid]);
        return toCamelCase(result);
    } catch (error) {
        logger.error(`Error occured in ${TAG}.checkJobShiftsUidExist()`, error);
        throw error;
    }
}

export async function saveJobType(connection: PoolClient, jobTypeDetails: IMasterData, userSession: IUserSession): Promise<any> {
    logger.info(`${TAG}.saveJobType() `);
    try {
        const uid = crypto.randomUUID()
        const query: string = `insert into job_types ( name,uid, created_at, created_by, created_by_name) values ($1,$2,$3,$4, $5)`
        const result = await saveRecord(connection, query, [
            jobTypeDetails.name,
            uid,
            new Date(),
            userSession.userId,
            userSession.userName
        ])
        return uid
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.saveJobType() `, error);
        throw error;
    }
}

export async function updateJobType(connection: PoolClient, jobTypeUid: string, jobTypeDetails: IMasterData, userSession: IUserSession) {
    logger.info(`${TAG}.updateJobType()`);
    try {
        const query: string = `update job_types set name = $1, updated_by = $2, updated_by_name = $4, updated_at = NOW() where uid = $3 `;
        const result = await updateRecord(connection, query, [
            jobTypeDetails.name,
            userSession.userId,
            jobTypeUid,
            userSession.userName
        ])
        return jobTypeUid
    } catch (error) {
        logger.error(`Error Occured in ${TAG}.updateJobType()`, error)
        throw error
    }
}

export async function deleteJobType(connection: PoolClient, jobTypeUid: string, userSession: IUserSession) {
    logger.info(`${TAG}.deleteJobType()`);
    try {
        const query: string = `update job_types set is_deleted = true , updated_by = $1,updated_by_name = $2 , updated_at = now() where uid = $3`;
        const result = await updateRecord(connection, query, [
            userSession.userId,
            userSession.userName,
            jobTypeUid
        ])
        return jobTypeUid
    } catch (error) {
        logger.error(`Error occured in ${TAG}.deleteJobType()`, error);
        throw error
    }
}

export async function getJobTypesWithPagination(connection: PoolClient, queryParams: any): Promise<any> {
    logger.info(`${TAG}.getJobTypesWithPagination()`);
    try {
        let listQuery: string = `select * from job_types where is_deleted = false  `;
        let countQuery: string = `select count(*) from job_types where is_deleted = false `;
        let where = ` `;
        if (queryParams.searchText) {
            where += ` and name ilike '%${queryParams.searchText}%' `
        }
        countQuery = countQuery + where;
        where += ` order by id desc `
        if (queryParams.isPaginated) {
            if (typeof queryParams.pageSize !== 'undefined') {
                where += ` LIMIT ${queryParams.pageSize} `
            }
            if (typeof queryParams.pageNum !== 'undefined') {
                where += ` OFFSET ${(queryParams.pageNum - 1) * queryParams.pageSize}`
            }
        }
        let finalQuery = listQuery + where;
        const list = toCamelCase(await fetchRecords(connection, finalQuery, []));
        const totalResultsCount = await fetchRecord(connection, countQuery, []);
        return { list, totalResultsCount };
    } catch (error) {
        logger.error(`Error occurred in ${TAG}.getJobTypesWithPagination()`, error);
        throw error;
    }
}

export async function getJobTypeByUid(connection: PoolClient, jobTypeUid: string) {
    logger.info(`${TAG}.getJobTypeByUid()`);
    try {
        const query: string = `select * from job_types where uid = $1 and is_deleted = false`;
        const result = await fetchRecord(connection, query, [jobTypeUid]);
        return toCamelCase(result)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.getJobTypeByUid()`, error);
        throw error
    }
}

export async function saveEmploymentType(connection: PoolClient, employmentDetails: IMasterData, userSession: IUserSession) {
    logger.info(`${TAG}.saveEmploymentType() `);
    const uid = crypto.randomUUID();
    try {
        const query: string = `insert into employment_types (uid, name, created_at, created_by, created_by_name) values ($1,$2,$3, $4, $5)`
        const result = await saveRecord(connection, query, [
            uid,
            employmentDetails.name,
            new Date(),
            userSession.userId,
            userSession.userName
        ])
        return uid
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.saveEmploymentType() `, error);
        throw error;
    }
}

export async function updateEmploymentType(connection: PoolClient, employmentTypeUid: string, employmentDetails: IMasterData, userSession: IUserSession) {
    logger.info(`${TAG}.updateEmploymentType()`);
    try {
        const query: string = `update employment_types set name = $1,  updated_by = $2, updated_at = now(), updated_by_name = $4 where uid = $3 `;
        const result = await updateRecord(connection, query, [
            employmentDetails.name,
            userSession.userId,
            employmentTypeUid,
            userSession.userName
        ])
        return employmentTypeUid
    } catch (error) {
        logger.error(`Error Occured in ${TAG}.updateEmploymentType()`, error)
        throw error
    }
}

export async function deleteEmploymentType(connection: PoolClient, employmentTypeUid: string, userSession) {
    logger.info(`${TAG}.deleteEmploymentType()`);
    try {
        const query: string = `update employment_types set is_deleted = true , updated_by = $1, updated_at = now(), updated_by_name = $3 where uid = $2`;
        const result = await updateRecord(connection, query, [
            userSession.userId,
            employmentTypeUid,
            userSession.userName
        ])
        return employmentTypeUid
    } catch (error) {
        logger.error(`Error occured in ${TAG}.deleteEmploymentType()`, error);
        throw error
    }

}

export async function getEmploymentTypesWithPagination(connection: PoolClient, userSession: IUserSession, queryParams: any): Promise<any> {
    logger.info(`${TAG}.getEmploymentTypesWithPagination()`);
    try {
        let listQuery: string = `select * from employment_types where is_deleted = false  `;
        let countQuery: string = `select count(*) from employment_types where is_deleted = false `;
        let where = ` `;
        if (queryParams.searchText) {
            where += ` and name ilike '%${queryParams.searchText}%' `
        }
        countQuery = countQuery + where;
        where += ` order by id desc `
        if (queryParams.isPaginated) {
            if (typeof queryParams.pageSize !== 'undefined') {
                where += ` LIMIT ${queryParams.pageSize} `
            }
            if (typeof queryParams.pageNum !== 'undefined') {
                where += ` OFFSET ${(queryParams.pageNum - 1) * queryParams.pageSize}`
            }
        }
        let finalQuery = listQuery + where;
        const list = toCamelCase(await fetchRecords(connection, finalQuery, []));
        const totalResultsCount = await fetchRecord(connection, countQuery, []);
        return { list, totalResultsCount };
    } catch (error) {
        logger.error(`Error occured in ${TAG}.getEmploymentTypesWithPagination()`, error);
        throw error
    }
}

export async function getEmploymentTypeByUid(connection: PoolClient, employmentTypeUid: string, userSession: IUserSession) {
    logger.info(`${TAG}.getEmploymentTypeByUid()`);
    try {
        const query: string = `select * from employment_types where uid = $1 and is_deleted = false`;
        const result = await fetchRecord(connection, query, [employmentTypeUid]);
        return toCamelCase(result)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.getEmploymentTypeByUid()`, error);
        throw error
    }
}



export async function saveJobShifts(connection: PoolClient, jobShiftDetails: IMasterData, userSession: IUserSession) {
    logger.info(`${TAG}.saveJobShifts() `);
    const uid = crypto.randomUUID();
    try {
        const query: string = `insert into job_shifts (uid, name, created_at, created_by, created_by_name) values ($1,$2,$3, $4, $5)`
        const result = await saveRecord(connection, query, [
            uid,
            jobShiftDetails.name,
            new Date(),
            userSession.userId,
            userSession.userName
        ])
        return uid
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.saveJobShifts() `, error);
        throw error;
    }
}

export async function updateJobShifts(connection: PoolClient, jobShiftUid: string, jobShiftDetails: IMasterData, userSession: IUserSession) {
    logger.info(`${TAG}.updateJobShifts()`);
    try {
        const query: string = `update job_shifts set name = $1,  updated_by = $2, updated_at = now(), updated_by_name = $4 where uid = $3 `;
        const result = await updateRecord(connection, query, [
            jobShiftDetails.name,
            userSession.userId,
            jobShiftUid,
            userSession.userName
        ])
        return jobShiftUid
    } catch (error) {
        logger.error(`Error Occured in ${TAG}.updateJobShifts()`, error)
        throw error
    }
}

export async function deleteJobShifts(connection: PoolClient, jobShiftUid: string, userSession: IUserSession) {
    logger.info(`${TAG}.deleteJobShifts()`);
    try {
        const query: string = `update job_shifts set is_deleted = true , updated_by = $1, updated_at = now(), updated_by_name = $3 where uid = $2`;
        const result = await updateRecord(connection, query, [
            userSession.userId,
            jobShiftUid,
            userSession.userName
        ])
        return jobShiftUid
    } catch (error) {
        logger.error(`Error occured in ${TAG}.deleteJobShifts()`, error);
        throw error
    }

}

export async function getJobShiftsWithPagination(connection: PoolClient, userSession: IUserSession, queryParams: any): Promise<any> {
    logger.info(`${TAG}.getJobShiftsWithPagination()`);
    try {
        let listQuery: string = `select * from job_shifts where is_deleted = false `;
        let countQuery: string = `select count(*) from job_shifts where is_deleted = false `;
        let where = ` `;
        if (queryParams.searchText) {
            where += ` and name ilike '%${queryParams.searchText}%' `
        }
        countQuery = countQuery + where;
        where += ` order by id desc `
        if (queryParams.isPaginated) {
            if (typeof queryParams.pageSize !== 'undefined') {
                where += ` LIMIT ${queryParams.pageSize} `
            }
            if (typeof queryParams.pageNum !== 'undefined') {
                where += ` OFFSET ${(queryParams.pageNum - 1) * queryParams.pageSize}`
            }
        }
        let finalQuery = listQuery + where;
        const list = toCamelCase(await fetchRecords(connection, finalQuery, []));
        const totalResultsCount = await fetchRecord(connection, countQuery, []);
        return { list, totalResultsCount };
    } catch (error) {
        logger.error(`Error occured in ${TAG}.getJobShiftsWithPagination()`, error);
        throw error
    }
}

export async function getJobShiftsByUid(connection: PoolClient, jobShiftUid: string, userSession: IUserSession) {
    logger.info(`${TAG}.getJobShiftsByUid()`);
    try {
        const query: string = `select * from job_shifts where uid = $1 and is_deleted = false`;
        const result = await fetchRecord(connection, query, [jobShiftUid]);
        return toCamelCase(result)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.getJobShiftsByUid()`, error);
        throw error
    }
}


export async function checkCategoryIdExist(connection: PoolClient, categoryId: number): Promise<any> {
    logger.info(`${TAG}.checkCategoryIdExist()`);
    try {
        const query: string = `select * from course_categories where id= $1 and is_deleted = false`;
        const result = await fetchRecord(connection, query, [categoryId]);
        return toCamelCase(result);;
    } catch (error) {
        logger.error(`Error occured in ${TAG}.checkCategoryIdExist()`, error);
        throw error;
    }
}

export async function checkProgramExist(connection: PoolClient, programId: number) {
    logger.info(`${TAG}.checkProgramExist()`);
    try {
        const query: string = `select * from programs where id= $1`;
        const result = await fetchRecord(connection, query, [programId]);
        return result;
    } catch (error) {
        logger.error(`Error occured in ${TAG}.checkProgramExist()`, error);
        throw error;
    }
}

export async function checkSkillNameExist(connection: PoolClient, skillDetails: IMasterData, skillUid?: string): Promise<any> {
    logger.info(`${TAG}.checkSkillNameExist()`);
    try {
        let query: string = `select * from skills where name ILIKE $1 and course_category_id = $2 and is_deleted = false `;
        if (skillUid) {
            query += ` and uid != '${skillUid}'`;
        }
        const result = await fetchRecord(connection, query, [skillDetails.name, skillDetails.categoryId]);
        return toCamelCase(result);
    } catch (error) {
        logger.error(`Error occured in ${TAG}.checkSkillNameExist()`, error);
        throw error;
    }
}



export async function checkSkillUidExist(connection: PoolClient, skillUid: string): Promise<any> {
    logger.info(`${TAG}.checkSkillUidExist()`);
    try {
        const query: string = `select s.name, s.uid, cc.id as category_id, cc.category_name , s.is_deleted, s.created_by, s.created_by_name,
        s.created_at,s.updated_by, s.updated_at, s.updated_by_name from skills s join course_categories cc
         on s.course_category_id = cc.id where s.is_deleted = false and s.uid = $1`;
        const result = await fetchRecord(connection, query, [skillUid]);
        return toCamelCase(result);
    } catch (error) {
        logger.error(`Error occured in ${TAG}.checkSkillUidExist()`, error);
        throw error;
    }
}

export async function checkToolNameExist(connection: PoolClient, toolDetails: IMasterData, toolUid?: string): Promise<any> {
    logger.info(`${TAG}.checkToolNameExist()`);
    try {
        let query: string = `select * from tools where name ILIKE $1 and course_category_id = $2 and is_deleted = false `;
        if (toolUid) {
            query += ` and uid != '${toolUid}'`;
        }
        const result = await fetchRecord(connection, query, [toolDetails.name, toolDetails.categoryId])
        return toCamelCase(result);
    } catch (error) {
        logger.error(`Error occured in ${TAG}.checkToolNameExist()`, error);
        throw error;
    }
}

export async function checkInterviewRoundNameExist(connection: PoolClient, interviewRoundDetails: IMasterData, interviewRoundUid?: string) {
    logger.info(`${TAG}.checkInterviewRoundNameExist()`);
    try {
        let query: string = `select * from interview_rounds where name ILIKE $1 and course_category_id = $2 and is_deleted = false `;
        if (interviewRoundUid) {
            query += ` and uid != '${interviewRoundUid}'`
        }
        const result = await fetchRecord(connection, query, [interviewRoundDetails.name, interviewRoundDetails.categoryId])
        return toCamelCase(result);
    } catch (error) {
        logger.error(`Error occured in ${TAG}.checkInterviewRoundNameExist()`, error);
        throw error;
    }
}

export async function checkCategoryNameExist(connection: PoolClient, courseCategoryDetails: IMasterData, categoryUid?: string) {
    logger.info(`${TAG}.checkCategoryNameExist()`);
    try {
        let query: string = `select * from course_categories where category_name ILIKE $1 and is_deleted = false `;
        if (categoryUid) {
            query += ` and uid != '${categoryUid}'`;
        }
        const result = await fetchRecord(connection, query, [courseCategoryDetails.name])
        return toCamelCase(result);
    } catch (error) {
        logger.error(`Error occured in ${TAG}.checkCategoryNameExist()`, error);
        throw error;
    }
}

export async function checkInterviewRoundUidExist(connection: PoolClient, interViewRoundUid: string) {
    logger.info(`${TAG}.checkInterviewRoundUidExist()`);
    try {
        const query: string = `select ir.name, ir.uid, cc.id as category_id, cc.category_name, ir.is_deleted, ir.created_by, 
        ir.created_by_name, ir.created_at, ir.updated_by, ir.updated_at, ir.updated_by_name from interview_rounds ir
         join course_categories cc on ir.course_category_id = cc.id where ir.is_deleted = false and ir.uid = $1`;
        const result = await fetchRecord(connection, query, [interViewRoundUid]);
        return toCamelCase(result);
    } catch (error) {
        logger.error(`Error occured in ${TAG}.checkInterviewRoundUidExist()`, error);
        throw error;
    }
}



export async function checkToolUidExist(connection: PoolClient, toolUid: string): Promise<any> {
    logger.info(`${TAG}.checkToolUidExist()`);
    try {
        const query: string = `select t.name,t.uid, cc.id as category_id, cc.category_name, t.is_deleted, t.created_by, t.created_by_name,
         t.created_at, t.updated_by, t.updated_at, t.updated_by_name from tools t join course_categories cc on
          t.course_category_id = cc.id where t.uid = $1 and t.is_deleted = false`;
        const result = await fetchRecord(connection, query, [toolUid]);
        return toCamelCase(result);
    } catch (error) {
        logger.error(`Error occured in ${TAG}.checkToolUidExist()`, error);
        throw error;
    }
}


export async function saveSkill(connection: PoolClient, skillDetails: IMasterData, userSession: IUserSession) {
    logger.info(`${TAG}.saveSkill() `);
    const uid = crypto.randomUUID();
    try {
        const query: string = `insert into skills(uid, name, course_category_id, created_at, created_by, created_by_name) values($1, $2, $3, $4, $5, $6)`
        const result = await saveRecord(connection, query, [
            uid,
            skillDetails.name,
            skillDetails.categoryId,
            new Date(),
            userSession.userId,
            userSession.userName
        ])
        return uid
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.saveSkill() `, error);
        throw error;
    }
}


export async function updateSkill(connection: PoolClient, skillDetails: IMasterData, skillUid: string, userSession: IUserSession) {
    logger.info(`${TAG}.updateSkill() `);
    try {
        const query: string = `update skills set name = $1, course_category_id = $2, updated_at = $3, updated_by = $4, updated_by_name = $5  where uid = $6`
        const result = await updateRecord(connection, query, [
            skillDetails.name,
            skillDetails.categoryId,
            new Date(),
            userSession.userId,
            userSession.userName,
            skillUid
        ])
        return skillUid
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.updateSkill() `, error);
        throw error;
    }
}

export async function deleteSkill(connection: PoolClient, skillUid: string, userSession: IUserSession) {
    logger.info(`${TAG}.deleteSkill() `);
    try {
        const query: string = `update skills set is_deleted = true, updated_at = $1, updated_by = $2, updated_by_name = $3  where uid = $4`
        const result = await updateRecord(connection, query, [
            new Date(),
            userSession.userId,
            userSession.userName,
            skillUid
        ])
        return skillUid
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.deleteSkill() `, error);
        throw error;
    }
}

export async function getSkillsWithPagination(connection: PoolClient, queryParams: any): Promise<any> {
    logger.info(`${TAG}.getSkillsWithPagination() `);
    try {
        let listQuery: string = `select s.id, s.name, s.uid, cc.id as category_id, cc.category_name, s.is_deleted, s.created_by, s.created_by_name,
         s.created_at, s.updated_by, s.updated_at, s.updated_by_name from skills s join course_categories cc on 
         s.course_category_id = cc.id `
        let countQuery: string = `select count(s.*) from skills s join course_categories cc on 
         s.course_category_id = cc.id `;
        let where = ``
        if (queryParams.categoryId) {
            where += ` where s.course_category_id = ${queryParams.categoryId} and s.is_deleted = false `
        } else {
            where += ` where s.is_deleted = false `
        }

        if (queryParams.searchText) {
            where += ` and (s.name ilike '%${queryParams.searchText}%' or cc.category_name ilike '%${queryParams.searchText}%') `
        }
        countQuery = countQuery + where;
        where += ` order by s.id desc `
        if (typeof queryParams.pageSize !== 'undefined') {
            where += ` LIMIT ${queryParams.pageSize} `
        }
        if (typeof queryParams.pageNum !== 'undefined') {
            where += ` OFFSET ${(queryParams.pageNum - 1) * queryParams.pageSize}`
        }
        let finalQuery = listQuery + where;
        const list = toCamelCase(await fetchRecords(connection, finalQuery, []));
        const totalResultsCount = await fetchRecord(connection, countQuery, []);
        return { list, totalResultsCount };
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getSkillsWithPagination() `, error);
        throw error;
    }
}

export async function getSkillByUid(connection: PoolClient, skillUid: string, userSession: IUserSession) {
    logger.info(`${TAG}.getSkillByUid() `);
    try {
        const query: string = `select s.name, cc.category_name, s.is_deleted, s.created_by, s.created_by_name, s.created_at, s.updated_by, s.updated_at, s.updated_by_name from skills s join course_categories cc on s.course_category_id = cc.id where uid = $1 and s.is_deleted = false`;
        const result = await fetchRecord(connection, query, [skillUid]);
        return result
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getSkillByUid() `, error);
        throw error;
    }
}




export async function saveTool(connection: PoolClient, toolDetails: IMasterData, userSession: IUserSession) {
    logger.info(`${TAG}.saveTool() `);
    const uid = crypto.randomUUID();
    try {
        const query: string = `insert into tools(uid, name, course_category_id, created_at, created_by, created_by_name) values($1, $2, $3, $4, $5, $6)`
        const result = await saveRecord(connection, query, [
            uid,
            toolDetails.name,
            toolDetails.categoryId,
            new Date(),
            userSession.userId,
            userSession.userName
        ])
        return uid
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.saveTool() `, error);
        throw error;
    }
}


export async function updateTool(connection: PoolClient, toolDetails: IMasterData, toolUid: string, userSession: IUserSession) {
    logger.info(`${TAG}.updateTool() `);
    try {
        const query: string = `update tools set name = $1, course_category_id = $2, updated_at = $3, updated_by = $4, updated_by_name = $5  where uid = $6`
        const result = await updateRecord(connection, query, [
            toolDetails.name,
            toolDetails.categoryId,
            new Date(),
            userSession.userId,
            userSession.userName,
            toolUid
        ])
        return toolUid
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.updateTool() `, error);
        throw error;
    }
}

export async function deleteTool(connection: PoolClient, toolUid: string, userSession: IUserSession) {
    logger.info(`${TAG}.deleteTool() `);
    try {
        const query: string = `update tools set is_deleted = true, updated_at = $1, updated_by = $2, updated_by_name = $3  where uid = $4`
        const result = await updateRecord(connection, query, [
            new Date(),
            userSession.userId,
            userSession.userName,
            toolUid
        ])
        return toolUid
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.deleteTool() `, error);
        throw error;
    }
}

export async function getToolsWithPagination(connection: PoolClient, queryParams: any, userSession: IUserSession): Promise<any> {
    logger.info(`${TAG}.getToolsWithPagination() `);
    try {
        let listQuery: string = `select t.id, t.name, t.uid, cc.id as category_id, cc.category_name, t.is_deleted, t.created_by, t.created_by_name,
         t.created_at, t.updated_by, t.updated_at, t.updated_by_name from tools t join course_categories cc on
          t.course_category_id = cc.id `
        let countQuery: string = `select count(t.*) from tools t join course_categories cc on
           t.course_category_id = cc.id `
        let where = ``;
        if (queryParams.categoryId) {
            where += ` where t.course_category_id = ${queryParams.categoryId} and t.is_deleted = false `
        } else {
            where += ` where t.is_deleted = false `
        }

        if (queryParams.searchText) {
            where += ` and (t.name ilike '%${queryParams.searchText}%' or cc.category_name ilike '%${queryParams.searchText}%') `
        }
        countQuery = countQuery + where;
        where += ` order by t.id desc `
        if (queryParams.isPaginated) {

            if (typeof queryParams.pageSize !== 'undefined') {
                where += ` LIMIT ${queryParams.pageSize} `
            }
            if (typeof queryParams.pageNum !== 'undefined') {
                where += ` OFFSET ${(queryParams.pageNum - 1) * queryParams.pageSize}`
            }
        }
        let finalQuery = listQuery + where;
        const list = toCamelCase(await fetchRecords(connection, finalQuery, []));
        const totalResultsCount = await fetchRecord(connection, countQuery, []);
        return { list, totalResultsCount };
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getToolsWithPagination() `, error);
        throw error;
    }
}

export async function getToolsByUid(connection: PoolClient, toolUid: string, userSession: IUserSession) {
    logger.info(`${TAG}.getToolsByUid() `);
    try {
        const query: string = `select t.name, cc.category_name, t.is_deleted, t.created_by, t.created_by_name, t.created_at, t.updated_by, t.updated_at, t.updated_by_name from tools t join course_categories cc on t.course_category_id = cc.id where uid = $1 and t.is_deleted = false`;
        const result = await fetchRecord(connection, query, [toolUid]);
        return result
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getToolsByUid() `, error);
        throw error;
    }
}


export async function saveInterviewRound(connection: PoolClient, interviewRoundDetails: IMasterData, userSession: IUserSession) {
    logger.info(`${TAG}.saveInterviewRound() `);
    const uid = crypto.randomUUID();
    try {
        const query: string = `insert into interview_rounds(uid, name, course_category_id, created_at, created_by, created_by_name) values($1, $2, $3, $4, $5, $6)`
        const result = await saveRecord(connection, query, [
            uid,
            interviewRoundDetails.name,
            interviewRoundDetails.categoryId,
            new Date(),
            userSession.userId,
            userSession.userName
        ])
        return uid
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.saveInterviewRound() `, error);
        throw error;
    }
}


export async function updateInterviewRound(connection: PoolClient, interviewRoundDetails: IMasterData, interViewRoundUid: string, userSession: IUserSession) {
    logger.info(`${TAG}.updateInterviewRound() `);
    try {
        const query: string = `update interview_rounds set name = $1, course_category_id = $2, updated_at = $3, updated_by = $4, updated_by_name = $5  where uid = $6`
        const result = await updateRecord(connection, query, [
            interviewRoundDetails.name,
            interviewRoundDetails.categoryId,
            new Date(),
            userSession.userId,
            userSession.userName,
            interViewRoundUid
        ])
        return interViewRoundUid
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.updateInterviewRound() `, error);
        throw error;
    }
}

export async function deleteInterviewRound(connection: PoolClient, interViewRoundUid: string, userSession: IUserSession) {
    logger.info(`${TAG}.deleteInterviewRound() `);
    try {
        const query: string = `update interview_rounds set is_deleted = true, updated_at = $1, updated_by = $2, updated_by_name = $3  where uid = $4`
        const result = await updateRecord(connection, query, [
            new Date(),
            userSession.userId,
            userSession.userName,
            interViewRoundUid
        ])
        return interViewRoundUid
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.deleteInterviewRound() `, error);
        throw error;
    }
}

export async function getInterviewRoundsWithPagination(connection: PoolClient, queryParams: any, userSession: IUserSession): Promise<any> {
    logger.info(`${TAG}.getInterviewRoundsWithPagination() `);
    try {
        let listQuery: string = `select ir.id, ir.name, ir.uid, cc.id as category_id, cc.category_name, ir.is_deleted, ir.created_by, 
        ir.created_by_name, ir.created_at, ir.updated_by, ir.updated_at, ir.updated_by_name from interview_rounds ir
         join course_categories cc on ir.course_category_id = cc.id `
        let countQuery: string = `select count(*) from interview_rounds ir
         join course_categories cc on ir.course_category_id = cc.id `
        let where = ``
        if (queryParams.categoryId) {
            where += ` where ir.course_category_id = ${queryParams.categoryId} and ir.is_deleted = false `
        } else {
            where += ` where ir.is_deleted = false `
        }

        if (queryParams.searchText) {
            where += ` and (ir.name ilike '%${queryParams.searchText}%' or cc.category_name ilike '%${queryParams.searchText}%') `
        }
        countQuery = countQuery + where;
        where += ` order by ir.id desc `
        if (queryParams.isPaginated) {
            if (typeof queryParams.pageSize !== 'undefined') {
                where += ` LIMIT ${queryParams.pageSize} `
            }
            if (typeof queryParams.pageNum !== 'undefined') {
                where += ` OFFSET ${(queryParams.pageNum - 1) * queryParams.pageSize}`
            }
        }
        let finalQuery = listQuery + where;
        const list = toCamelCase(await fetchRecords(connection, finalQuery, []));
        const totalResultsCount = await fetchRecord(connection, countQuery, []);
        return { list, totalResultsCount };
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getInterviewRoundsWithPagination() `, error);
        throw error;
    }
}

export async function getInterviewRoundsByUid(connection: PoolClient, interViewRoundUid: string, userSession: IUserSession) {
    logger.info(`${TAG}.getInterviewRoundsByUid() `);
    try {
        const query: string = ``;
        const result = await fetchRecord(connection, query, [interViewRoundUid]);
        return result
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getInterviewRoundsByUid() `, error);
        throw error;
    }
}


export async function saveCourseCategory(connection: PoolClient, courseCategoryDetails: IMasterData, userSession: IUserSession) {
    logger.info(`${TAG}.saveCourseCategory() `);
    try {
        const uid = crypto.randomUUID();
        const query: string = `insert into course_categories(program_id, uid, category_name, description, created_at, created_by, created_by_name) values($1, $2, $3, $4, $5, $6, $7) returning id`
        const result = await saveRecord(connection, query, [
            courseCategoryDetails.programId,
            uid,
            courseCategoryDetails.name,
            courseCategoryDetails.description,
            new Date(),
            userSession.userId,
            userSession.userName
        ])
        return uid;
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.saveCourseCategory() `, error);
        throw error;
    }
}


export async function updateCourseCategory(connection: PoolClient, courseCategoryDetails: IMasterData, categoryUid: string, userSession: IUserSession) {
    logger.info(`${TAG}.updateCourseCategory() `);
    try {
        const query: string = `update course_categories set program_id = $1, category_name = $2, description = $3, updated_at = $4, updated_by = $5, updated_by_name = $6 where uid = $7 `
        const result = await updateRecord(connection, query, [
            courseCategoryDetails.programId,
            courseCategoryDetails.name,
            courseCategoryDetails.description,
            new Date(),
            userSession.userId,
            userSession.userName,
            categoryUid
        ])
        return categoryUid
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.updateCourseCategory() `, error);
        throw error;
    }
}


export async function deleteCourseCategory(connection: PoolClient, categoryUid: string, userSession: IUserSession) {
    logger.info(`${TAG}.deleteCourseCategory() `);
    try {
        const query: string = `update course_categories set is_deleted = true, updated_at = $1, updated_by = $2, updated_by_name = $3 where uid = $4`
        const result = await updateRecord(connection, query, [
            new Date(),
            userSession.userId,
            userSession.userName,
            categoryUid
        ])
        return categoryUid
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.deleteCourseCategory() `, error);
        throw error;
    }
}

export async function getCourseCategories(connection: PoolClient, userSession: IUserSession) {
    logger.info(`${TAG}.getCourseCategories() `);
    try {
        const query: string = `SELECT  CC.ID, PG.PROGRAM_NAME, CC.CATEGORY_NAME AS NAME, CC.DESCRIPTION  FROM COURSE_CATEGORIES CC JOIN PROGRAMS PG ON CC.PROGRAM_ID = PG.ID WHERE CC.IS_DELETED = false`
        const result = await fetchRecords(connection, query, []);
        return toCamelCase(result);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getCourseCategories() `, error);
        throw error;
    }
}

export async function getCourseCategoriesByUid(connection: PoolClient, categoryUid: string, userSession: IUserSession) {
    logger.info(`${TAG}.getCourseCategoriesByUid() `);
    try {
        const query: string = `SELECT PG.ID AS PROGRAM_ID, PG.PROGRAM_NAME, CC.UID, CC.CATEGORY_NAME AS NAME, CC.DESCRIPTION, CC.CREATED_BY, CC.CREATED_BY_NAME, CC.CREATED_AT, CC.UPDATED_BY, CC.UPDATED_BY_NAME, CC.UPDATED_AT FROM COURSE_CATEGORIES CC JOIN PROGRAMS PG ON CC.PROGRAM_ID = PG.ID WHERE CC.IS_DELETED = false AND CC.UID = $1`;
        const result = await fetchRecord(connection, query, [categoryUid]);
        return toCamelCase(result);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getCourseCategoriesByUid()`, error);
        throw error;
    }
}

export async function getTools(connection: PoolClient, categoryId?: number): Promise<any> {
    logger.info(`${TAG}.getTools() `);
    try {
        const query: string = `SELECT ID, NAME FROM TOOLS WHERE COURSE_CATEGORY_ID = $1`;
        const result = await fetchRecords(connection, query, [categoryId]);
        return toCamelCase(result);
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.getTools() `, error);
        throw error;
    }
}