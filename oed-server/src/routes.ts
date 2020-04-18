import type { Router } from 'express'
import { decodeToken, isAuthorized } from './util/token'
import submitApplicantInformation from './services/applicant-information'

export const routes = (router: Router) => {
  // app disovery/healthcheck
  router.route('/').get((_, res) => {
    return res.status(200).json({
      message: 'Api Service Routes!',
      statusCode: 200,
    })
  })

  // test service showing how to protect a route with firebase auth
  router
    .route('/new-application')
    .post(decodeToken, isAuthorized, submitApplicantInformation)
}

export default routes
