/* global sessionStorage, location */
import axios from 'axios'

// Create an Axios instance to use for all requests
const instance = axios.create({
  baseURL: '/api',
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' }
})

// Add authorization header if exists
instance.defaults.headers.common['Authorization'] = sessionStorage.getItem('token') || null

/**
 * Handles special case errors
 * @param {Object.<Error>} err The caught error
 * @returns {Object}
 */
const handleError = (err) => {
  // Error messages that should kick user out of the application
  const redirect403Errors = [
    'Invalid Token',
    'Token Expired',
    'Not Authenticated'
  ]
  // If this is a 403 and in the redirect array, send the user to login
  if (err.response.status === 403 && redirect403Errors.indexOf(err.response.data) >= 0) {
    location.href = '/login'
    return
  }
  // Send the error through to next catch
  return err
}

/**
 * Processes requests
 * @param {String} ep The endpoint
 * @param {String} method The HTTP method
 * @param {*} args Spread of arguments
 * @returns {Object.<Promise>}
 */
const request = (ep, method, ...args) => instance[method](ep, ...args)
  .catch(handleError)

export default request
