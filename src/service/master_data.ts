
import { ErrorCodes } from '@constants/error_constants'
import { HttpStatusCodes } from "@constants/status_codes";
import { commitTransaction, getConnection, releaseConnection, rollBackTransaction } from "@db/helpers/transaction";
import { MasterData } from "@db/queries";
import logger from "@logger";
import { IServiceResponse, IUserSession, ServiceResponse, IMasterData } from "@models";
const TAG = 'service.master_data'

// job type

export async function saveJobType(jobTypeDetails: IMasterData, UserSession: IUserSession) {
  logger.info(`${TAG}.saveJobType() ==> `, jobTypeDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, "Job type details saved successfully");
  try {
    connection = await getConnection()
    const isNameExist = await MasterData.checkJobTypeNameExist(connection, jobTypeDetails);
    if (isNameExist) {
      serviceResponse.addBadRequestError("job type name already exist")
    } else {
      const jobTypeResponse = await MasterData.saveJobType(connection, jobTypeDetails, UserSession)
      serviceResponse.data = {
        jobTypeUid: jobTypeResponse
      }
    }

    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveJobType() `, error);
    serviceResponse.addServerError('Failed to create job type details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function updateJobType(jobTypeDetails: IMasterData, jobTypeUid: string, userSession: IUserSession) {
  logger.info(`${TAG}.updateJobType() ==> `, jobTypeDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "Job type details updated successfully");
  try {
    connection = await getConnection();
    const isExist = await MasterData.checkJobTypeUidExist(connection, jobTypeUid);
    if (!isExist) {
      serviceResponse.addBadRequestError("Job type uid doesn't exist")
    }
    const jobTypeResponse = await MasterData.updateJobType(connection, jobTypeUid, jobTypeDetails, userSession)
    serviceResponse.data = {
      jobTypeUid: jobTypeResponse
    }
  } catch (error) {
    logger.error(`Error occured in ${TAG}.updateJobType()`, error)
    serviceResponse.addServerError('Failed to update job type details due to tech difficultied');
    await rollBackTransaction(connection);
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

export async function deleteJobType(jobTypeUid: string, userSession: IUserSession) {
  logger.info(`${TAG}.deleteJobType()`);
  let connection = null;
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "Job type details deleted successfully");
  try {
    connection = await getConnection();
    const isExist = await MasterData.checkJobTypeUidExist(connection, jobTypeUid);
    if (!isExist) {
      serviceResponse.addBadRequestError("job type uid doesn't exits")
    } else {
      const jobTypeResponse = await MasterData.deleteJobType(connection, jobTypeUid, userSession);
      serviceResponse.data = {
        jobTypeUid: jobTypeResponse
      }
    }

  } catch (error) {
    logger.error(`Error occured in ${TAG}.deleteJobType()`, error);
    serviceResponse.addServerError('Failed to delete job type due to tech difficultied')
    await rollBackTransaction(connection)
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

export async function getJobTypes(userSession) {
  logger.info(`${TAG}.getJobTypes()`);
  let connection = null;
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "Job type details fetched successfully");
  try {
    connection = await getConnection();
    const jobTypeResponse = await MasterData.getJobTypes(connection, userSession);
    serviceResponse.data = {
      jobTypes: jobTypeResponse
    }
  } catch (error) {
    logger.error(`Error occured in ${TAG}.getJobTypes()`, error);
    serviceResponse.addServerError('Failed to fetch job type details due to tech difficultied')
    await rollBackTransaction(connection)
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

export async function getJobTypeByUid(jobTypeUid: string) {
  logger.info(`${TAG}.getJobTypeByUid()`);
  let connection = null;
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "Job type fetched successfully");
  try {
    connection = await getConnection();
    const isExist = await MasterData.checkJobTypeUidExist(connection, jobTypeUid);
    if (!isExist) {
      serviceResponse.addBadRequestError("job type Uid doesn't exist")
    } else {
      const jobTypeResponse = await MasterData.getJobTypeByUid(connection, jobTypeUid);
      serviceResponse.data = jobTypeResponse
    }

  } catch (error) {
    logger.error(`Error occured in ${TAG}.getJobTypeByUid()`, error);
    serviceResponse.addServerError('Failed to fetch job type details due to tech difficultied')
    await rollBackTransaction(connection)
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

// employment type

export async function saveEmploymentType(employmentTypeDetails: IMasterData, UserSession: IUserSession) {
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

    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveEmploymentType() `, error);
    serviceResponse.addServerError('Failed to create employment type details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function updateEmploymentType(employmentDetails: IMasterData, employmentTypeUid: string, userSession: IUserSession) {
  logger.info(`${TAG}.updateEmploymentType() ==> `, employmentDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "employment type details updated successfully");
  try {
    connection = await getConnection();
    const isTypeExist = await MasterData.checkEmploymentTypeUidExist(connection, employmentTypeUid);
    if (!isTypeExist) {
      serviceResponse.addBadRequestError("employment type uid doesn't exist")
    } else {
      const employemntTypeResponse = await MasterData.updateEmploymentType(connection, employmentTypeUid, employmentDetails, userSession)
      serviceResponse.data = {
        employmentTypeUid: employemntTypeResponse
      }
    }
  } catch (error) {
    logger.error(`Error occured in ${TAG}.updateEmploymentType()`, error)
    serviceResponse.addServerError('Failed to update employment type details due to tech difficultied');
    await rollBackTransaction(connection);
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

export async function getEmploymentTypes(userSession: IUserSession) {
  logger.info(`${TAG}.getEmploymentTypes()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "employment type details fetched successfully");
  try {
    connection = await getConnection();
    const employemntTypeResponse = await MasterData.getEmploymentTypes(connection, userSession)
    serviceResponse.data = {
      employmentTypeDetails: employemntTypeResponse
    }
  } catch (error) {
    logger.error(`Error occured in ${TAG}.getEmploymentTypes()`, error)
    serviceResponse.addServerError('Failed to  fetch employment type details due to tech difficultied');
    await rollBackTransaction(connection);
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
      const employemntTypeResponse = await MasterData.getEmploymentTypeByUid(connection, employmentTypeUid, userSession)
      serviceResponse.data = {
        employmentTypeDetails: employemntTypeResponse
      }
    }

  } catch (error) {
    logger.error(`Error occured in ${TAG}.getEmploymentTypeByUid()`, error)
    serviceResponse.addServerError('Failed to  fetch employment type details due to tech difficultied');
    await rollBackTransaction(connection);
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

export async function deleteEmploymentType(employmentTypeUid: string, userSession: IUserSession) {
  logger.info(`${TAG}.deleteEmploymentType()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "employment type details deleted successfully");
  try {
    connection = await getConnection();
    const isTypeExist = await MasterData.checkEmploymentTypeUidExist(connection, employmentTypeUid);
    if (!isTypeExist) {
      serviceResponse.addBadRequestError("employment type uid doesn't exist")
    } else {
      const employemntTypeResponse = await MasterData.deleteEmploymentType(connection, employmentTypeUid, userSession)
      serviceResponse.data = {
        employmentTypeUid: employemntTypeResponse
      }
    }
  } catch (error) {
    logger.error(`Error occured in ${TAG}.deleteEmploymentType()`, error)
    serviceResponse.addServerError('Failed to delete employment type details due to tech difficultied');
    await rollBackTransaction(connection);
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

// job shifts


export async function saveJobShifts(jobShiftDetails: IMasterData, UserSession: IUserSession) {
  logger.info(`${TAG}.saveJobShifts() ==> `, jobShiftDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, "job shift details saved successfully");
  try {
    connection = await getConnection()
    const isNameExist = await MasterData.checkJobShiftsNameExist(connection, jobShiftDetails);
    if (isNameExist) {
      serviceResponse.addBadRequestError("job shift name already exist")
    } else {
      const jobShiftsResponse = await MasterData.saveJobShifts(connection, jobShiftDetails, UserSession)
      serviceResponse.data = {
        jobShiftsUid: jobShiftsResponse
      }
    }

    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveJobShifts() `, error);
    serviceResponse.addServerError('Failed to create job shifts details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function updateJobShifts(jobShiftDetails: IMasterData, jobShiftUid: string, userSession: IUserSession) {
  logger.info(`${TAG}.updateJobShifts() ==> `, jobShiftDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "Job shift details updated successfully");
  try {
    connection = await getConnection();
    const isShiftExist = await MasterData.checkJobShiftsUidExist(connection, jobShiftUid);
    if (!isShiftExist) {
      serviceResponse.addBadRequestError("job shift uid doesn't exist")
    } else {
      const jobShiftsReponse = await MasterData.updateJobShifts(connection, jobShiftUid, jobShiftDetails, userSession)
      serviceResponse.data = {
        jobShiftUid: jobShiftsReponse
      }
    }
  } catch (error) {
    logger.error(`Error occured in ${TAG}.updateJobShifts()`, error)
    serviceResponse.addServerError('Failed to update job shifts details due to tech difficultied');
    await rollBackTransaction(connection);
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

export async function deleteJobShifts(jobShiftUid: string, userSession: IUserSession) {
  logger.info(`${TAG}.deleteJobShifts()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "job shifts details deleted successfully");
  try {
    connection = await getConnection();
    const isShiftExist = await MasterData.checkJobShiftsUidExist(connection, jobShiftUid);
    if (!isShiftExist) {
      serviceResponse.addBadRequestError("job shift uid doesn't exist")
    } else {
      const response = await MasterData.deleteJobShifts(connection, jobShiftUid, userSession)
      serviceResponse.data = {
        jobShiftUid: response
      }
    }
  } catch (error) {
    logger.error(`Error occured in ${TAG}.deleteJobShifts()`, error)
    serviceResponse.addServerError('Failed to delete job shifts details due to tech difficultied');
    await rollBackTransaction(connection);
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

export async function getJobShifts(userSession: IUserSession) {
  logger.info(`${TAG}.getJobShifts()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "job shifts details fetched successfully");
  try {
    connection = await getConnection();
    const jobShiftResponse = await MasterData.getJobShifts(connection, userSession)
    serviceResponse.data = {
      jobShiftDetails: jobShiftResponse
    }
  } catch (error) {
    logger.error(`Error occured in ${TAG}.getJobShifts()`, error)
    serviceResponse.addServerError('Failed to  fetch job shifts details due to tech difficultied');
    await rollBackTransaction(connection);
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

export async function getJobShiftsByUid(jobShiftUid: string, userSession: IUserSession) {
  logger.info(`${TAG}.getJobShiftsByUid()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "job shift fetched successfully");
  try {
    connection = await getConnection();
    const isTypeExist = await MasterData.checkJobShiftsUidExist(connection, jobShiftUid);
    if (!isTypeExist) {
      serviceResponse.addBadRequestError("job shift uid doesn't exist")
    } else {
      const jobShiftResponse = await MasterData.getJobShiftsByUid(connection, jobShiftUid, userSession)
      serviceResponse.data = jobShiftResponse
    }

  } catch (error) {
    logger.error(`Error occured in ${TAG}.getJobShiftsByUid()`, error)
    serviceResponse.addServerError('Failed to  fetch job shift details due to tech difficultied');
    await rollBackTransaction(connection);
  } finally {
    await releaseConnection(connection)
  }
  return serviceResponse
}

//skills
export async function saveSkill(skillDetails: IMasterData, UserSession: IUserSession) {
  logger.info(`${TAG}.saveSkill() ==> `, skillDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, "skill details saved successfully");
  try {
    connection = await getConnection()
    const isNameExist = await MasterData.checkSkillNameExist(connection, skillDetails);
    const isCourseCategoriesExist = await MasterData.checkCategoryIdExist(connection, skillDetails.categoryId)
    if (isCourseCategoriesExist) {
      if (isNameExist) {
        serviceResponse.addBadRequestError("skill name already exist")
      } else {
        const skillResponse = await MasterData.saveSkill(connection, skillDetails, UserSession)
        serviceResponse.data = {
          skillUid: skillResponse
        }
      }
    } else {
      serviceResponse.addBadRequestError("course category doesn't exist")
    }

    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveSkill() `, error);
    serviceResponse.addServerError('Failed to create skills details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function updateSkill(skillDetails: IMasterData, skillUid: string, userSession: IUserSession) {
  logger.info(`${TAG}.updateSkill() ==> `, skillDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "skill details updated successfully");
  try {
    connection = await getConnection()
    const isSkillUidExist = await MasterData.checkSkillUidExist(connection, skillUid);
    const isCourseCategoriesExist = await MasterData.checkCategoryIdExist(connection, skillDetails.categoryId)
    if (isCourseCategoriesExist) {
      if (!isSkillUidExist) {
        serviceResponse.addBadRequestError("skill uid doesn't exist")
      } else {
        const skillResponse = await MasterData.updateSkill(connection, skillDetails, skillUid, userSession)
        serviceResponse.data = {
          skillUid: skillResponse
        }
      }
    } else {
      serviceResponse.addBadRequestError("course category doesn't exist")
    }

    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateSkill() `, error);
    serviceResponse.addServerError('Failed to update skills details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}


export async function deleteSkill(skillUid: string, userSession: IUserSession) {
  logger.info(`${TAG}.deleteSkill()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "skill deleted successfully");
  try {
    connection = await getConnection()
    const isSkillUidExist = await MasterData.checkSkillUidExist(connection, skillUid);
    if (!isSkillUidExist) {
      serviceResponse.addBadRequestError("skill uid doesn't exist")
    } else {
      const skillResponse = await MasterData.deleteSkill(connection, skillUid, userSession)
      serviceResponse.data = {
        skillUid: skillResponse
      }
    }

    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.deleteSkill() `, error);
    serviceResponse.addServerError('Failed to delete skill details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function getSkills(queryParams: number, userSession: IUserSession) {
  logger.info(`${TAG}.getSkills()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "skill details fetched successfully");
  try {
    connection = await getConnection()
    const checkCourseCategoryExist = await MasterData.checkCategoryIdExist(connection, queryParams)
    if (checkCourseCategoryExist) {
      const skillResponse = await MasterData.getSkills(connection, queryParams, userSession)
      serviceResponse.data = {
        skills: skillResponse
      }
    } else {
      serviceResponse.addBadRequestError("Course category is doesn't exist")
    }


    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getSkills() `, error);
    serviceResponse.addServerError('Failed to fetched skills details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
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
      const skillResponse = await MasterData.getSkillByUid(connection, skillUid, userSession)
      serviceResponse.data = skillResponse
    }
    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getSkillByUid() `, error);
    serviceResponse.addServerError('Failed to fetched skill details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}


 


//tools

export async function saveTool(toolDetails: IMasterData, UserSession: IUserSession) {
  logger.info(`${TAG}.saveTool() ==> `, toolDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, "tool details saved successfully");
  try {
    connection = await getConnection()
    const isNameExist = await MasterData.checkToolNameExist(connection, toolDetails);
    const isCourseCategoriesExist = await MasterData.checkCategoryIdExist(connection, toolDetails.categoryId)
    if (isCourseCategoriesExist) {
      if (isNameExist) {
        serviceResponse.addBadRequestError("tool name already exist")
      } else {
        const toolResponse = await MasterData.saveTool(connection, toolDetails, UserSession)
        serviceResponse.data = {
          toolUid: toolResponse
        }
      }
    } else {
      serviceResponse.addBadRequestError("course category doesn't exist")
    }

    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveTool() `, error);
    serviceResponse.addServerError('Failed to create tool details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function updateTool(toolDetails: IMasterData, toolUid: string, userSession: IUserSession) {
  logger.info(`${TAG}.updateTool() ==> `, toolDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "tools details updated successfully");
  try {
    connection = await getConnection()
    const isToolUidExist = await MasterData.checkToolUidExist(connection, toolUid);
    const isCourseCategoriesExist = await MasterData.checkCategoryIdExist(connection, toolDetails.categoryId)
    if (isCourseCategoriesExist) {
      if (!isToolUidExist) {
        serviceResponse.addBadRequestError("tool uid doesn't exist")
      } else {
        const toolResponse = await MasterData.updateTool(connection, toolDetails, toolUid, userSession)
        serviceResponse.data = {
          toolUid: toolResponse
        }
      }
    } else {
      serviceResponse.addBadRequestError("course category doesn't exist")
    }

    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateTool() `, error);
    serviceResponse.addServerError('Failed to update tool details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}


export async function deleteTool(toolUid: string, userSession: IUserSession) {
  logger.info(`${TAG}.deleteTool()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "tool deleted successfully");
  try {
    connection = await getConnection()
    const isToolUidExist = await MasterData.checkToolUidExist(connection, toolUid);
    if (!isToolUidExist) {
      serviceResponse.addBadRequestError("tool uid doesn't exist")
    } else {
      const toolResponse = await MasterData.deleteTool(connection, toolUid, userSession)
      serviceResponse.data = {
        toolUid: toolResponse
      }
    }

    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.deleteTool() `, error);
    serviceResponse.addServerError('Failed to delete tool details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function getTools(queryParams: number, userSession: IUserSession) {
  logger.info(`${TAG}.getTools()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "tools details fetched successfully");
  try {
    connection = await getConnection()
    const toolsResponse = await MasterData.getTools(connection, queryParams, userSession)
    serviceResponse.data = {
      tools: toolsResponse
    }

    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getTools() `, error);
    serviceResponse.addServerError('Failed to fetched tools details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function getToolsByUid(toolUid: string, userSession: IUserSession) {
  logger.info(`${TAG}.getToolsByUid()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "tools detail fetched successfully");
  try {
    connection = await getConnection()
    const isToolUidExist = await MasterData.checkToolUidExist(connection, toolUid);
    if (!isToolUidExist) {
      serviceResponse.addBadRequestError("tool uid doesn't exist")
    } else {
      const toolResponse = await MasterData.getToolsByUid(connection, toolUid, userSession)
      serviceResponse.data = toolResponse
    }
    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getToolsByUid() `, error);
    serviceResponse.addServerError('Failed to fetched tools details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}


//interview rounds

export async function saveInterviewRound(interviewRoundDetails: IMasterData, UserSession: IUserSession) {
  logger.info(`${TAG}.saveInterviewRound() ==> `, interviewRoundDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, "interview round details saved successfully");
  try {
    connection = await getConnection()
    const isNameExist = await MasterData.checkInterviewRoundNameExist(connection, interviewRoundDetails);
    const isCourseCategoriesExist = await MasterData.checkCategoryIdExist(connection, interviewRoundDetails.categoryId)
    if (isCourseCategoriesExist) {
      if (isNameExist) {
        serviceResponse.addBadRequestError("interview round already exist")
      } else {
        const interviewRoundsResponse = await MasterData.saveInterviewRound(connection, interviewRoundDetails, UserSession)
        serviceResponse.data = {
          interviewRoundUid: interviewRoundsResponse
        }
      }
    } else {
      serviceResponse.addBadRequestError("course category doesn't exist")
    }

    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveInterviewRound() `, error);
    serviceResponse.addServerError('Failed to create interview round details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function updateInterviewRound(interviewRoundDetails: IMasterData, interViewRoundUid: string, userSession: IUserSession) {
  logger.info(`${TAG}.updateInterviewRound() ==> `, interviewRoundDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "interview rounds updated successfully");
  try {
    connection = await getConnection()
    const isInterviewRoundUidExist = await MasterData.checkInterviewRoundUidExist(connection, interViewRoundUid);
    const isCourseCategoriesExist = await MasterData.checkCategoryIdExist(connection, interviewRoundDetails.categoryId)
    if (isCourseCategoriesExist) {
      if (!isInterviewRoundUidExist) {
        serviceResponse.addBadRequestError("interview round uid doesn't exist")
      } else {
        const interviewRoundResponse = await MasterData.updateInterviewRound(connection, interviewRoundDetails, interViewRoundUid, userSession)
        serviceResponse.data = {
          interviewRoundUid: interviewRoundResponse
        }
      }
    } else {
      serviceResponse.addBadRequestError("course category doesn't exist")
    }

    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateInterviewRound() `, error);
    serviceResponse.addServerError('Failed to interview round details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
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

    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.deleteInterviewRound() `, error);
    serviceResponse.addServerError('Failed to delete interview round details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}


export async function getInterviewRounds(queryParams: number, userSession: IUserSession) {
  logger.info(`${TAG}.getInterviewRounds()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "interview rounds fetched successfully");
  try {
    connection = await getConnection()
    const interviewRounds = await MasterData.getInterviewRounds(connection, queryParams, userSession)
    serviceResponse.data = {
      interviewRounds: interviewRounds
    }

    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getInterviewRounds() `, error);
    serviceResponse.addServerError('Failed to fetched interview rounds details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function getInterviewRoundsByUid(interviewRoundUid: string, userSession: IUserSession) {
  logger.info(`${TAG}.getInterviewRoundsByUid()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "interview rounds fetched successfully");
  try {
    connection = await getConnection()
    const isToolUidExist = await MasterData.checkInterviewRoundUidExist(connection, interviewRoundUid);
    if (!isToolUidExist) {
      serviceResponse.addBadRequestError("interview round uid doesn't exist")
    } else {
      const interviewRoundsResponse = await MasterData.getInterviewRoundsByUid(connection, interviewRoundUid, userSession)
      serviceResponse.data = interviewRoundsResponse
    }
    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getInterviewRoundsByUid() `, error);
    serviceResponse.addServerError('Failed to fetched interview rounds due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

//course category  

export async function saveCourseCategory(courseCategoryDetails: IMasterData, UserSession: IUserSession) {
  logger.info(`${TAG}.saveCourseCategory() ==> `, courseCategoryDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, "course category details saved successfully");
  try {
    connection = await getConnection()
    const isNameExist = await MasterData.checkCategoryNameExist(connection, courseCategoryDetails);
    const isProgramExist = await MasterData.checkProgramExist(connection, courseCategoryDetails.programId)
    if (isProgramExist) {
      if (isNameExist) {
        serviceResponse.addBadRequestError("course category name already exist")
      } else {
        const courseCategoryResponse = await MasterData.saveCourseCategory(connection, courseCategoryDetails, UserSession)
        serviceResponse.data = courseCategoryResponse

      }
    } else {
      serviceResponse.addBadRequestError("program doesn't exist")
    }

    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveCourseCategory() `, error);
    serviceResponse.addServerError('Failed to create course category details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function updateCourseCategory(courseCategoryDetails: IMasterData, categoryId: number, UserSession: IUserSession) {
  logger.info(`${TAG}.updateCourseCategory() ==> `, courseCategoryDetails)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "course category details updated successfully");
  try {
    connection = await getConnection()
    const isCategoryIdExist = await MasterData.checkCategoryIdExist(connection, categoryId);
    const isProgramExist = await MasterData.checkProgramExist(connection, courseCategoryDetails.programId)
    if (isProgramExist) {
      if (!isCategoryIdExist) {
        serviceResponse.addBadRequestError("course category id doesn't exist")
      } else {
        const courseCategoryResponse = await MasterData.updateCourseCategory(connection, courseCategoryDetails, categoryId, UserSession)
        serviceResponse.data = {
          categoryId: courseCategoryResponse
        }
      }
    } else {
      serviceResponse.addBadRequestError("program doesn't exist")
    }

    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateCourseCategory() `, error);
    serviceResponse.addServerError('Failed to update course category details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function deleteCourseCategory(categoryId: number, UserSession: IUserSession) {
  logger.info(`${TAG}.deleteCourseCategory()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "course category details deleted successfully");
  try {
    connection = await getConnection()
    const isCategoryIdExist = await MasterData.checkCategoryIdExist(connection, categoryId);
    if (!isCategoryIdExist) {
      serviceResponse.addBadRequestError("course category id doesn't exist")
    } else {
      const courseCategoryResponse = await MasterData.deleteCourseCategory(connection, categoryId, UserSession)
      serviceResponse.data = {
        categoryId: courseCategoryResponse
      }
    }

    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.deleteCourseCategory() `, error);
    serviceResponse.addServerError('Failed to delete course category details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}

export async function getCourseCategories(userSession: IUserSession) {
  logger.info(`${TAG}.getCourseCategories()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "course category details fetched successfully");
  try {
    connection = await getConnection()
    const courseCategoryDetails = await MasterData.getCourseCategories(connection, userSession)
    serviceResponse.data = {
      courseCategoryDetails: courseCategoryDetails
    }

    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getCourseCategories() `, error);
    serviceResponse.addServerError('Failed to fetched course category details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}


export async function getCourseCategoriesByUid(categoryId: number, userSession: IUserSession) {
  logger.info(`${TAG}.getCourseCategoriesByUid()`)
  let connection = null
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "course category details fetched successfully");
  try {
    connection = await getConnection()
    const isCategoryIdExist = await MasterData.checkCategoryIdExist(connection, categoryId)
    if (!isCategoryIdExist) {
      serviceResponse.addBadRequestError("course categoru id doesn't exist")
    } else {
      const courseCategoryDetails = await MasterData.getCourseCategoriesByUid(connection, categoryId, userSession)
      serviceResponse.data = courseCategoryDetails
    }

    await commitTransaction(connection)
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getCourseCategoriesByUid() `, error);
    serviceResponse.addServerError('Failed to fetched course category details due to tech difficulties');
    await rollBackTransaction(connection);
    throw error;
  } finally {
    await releaseConnection(connection);
  }
  return serviceResponse;
}