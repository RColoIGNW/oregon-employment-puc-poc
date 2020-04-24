import type { Router } from 'express'
import { decodeToken, isAuthorized, hasAdminRole } from './util/token'
import applicationService from './services/application.service'
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
    .route('/applications')
    .post(decodeToken, isAuthorized, hasAdminRole, applicationService.createApplication)

  router
    .route('/applications')
    .get(decodeToken, isAuthorized, applicationService.getApplications)

  router
    .route('/users/:userId/applications')
    .get(decodeToken, isAuthorized, applicationService.getApplicationsByUser)

  router
    .route('/applications/:id')
    .get(decodeToken, isAuthorized, applicationService.getApplicationById)

    router
    .route('/applications/:id')
    .delete(decodeToken, isAuthorized, applicationService.deleteApplication)

    router
    .route('/applications/:id')
    .put(decodeToken, isAuthorized, applicationService.updateApplication)
}

export default routes
