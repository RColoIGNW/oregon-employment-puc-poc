import type { RequestHandler } from 'express-serve-static-core'
import { NextFunction, Request, Response } from 'express'
// import firebase from './firebase'

// const db = firebase.firestore()

// const roleRanks = {
//   superAdmin: 1,
//   admin: 2,
//   user: 3
// }

export const decodeToken: RequestHandler = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.Authorization) {
    return res.status(400).json({
      error: {
        message: 'You did not specify any jwt for this request',
      }
    })
  }

  try {
    req.token = req.headers.Authorization.replace('Bearer ', '')
    // const isValid = await verifyToken(req.token)
    // if (!isValid) {
    //   throw new Error('You are unauthorized to access this resource')
    // }
    next()
  } catch (error) {
    return res.status(500).json({
      error,
    })
  }
}

// Checks if a user is authenticated from firebase admin
export const isAuthorized: RequestHandler = async (
  req: Request | any,
  res,
  next
) => {
  if (req.user) {
    next()
  } else {
    return res.status(401).json({
      error: {
        message:
          'You are not authorised to perform this action. SignUp/Login to continue',
      },
    });
  }
};

// Checks if a user has the required permission from token claims stored for the user - you would use this for the oregon state admin/backend api's
export const hasAdminRole: RequestHandler = async (_: Request, res, next) => {
  try {
    // const roleRequest = await db.collection('roles').doc('some-doc').get()
    // const rolesPayload = roleRequest.val()
    // const role = rolesPayload.find((role) => role.id === roleRanks.admin)

    next()
    // if (req.user.roleId <= role.id) {
    //   next()
    // } else {
    //   return res.status(403).json({
    //     error: {
    //       message: 'You are not permitted to access this resource'
    //     }
    //   })
    // }
  } catch (error) {
    return res.status(500).json({
      error: {
        message:
          'An error occurred while getting user access. Please try again',
      },
    });
  }
};
