import { AuthToken } from "../models/AuthToken";

const ACCESS_TOKEN  = "access_token";
const REFRESH_TOKEN = "refresh_token";

export function setToken(tokenObj: AuthToken) {
  localStorage.setItem(ACCESS_TOKEN, tokenObj.accessToken);
  localStorage.setItem(REFRESH_TOKEN, tokenObj.refreshToken);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN);
}

// const sessionStorage = function () {
//   // var _service; 
//   // function _getService(this: any)
//   // {
//   //    if(!_service) {
//   //        _service = this;
//   //        return _service
//   //    }   
//   //    return _service
//   //  }

//   function _setToken(tokenObj: AuthToken) {
//     localStorage.setItem("access_token", tokenObj.accessToken);
//     localStorage.setItem("access_token", tokenObj.refreshToken);
//   }

//   function _getAccessToken() {
//     return localStorage.getItem("access_token");
//   }

//   function _getRefreshToken() {
//     return localStorage.getItem("access_token");
//   }

//   function _clearToken() {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("access_token");
//   }

//   return {
//     //getService : _getService,
//     setToken:        _setToken,
//     getAccessToken:  _getAccessToken,
//     getRefreshToken: _getRefreshToken,
//     clearToken:      _clearToken,
//   };
// };

// export default sessionStorage;
