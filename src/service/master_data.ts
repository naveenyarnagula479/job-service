
import { HttpStatusCodes } from "@constants/status_codes";
import { commitTransaction, getConnection, releaseConnection, rollBackTransaction } from "@db/helpers/transaction";
import { MasterData } from "@db/queries";
import logger from "@logger";
import { IBaseListAPIRequest, IListAPIResponse, IMasterData, IServiceResponse, IUserSession, ListAPIResponse, ServiceResponse } from "@models";
const TAG = 'service.master_data'

// job type

export async function saveJobType(jobTypeDetails: IMasterData, UserSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.saveJobType() ==> `, jobTypeDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, "Job type details saved successfully");
  try {
    connection = await getConnection()
    const isNameExist = await MasterData.checkJobTypeNameExist(connection, jobTypeDetails);
    if (isNameExist) {
      serviceResponse.addBadRequestError("job type name already exist")
    } else {
      const jobTypeUid = await MasterData.saveJobType(connection, jobTypeDetails, UserSession)
      serviceResponse.data = { jobTypeUid }
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveJobType() `, error);
    serviceResponse.addServerError('Failed to create job type details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function updateJobType(jobTypeDetails: IMasterData, jobTypeUid: string, userSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.updateJobType() ==> `, jobTypeDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "Job type details updated successfully");
  try {
    connection = await getConnection();
    const isNameExist = await MasterData.checkJobTypeNameExist(connection, jobTypeDetails, jobTypeUid);
    if (!isNameExist) {
      const isExist = await MasterData.checkJobTypeUidExist(connection, jobTypeUid);
      if (!isExist) {
        serviceResponse.addBadRequestError("Job type uid doesn't exist")
      } else {
        await MasterData.updateJobType(connection, jobTypeUid, jobTypeDetails, userSession)
        serviceResponse.data = { jobTypeUid }
      }
    } else {
      serviceResponse.addBadRequestError('Job type name already exist');
    }
  } catch (error) {
    logger.error(`Error occured in ${TAG}.updateJobType()`, error)
    serviceResponse.addServerError('Failed to update job type details due to tech difficulties');
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

export async function deleteJobType(jobTypeUid: string, userSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.deleteJobType()`);
  let connection = null;
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "Job type details deleted successfully");
  try {
    connection = await getConnection();
    const isExist = await MasterData.checkJobTypeUidExist(connection, jobTypeUid);
    if (!isExist) {
      serviceResponse.addBadRequestError("job type uid doesn't exits")
    } else {
      await MasterData.deleteJobType(connection, jobTypeUid, userSession);
      serviceResponse.data = { jobTypeUid }
    }
  } catch (error) {
    logger.error(`Error occured in ${TAG}.deleteJobType()`, error);
    serviceResponse.addServerError('Failed to delete job type due to tech difficulties')
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

export async function getJobTypes(userSession: IUserSession, queryParams: IBaseListAPIRequest): Promise<IServiceResponse> {
  logger.info(`${TAG}.getJobTypes()`);
  let connection = null;
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "Job type details fetched successfully");
  try {
    connection = await getConnection();
    const { list, totalResultsCount } = await MasterData.getJobTypes(connection, queryParams);
    let offset: number = (queryParams.pageNum - 1) * queryParams.pageSize;
    if (offset < 0) {
      offset = 0;
    }
    const responseData: IListAPIResponse = new ListAPIResponse(
      list,
      parseInt(totalResultsCount.count) > (queryParams.pageNum * queryParams.pageSize),
      offset + 1,
      offset + list?.length,
      parseInt(totalResultsCount.count),
      queryParams.sortBy,
      queryParams.sortOrder,
      queryParams.pageNum,
      queryParams.pageSize
    )
    serviceResponse.data = responseData;
  } catch (error) {
    logger.error(`Error occured in ${TAG}.getJobTypes()`, error);
    serviceResponse.addServerError('Failed to fetch job type details due to tech difficulties');
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

export async function getJobTypeByUid(jobTypeUid: string): Promise<IServiceResponse> {
  logger.info(`${TAG}.getJobTypeByUid()`);
  let connection = null;
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "Job type fetched successfully");
  try {
    connection = await getConnection();
    const isJobTypeExist = await MasterData.checkJobTypeUidExist(connection, jobTypeUid);
    if (!isJobTypeExist) {
      serviceResponse.addBadRequestError("job type Uid doesn't exist")
    } else {
      serviceResponse.data = isJobTypeExist
    }

  } catch (error) {
    logger.error(`Error occured in ${TAG}.getJobTypeByUid()`, error);
    serviceResponse.addServerError('Failed to fetch job type details due to tech difficultieds')
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

// employment type

export async function saveEmploymentType(employmentTypeDetails: IMasterData, UserSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.saveEmploymentType() ==> `, employmentTypeDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, "EmploymentType details saved successfully");
  try {
    connection = await getConnection()
    const isNameExist = await MasterData.checkEmploymentTypeNameExist(connection, employmentTypeDetails);
    if (isNameExist) {
      serviceResponse.addBadRequestError("employment type name already exist")
    } else {
      const employmentResponse = await MasterData.saveEmploymentType(connection, employmentTypeDetails, UserSession)
      serviceResponse.data = {
        employmentTypeUid: employmentResponse
      }
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveEmploymentType() `, error);
    serviceResponse.addServerError('Failed to create employment type details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function updateEmploymentType(employmentDetails: IMasterData, employmentTypeUid: string, userSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.updateEmploymentType() ==> `, employmentDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "employment type details updated successfully");
  try {
    connection = await getConnection();
    const isNameExist = await MasterData.checkEmploymentTypeNameExist(connection, employmentDetails, employmentTypeUid);
    if (!isNameExist) {
      const isTypeExist = await MasterData.checkEmploymentTypeUidExist(connection, employmentTypeUid);
      if (!isTypeExist) {
        serviceResponse.addBadRequestError("employment type uid doesn't exist")
      } else {
        await MasterData.updateEmploymentType(connection, employmentTypeUid, employmentDetails, userSession)
        serviceResponse.data = {
          employmentTypeUid
        }
      }
    } else {
      serviceResponse.addBadRequestError("employment type name already exist");
    }
  } catch (error) {
    logger.error(`Error occured in ${TAG}.updateEmploymentType()`, error)
    serviceResponse.addServerError('Failed to update employment type details due to tech difficultied');
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

export async function getEmploymentTypes(userSession: IUserSession, queryParams: any): Promise<IServiceResponse> {
  logger.info(`${TAG}.getEmploymentTypes()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "employment type details fetched successfully");
  try {
    connection = await getConnection();
    const { list, totalResultsCount } = await MasterData.getEmploymentTypes(connection, userSession, queryParams)
    let offset: number = (queryParams.pageNum - 1) * queryParams.pageSize;
    if (offset < 0) {
      offset = 0;
    }
    const responseData: IListAPIResponse = new ListAPIResponse(
      list,
      parseInt(totalResultsCount.count) > (queryParams.pageNum * queryParams.pageSize),
      offset + 1,
      offset + list?.length,
      parseInt(totalResultsCount.count),
      queryParams.sortBy,
      queryParams.sortOrder,
      queryParams.pageNum,
      queryParams.pageSize
    )
    serviceResponse.data = responseData;
  } catch (error) {
    logger.error(`Error occured in ${TAG}.getEmploymentTypes()`, error)
    serviceResponse.addServerError('Failed to  fetch employment type details due to tech difficultied');
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

export async function getEmploymentTypeByUid(employmentTypeUid: string, userSession: IUserSession) {
  logger.info(`${TAG}.getEmploymentTypeByUid()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "employment type fetched successfully");
  try {
    connection = await getConnection();
    const isTypeExist = await MasterData.checkEmploymentTypeUidExist(connection, employmentTypeUid);
    if (!isTypeExist) {
      serviceResponse.addBadRequestError("employment type uid doesn't exist")
    } else {
      serviceResponse.data = isTypeExist
    }

  } catch (error) {
    logger.error(`Error occured in ${TAG}.getEmploymentTypeByUid()`, error)
    serviceResponse.addServerError('Failed to  fetch employment type details due to tech difficultied');
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

export async function deleteEmploymentType(employmentTypeUid: string, userSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.deleteEmploymentType()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "employment type details deleted successfully");
  try {
    connection = await getConnection();
    const isTypeExist = await MasterData.checkEmploymentTypeUidExist(connection, employmentTypeUid);
    if (!isTypeExist) {
      serviceResponse.addBadRequestError("employment type uid doesn't exist")
    } else {
      await MasterData.deleteEmploymentType(connection, employmentTypeUid, userSession)
      serviceResponse.data = {
        employmentTypeUid
      }
    }
  } catch (error) {
    logger.error(`Error occured in ${TAG}.deleteEmploymentType()`, error)
    serviceResponse.addServerError('Failed to delete employment type details due to tech difficultied');
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

// job shifts


export async function saveJobShifts(jobShiftDetails: IMasterData, UserSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.saveJobShifts() ==> `, jobShiftDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, "job shift details saved successfully");
  try {
    connection = await getConnection()
    const isNameExist = await MasterData.checkJobShiftsNameExist(connection, jobShiftDetails);
    if (isNameExist) {
      serviceResponse.addBadRequestError("job shift name already exist")
    } else {
      const jobShiftUid = await MasterData.saveJobShifts(connection, jobShiftDetails, UserSession)
      serviceResponse.data = {
        jobShiftsUid: jobShiftUid
      }
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveJobShifts() `, error);
    serviceResponse.addServerError('Failed to create job shifts details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function updateJobShifts(jobShiftDetails: IMasterData, jobShiftUid: string, userSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.updateJobShifts() ==> `, jobShiftDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "Job shift details updated successfully");
  try {
    connection = await getConnection();
    const isNameExist = await MasterData.checkJobShiftsNameExist(connection, jobShiftDetails, jobShiftUid);
    if (!isNameExist) {
      const isShiftExist = await MasterData.checkJobShiftsUidExist(connection, jobShiftUid);
      if (!isShiftExist) {
        serviceResponse.addBadRequestError("job shift uid doesn't exist")
      } else {
        const jobShiftsReponse = await MasterData.updateJobShifts(connection, jobShiftUid, jobShiftDetails, userSession)
        serviceResponse.data = {
          jobShiftUid: jobShiftsReponse
        }
      }
    } else {
      serviceResponse.addBadRequestError("job shift name already exist");
    }
  } catch (error) {
    logger.error(`Error occured in ${TAG}.updateJobShifts()`, error)
    serviceResponse.addServerError('Failed to update job shifts details due to tech difficulties');
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

export async function deleteJobShifts(jobShiftUid: string, userSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.deleteJobShifts()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "job shifts details deleted successfully");
  try {
    connection = await getConnection();
    const isShiftExist = await MasterData.checkJobShiftsUidExist(connection, jobShiftUid);
    if (!isShiftExist) {
      serviceResponse.addBadRequestError("job shift uid doesn't exist")
    } else {
      await MasterData.deleteJobShifts(connection, jobShiftUid, userSession)
      serviceResponse.data = {
        jobShiftUid
      }
    }
  } catch (error) {
    logger.error(`Error occured in ${TAG}.deleteJobShifts()`, error)
    serviceResponse.addServerError('Failed to delete job shifts details due to tech difficulties');
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

export async function getJobShifts(userSession: IUserSession, queryParams: any): Promise<IServiceResponse> {
  logger.info(`${TAG}.getJobShifts()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "job shifts details fetched successfully");
  try {
    connection = await getConnection();
    const { list, totalResultsCount } = await MasterData.getJobShifts(connection, userSession, queryParams)
    let offset: number = (queryParams.pageNum - 1) * queryParams.pageSize;
    if (offset < 0) {
      offset = 0;
    }
    const responseData: IListAPIResponse = new ListAPIResponse(
      list,
      parseInt(totalResultsCount.count) > (queryParams.pageNum * queryParams.pageSize),
      offset + 1,
      offset + list?.length,
      parseInt(totalResultsCount.count),
      queryParams.sortBy,
      queryParams.sortOrder,
      queryParams.pageNum,
      queryParams.pageSize
    )
    serviceResponse.data = responseData;
  } catch (error) {
    logger.error(`Error occured in ${TAG}.getJobShifts()`, error)
    serviceResponse.addServerError('Failed to  fetch job shifts details due to tech difficulties');
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

export async function getJobShiftsByUid(jobShiftUid: string, userSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.getJobShiftsByUid()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "job shift fetched successfully");
  try {
    connection = await getConnection();
    const isTypeExist = await MasterData.checkJobShiftsUidExist(connection, jobShiftUid);
    if (!isTypeExist) {
      serviceResponse.addBadRequestError("job shift uid doesn't exist")
    } else {
      serviceResponse.data = isTypeExist;
    }

  } catch (error) {
    logger.error(`Error occured in ${TAG}.getJobShiftsByUid()`, error)
    serviceResponse.addServerError('Failed to  fetch job shift details due to tech difficultied');
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

//skills
export async function saveSkill(skillDetails: IMasterData, UserSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.saveSkill() ==> `, skillDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, "skill details saved successfully");
  try {
    connection = await getConnection();
    const isCourseCategoriesExist = await MasterData.checkCategoryIdExist(connection, skillDetails.categoryId)
    if (isCourseCategoriesExist) {
      const isNameExist = await MasterData.checkSkillNameExist(connection, skillDetails);
      if (isNameExist) {
        serviceResponse.addBadRequestError("skill name already exist")
      } else {
        const skillUid = await MasterData.saveSkill(connection, skillDetails, UserSession)
        serviceResponse.data = {
          skillUid
        }
      }
    } else {
      serviceResponse.addBadRequestError("course category doesn't exist")
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveSkill() `, error);
    serviceResponse.addServerError('Failed to create skills details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function updateSkill(skillDetails: IMasterData, skillUid: string, userSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.updateSkill() ==> `, skillDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "skill details updated successfully");
  try {
    connection = await getConnection();
    const isCourseCategoriesExist = await MasterData.checkCategoryIdExist(connection, skillDetails.categoryId)
    if (isCourseCategoriesExist) {
      const isNameExist = await MasterData.checkSkillNameExist(connection, skillDetails, skillUid);
      if (!isNameExist) {
        const isSkillUidExist = await MasterData.checkSkillUidExist(connection, skillUid);
        if (!isSkillUidExist) {
          serviceResponse.addBadRequestError("skill uid doesn't exist")
        } else {
          const skillResponse = await MasterData.updateSkill(connection, skillDetails, skillUid, userSession)
          serviceResponse.data = {
            skillUid: skillResponse
          }
        }
      } else {
        serviceResponse.addBadRequestError("skill name already exist");
      }
    } else {
      serviceResponse.addBadRequestError("course category doesn't exist")
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateSkill() `, error);
    serviceResponse.addServerError('Failed to update skills details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}


export async function deleteSkill(skillUid: string, userSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.deleteSkill()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "skill deleted successfully");
  try {
    connection = await getConnection()
    const isSkillUidExist = await MasterData.checkSkillUidExist(connection, skillUid);
    if (!isSkillUidExist) {
      serviceResponse.addBadRequestError("skill uid doesn't exist")
    } else {
      await MasterData.deleteSkill(connection, skillUid, userSession)
      serviceResponse.data = {
        skillUid
      }
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.deleteSkill() `, error);
    serviceResponse.addServerError('Failed to delete skill details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function getSkills(queryParams: any): Promise<IServiceResponse> {
  logger.info(`${TAG}.getSkills()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "skill details fetched successfully");
  try {
    connection = await getConnection()
    const { list, totalResultsCount } = await MasterData.getSkills(connection, queryParams);
    let offset: number = (queryParams.pageNum - 1) * queryParams.pageSize;
    if (offset < 0) {
      offset = 0;
    }
    const responseData: IListAPIResponse = new ListAPIResponse(
      list,
      parseInt(totalResultsCount.count) > (queryParams.pageNum * queryParams.pageSize),
      offset + 1,
      offset + list?.length,
      parseInt(totalResultsCount.count),
      queryParams.sortBy,
      queryParams.sortOrder,
      queryParams.pageNum,
      queryParams.pageSize
    )
    serviceResponse.data = responseData;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getSkills() `, error);
    serviceResponse.addServerError('Failed to fetched skills details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function getSkillByUid(skillUid: string, userSession: IUserSession) {
  logger.info(`${TAG}.getSkillByUid()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "skill details fetched successfully");
  try {
    connection = await getConnection()
    const isSkillUidExist = await MasterData.checkSkillUidExist(connection, skillUid);
    if (!isSkillUidExist) {
      serviceResponse.addBadRequestError("skill uid doesn't exist")
    } else {
      serviceResponse.data = isSkillUidExist
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getSkillByUid() `, error);
    serviceResponse.addServerError('Failed to fetched skill details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}





//tools

export async function saveTool(toolDetails: IMasterData, UserSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.saveTool() ==> `, toolDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, "tool details saved successfully");
  try {
    connection = await getConnection()
    const isCourseCategoriesExist = await MasterData.checkCategoryIdExist(connection, toolDetails.categoryId)
    if (isCourseCategoriesExist) {
      const isNameExist = await MasterData.checkToolNameExist(connection, toolDetails);
      if (isNameExist) {
        serviceResponse.addBadRequestError("tool name already exist")
      } else {
        const toolUid = await MasterData.saveTool(connection, toolDetails, UserSession)
        serviceResponse.data = {
          toolUid
        }
      }
    } else {
      serviceResponse.addBadRequestError("course category doesn't exist")
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveTool() `, error);
    serviceResponse.addServerError('Failed to create tool details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function updateTool(toolDetails: IMasterData, toolUid: string, userSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.updateTool() ==> `, toolDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "tools details updated successfully");
  try {
    connection = await getConnection()
    const isCourseCategoriesExist = await MasterData.checkCategoryIdExist(connection, toolDetails.categoryId)
    if (isCourseCategoriesExist) {
      const isNameExist = await MasterData.checkToolNameExist(connection, toolDetails, toolUid);
      if (!isNameExist) {
        const isToolUidExist = await MasterData.checkToolUidExist(connection, toolUid);
        if (!isToolUidExist) {
          serviceResponse.addBadRequestError("tool uid doesn't exist")
        } else {
          await MasterData.updateTool(connection, toolDetails, toolUid, userSession)
          serviceResponse.data = {
            toolUid
          }
        }
      } else {
        serviceResponse.addBadRequestError("tool name already exist");
      }
    } else {
      serviceResponse.addBadRequestError("course category doesn't exist")
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateTool() `, error);
    serviceResponse.addServerError('Failed to update tool details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}


export async function deleteTool(toolUid: string, userSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.deleteTool()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "tool deleted successfully");
  try {
    connection = await getConnection()
    const isToolUidExist = await MasterData.checkToolUidExist(connection, toolUid);
    if (!isToolUidExist) {
      serviceResponse.addBadRequestError("tool uid doesn't exist")
    } else {
      await MasterData.deleteTool(connection, toolUid, userSession)
      serviceResponse.data = {
        toolUid
      }
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.deleteTool() `, error);
    serviceResponse.addServerError('Failed to delete tool details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function getTools(queryParams: any, userSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.getTools()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "tools details fetched successfully");
  try {
    connection = await getConnection()
    const { list, totalResultsCount } = await MasterData.getTools(connection, queryParams, userSession);
    let offset: number = (queryParams.pageNum - 1) * queryParams.pageSize;
    if (offset < 0) {
      offset = 0;
    }
    const responseData: IListAPIResponse = new ListAPIResponse(
      list,
      parseInt(totalResultsCount.count) > (queryParams.pageNum * queryParams.pageSize),
      offset + 1,
      offset + list?.length,
      parseInt(totalResultsCount.count),
      queryParams.sortBy,
      queryParams.sortOrder,
      queryParams.pageNum,
      queryParams.pageSize
    )
    serviceResponse.data = responseData;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getTools() `, error);
    serviceResponse.addServerError('Failed to fetched tools details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function getToolsByUid(toolUid: string, userSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.getToolsByUid()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "tools detail fetched successfully");
  try {
    connection = await getConnection();
    const isToolUidExist = await MasterData.checkToolUidExist(connection, toolUid);
    if (!isToolUidExist) {
      serviceResponse.addBadRequestError("tool uid doesn't exist")
    } else {
      serviceResponse.data = isToolUidExist;
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getToolsByUid() `, error);
    serviceResponse.addServerError('Failed to fetched tools details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}


//interview rounds

export async function saveInterviewRound(interviewRoundDetails: IMasterData, UserSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.saveInterviewRound() ==> `, interviewRoundDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, "interview round details saved successfully");
  try {
    connection = await getConnection()
    const isCourseCategoriesExist = await MasterData.checkCategoryIdExist(connection, interviewRoundDetails.categoryId)
    if (isCourseCategoriesExist) {
      const isNameExist = await MasterData.checkInterviewRoundNameExist(connection, interviewRoundDetails);
      if (isNameExist) {
        serviceResponse.addBadRequestError("interview round already exist")
      } else {
        const interviewRoundUid = await MasterData.saveInterviewRound(connection, interviewRoundDetails, UserSession)
        serviceResponse.data = { interviewRoundUid }
      }
    } else {
      serviceResponse.addBadRequestError("course category doesn't exist")
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveInterviewRound() `, error);
    serviceResponse.addServerError('Failed to create interview round details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function updateInterviewRound(interviewRoundDetails: IMasterData, interViewRoundUid: string, userSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.updateInterviewRound() ==> `, interviewRoundDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "interview rounds updated successfully");
  try {
    connection = await getConnection()
    const isCourseCategoriesExist = await MasterData.checkCategoryIdExist(connection, interviewRoundDetails.categoryId)
    if (isCourseCategoriesExist) {
      const isNameExist = await MasterData.checkInterviewRoundNameExist(connection, interviewRoundDetails, interViewRoundUid);
      if (!isNameExist) {
        const isInterviewRoundUidExist = await MasterData.checkInterviewRoundUidExist(connection, interViewRoundUid);
        if (!isInterviewRoundUidExist) {
          serviceResponse.addBadRequestError("interview round uid doesn't exist")
        } else {
          const interviewRoundResponse = await MasterData.updateInterviewRound(connection, interviewRoundDetails, interViewRoundUid, userSession)
          serviceResponse.data = {
            interviewRoundUid: interviewRoundResponse
          }
        }
      } else {
        serviceResponse.addBadRequestError("interview round name already exist");
      }
    } else {
      serviceResponse.addBadRequestError("course category doesn't exist")
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateInterviewRound() `, error);
    serviceResponse.addServerError('Failed to interview round details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}


export async function deleteInterviewRound(interviewRoundUid: string, userSession: IUserSession) {
  logger.info(`${TAG}.deleteInterviewRound()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "interview round deleted successfully");
  try {
    connection = await getConnection()
    const isInterviewRoundUidExist = await MasterData.checkInterviewRoundUidExist(connection, interviewRoundUid);
    if (!isInterviewRoundUidExist) {
      serviceResponse.addBadRequestError("interview round uid doesn't exist")
    } else {
      const interviewRoundResponse = await MasterData.deleteInterviewRound(connection, interviewRoundUid, userSession)
      serviceResponse.data = {
        interviewRoundUid: interviewRoundResponse
      }
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.deleteInterviewRound() `, error);
    serviceResponse.addServerError('Failed to delete interview round details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}


export async function getInterviewRounds(queryParams: any, userSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.getInterviewRounds()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "interview rounds fetched successfully");
  try {
    connection = await getConnection()
    const { list, totalResultsCount } = await MasterData.getInterviewRounds(connection, queryParams, userSession)
    let offset: number = (queryParams.pageNum - 1) * queryParams.pageSize;
    if (offset < 0) {
      offset = 0;
    }
    const responseData: IListAPIResponse = new ListAPIResponse(
      list,
      parseInt(totalResultsCount.count) > (queryParams.pageNum * queryParams.pageSize),
      offset + 1,
      offset + list?.length,
      parseInt(totalResultsCount.count),
      queryParams.sortBy,
      queryParams.sortOrder,
      queryParams.pageNum,
      queryParams.pageSize
    )
    serviceResponse.data = responseData;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getInterviewRounds() `, error);
    serviceResponse.addServerError('Failed to fetched interview rounds details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function getInterviewRoundsByUid(interviewRoundUid: string, userSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.getInterviewRoundsByUid()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "interview rounds fetched successfully");
  try {
    connection = await getConnection()
    const isInterviewRoundExist = await MasterData.checkInterviewRoundUidExist(connection, interviewRoundUid);
    if (!isInterviewRoundExist) {
      serviceResponse.addBadRequestError("interview round uid doesn't exist")
    } else {
      serviceResponse.data = isInterviewRoundExist
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getInterviewRoundsByUid() `, error);
    serviceResponse.addServerError('Failed to fetched interview rounds due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

//course category  

export async function saveCourseCategory(courseCategoryDetails: IMasterData, UserSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.saveCourseCategory() ==> `, courseCategoryDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, "course category details saved successfully");
  try {
    connection = await getConnection();
    const isProgramExist = await MasterData.checkProgramExist(connection, courseCategoryDetails.programId)
    if (isProgramExist) {
      const isNameExist = await MasterData.checkCategoryNameExist(connection, courseCategoryDetails);
      if (isNameExist) {
        serviceResponse.addBadRequestError("course category name already exist")
      } else {
        const categoryUid = await MasterData.saveCourseCategory(connection, courseCategoryDetails, UserSession)
        serviceResponse.data = { categoryUid }
      }
    } else {
      serviceResponse.addBadRequestError("program doesn't exist")
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveCourseCategory() `, error);
    serviceResponse.addServerError('Failed to create course category details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function updateCourseCategory(courseCategoryDetails: IMasterData,
  categoryUid: string, UserSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.updateCourseCategory() ==> `, courseCategoryDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "course category details updated successfully");
  try {
    connection = await getConnection()
    const isProgramExist = await MasterData.checkProgramExist(connection, courseCategoryDetails.programId)
    if (isProgramExist) {
      const isNameExist = await MasterData.checkCategoryNameExist(connection, courseCategoryDetails, categoryUid);
      if (!isNameExist) {
        serviceResponse.addBadRequestError("course category name  doesn't exist")
      } else {
        await MasterData.updateCourseCategory(connection, courseCategoryDetails, categoryUid, UserSession)
        serviceResponse.data = {
          categoryUid
        }
      }
    } else {
      serviceResponse.addBadRequestError("program doesn't exist")
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateCourseCategory() `, error);
    serviceResponse.addServerError('Failed to update course category details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function deleteCourseCategory(categoryUid: string, UserSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.deleteCourseCategory()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "course category details deleted successfully");
  try {
    connection = await getConnection()
    const existedCourseCategory = await MasterData.getCourseCategoriesByUid(connection, categoryUid, UserSession);
    if (!existedCourseCategory) {
      serviceResponse.addBadRequestError("course category uid doesn't exist")
    } else {
      await MasterData.deleteCourseCategory(connection, categoryUid, UserSession)
      serviceResponse.data = {
        categoryUid
      }
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.deleteCourseCategory() `, error);
    serviceResponse.addServerError('Failed to delete course category details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function getCourseCategories(userSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.getCourseCategories()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "course category details fetched successfully");
  try {
    connection = await getConnection()
    const courseCategoryDetails = await MasterData.getCourseCategories(connection, userSession)
    serviceResponse.data = {
      courseCategoryDetails: courseCategoryDetails
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getCourseCategories() `, error);
    serviceResponse.addServerError('Failed to fetched course category details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}


export async function getCourseCategoriesByUid(categoryUid: string, userSession: IUserSession): Promise<IServiceResponse> {
  logger.info(`${TAG}.getCourseCategoriesByUid()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "course category details fetched successfully");
  try {
    connection = await getConnection();
    const existedCourse = await MasterData.getCourseCategoriesByUid(connection, categoryUid, userSession);
    if (!existedCourse) {
      serviceResponse.addBadRequestError("course category uid doesn't exist")
    } else {
      serviceResponse.data = existedCourse
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getCourseCategoriesByUid() `, error);
    serviceResponse.addServerError('Failed to fetched course category details due to tech difficulties');
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}