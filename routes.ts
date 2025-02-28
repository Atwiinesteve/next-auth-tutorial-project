/**
 * An array of routes that are accessible to the public
 * These routes do not require Authentication
 * @type {string[]}
 */
export const PUBLIC_ROUTES = [
    "/"
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect loggedin users to access hidden pages
 * @type {string[]}
 */
export const AUTH_ROUTES = [
    "/auth/login",
    "/auth/register",
]
/**
 * The prefix for routes authentication APIs
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const API_AUTH_PREFIX = "/api/auth"

/**
 * The default route for loggedin users.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"