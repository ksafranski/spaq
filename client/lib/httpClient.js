/* global sessionStorage, location */
import axios from 'axios'

// Create an Axios instance to use for all requests
const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})

// Add authorization header if exists
instance.defaults.headers.common['Authorization'] = sessionStorage.getItem('token') || null

/**
 * Handles error responses
 * @param {String} message 403 response message
 * @returns {null|Error}
 */
const handleAuthError = (message) => {
  // Error messages that should kick user out of the application
  const redirect403Errors = [
    'Invalid Token',
    'Token Expired',
    'Not Authenticated'
  ]
  // If this is a 403 and in the redirect array, send the user to login
  if (redirect403Errors.indexOf(message) >= 0) {
    location.href = '/login'
    return
  }
  // Send the error through to next catch
  const resError = new Error(message)
  resError.status = 403
  throw resError
}

/**
 * Processes requests
 * @param {String} ep The endpoint
 * @param {String} method The HTTP method
 * @param {*} args Spread of arguments
 * @returns {Object.<Promise>}
 */
const request = (ep, method, ...args) => instance[method](ep, ...args)
  .then((res) => res.data)
  .catch((err) => {
    if (!err.response) throw new Error('Could not connect to host')
    // Handle any 403 (auth) errors
    if (err.response.status === 403) return handleAuthError(err.response.data)
    // Return status and message for non-403 errors
    const resError = new Error(err.response.data)
    resError.status = err.response.status
    throw resError
  })

export default request
