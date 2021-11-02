import { AuthToken } from "../models/AuthToken";

const API_TOKEN     = "api_token";
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

export function setApiToken(tokenObj: string) {
  sessionStorage.setItem(API_TOKEN, tokenObj);
}

export function getApiToken() {
  return sessionStorage.getItem(API_TOKEN);
}

