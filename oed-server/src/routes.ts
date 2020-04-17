import testService from './services/test-service'
import {
  decodeFirebaseIdToken,
  isAuthorized,
} from './util/token'

export const routes = router => {
  // app disovery/healthcheck
  router
  .route('/')
  .get((_, res) => {
      return res.status(200).json({
        message: 'Api Service Routes!',
        statusCode: 200
      })
    }
  )

  // test service showing how to protect a route with firebase auth
  router
    .route('/test-service')
    .get(
      decodeFirebaseIdToken,
      isAuthorized,
      testService,
    )
}

export default routes
