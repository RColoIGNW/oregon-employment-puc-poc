import type { Router } from 'express'
import { decodeToken, isAuthorized, hasAdminRole } from './util/token'
import applicationApi from './services/application'
import pdfApi from './services/pdf-application'
import { validateApplicationRequest } from './util/application.middleware'

enum ENDPOINTS {
  NEW_APPLICATIONS = 'applications',
  WEEKLY_APPLICATIONS = 'weekly-applications'
}

export const routes = (router: Router) => {
  /* service discovery/healthcheck */
  router.route('/').get((_, res) => {
    return res.status(200).json({
      message: 'Api Service Routes!',
      statusCode: 200,
    })
  })

  /* NEW APPLICATION ROUTES */
  router
    .route('/applications')
    .put(decodeToken, isAuthorized, applicationApi.createDocument.bind(null, 'applications', 'pua-applications'))

  router
    .route('/applications')
    .get(decodeToken, isAuthorized, hasAdminRole, applicationApi.getCollectionByName.bind(null, ENDPOINTS.WEEKLY_APPLICATIONS))

  router
    .route('/users/:userId/applications')
    .get(decodeToken, isAuthorized, applicationApi.getCollectionByUser.bind(null, ENDPOINTS.NEW_APPLICATIONS))

  router
    .route('/applications/:id')
    .get(decodeToken, isAuthorized, applicationApi.getDocumentById.bind(null, ENDPOINTS.NEW_APPLICATIONS))

  router
    .route('/applications/:id')
    .delete(decodeToken, isAuthorized, hasAdminRole, applicationApi.deleteDocumentById.bind(null, ENDPOINTS.NEW_APPLICATIONS))

  router
    .route('/applications/:id')
    .put(decodeToken, isAuthorized, validateApplicationRequest, applicationApi.updateDocumentById.bind(null, ENDPOINTS.NEW_APPLICATIONS))
  router
    .route('/applications/:id')
    .patch(decodeToken, isAuthorized, validateApplicationRequest, applicationApi.changeDocumentStatusById.bind(null, ENDPOINTS.NEW_APPLICATIONS))

  router
    .route('/applications/:id/submit')
    .patch(decodeToken, isAuthorized, validateApplicationRequest, applicationApi.submitDocument.bind(null, ENDPOINTS.NEW_APPLICATIONS))

  /* WEEKLY APPLICATION ROUTES */
  router
    .route('/weekly-applications')
    .put(decodeToken, isAuthorized, applicationApi.createDocument.bind(null, 'weekly-applications', 'weekly-claims'))

  router // TODO: depricate - we shouldn't ever need to replace the entire record unless it's on create
    .route('/weekly-applications/:id')
    .put(decodeToken, isAuthorized, applicationApi.updateDocumentById.bind(null, ENDPOINTS.WEEKLY_APPLICATIONS))

  router
    .route('/weekly-applications/:id')
    .get(decodeToken, isAuthorized, applicationApi.getDocumentById.bind(null, ENDPOINTS.WEEKLY_APPLICATIONS))

  router
    .route('/weekly-applications')
    .get(decodeToken,isAuthorized,hasAdminRole, applicationApi.getCollectionByName.bind(null, ENDPOINTS.WEEKLY_APPLICATIONS))

  router
    .route('/users/:userId/weekly-applications')
    .get(decodeToken, isAuthorized, applicationApi.getCollectionByUser.bind(null, ENDPOINTS.WEEKLY_APPLICATIONS))

  router
    .route('/weekly-applications/:id')
    .patch(decodeToken, isAuthorized, applicationApi.changeDocumentStatusById.bind(null, ENDPOINTS.WEEKLY_APPLICATIONS))

  router
    .route('/weekly-applications/:id/submit')
    .patch(decodeToken, isAuthorized, applicationApi.submitDocument.bind(null, ENDPOINTS.WEEKLY_APPLICATIONS))

  router
    .route('/weekly-applications/:id')
    .delete(decodeToken, isAuthorized, applicationApi.deleteDocumentById.bind(null, ENDPOINTS.WEEKLY_APPLICATIONS))

  router
    .route('/generate-pdf/:applicationId')
    .get(decodeToken, isAuthorized, pdfApi.generatePdf.bind(null, 'applications'))
}

export default routes
