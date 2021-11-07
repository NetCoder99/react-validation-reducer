export function getErrorMessage(error: any ) {
  let errMsg = error.message;
  if (error.response.data.message) {
    errMsg = error.response.data.message;
  }
  return errMsg
}