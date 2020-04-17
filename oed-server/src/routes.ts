import testService from './services/test-service'
import {
  decodeFirebaseIdToken,
  hasAdminRole,
  isAuthorized,
} from './util/token'

export const routes = router => {
  // Get all users
  router
    .route('/test-service')
    .get(
      decodeFirebaseIdToken,
      isAuthorized,
      // hasAdminRole,
      testService,
    )
}

export default routes
