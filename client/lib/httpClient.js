/* global sessionStorage */
import axios from 'axios'

// Create an Axios instance to use for all requests
const instance = axios.create({
  baseURL: '/api',
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' }
})

// Add authorization header if exists
instance.defaults.headers.common['Authorization'] = sessionStorage.getItem('token') || null

const endpoints = {
  authenticate: (data) => instance.post(data)
    .then((res) => {
      // We logged in! Set the token
      sessionStorage.setItem('token', res)
    })
}

export default endpoints
