import { combineReducers } from 'redux'
import data from './modules/data'
import isAuthenticated from './modules/auth'
import request from './modules/request'
import routing from './modules/routing'
import socket from './modules/socket'
import token from './modules/token'

export default combineReducers({
  data,
  isAuthenticated,
  request,
  routing,
  socket,
  token
})
