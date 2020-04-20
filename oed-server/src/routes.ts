import type { Router } from 'express'
import { decodeToken, isAuthorized, hasAdminRole } from './util/token'
import submitApplicantInformation from './services/applicant-information'
import { getApplicants } from './services/applicants'

export const routes = (router: Router) => {
  // app discovery/healthcheck
  router.route('/').get((_, res) => {
    return res.status(200).json({
      message: 'Api Service Routes!',
      statusCode: 200,
    })
  })

  router
    .route('/new-application')
    .post(decodeToken, isAuthorized, submitApplicantInformation)

  router
    .route('/applications')
    .get(decodeToken, isAuthorized, hasAdminRole, getApplicants)
}

export default routes
