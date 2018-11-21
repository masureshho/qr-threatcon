export function getErrorMessage(action, defaultMessage) {
  let message = defaultMessage;
  if (action && action.error) {
    if (typeof(action.error) === 'string') {
      message = action.error;
    } else if (typeof(action.error.error) === 'string') {
      message = action.error.error;
    } else if (action.error.response &&
                action.error.response.body &&
                typeof(action.error.response.body.error) === 'string') {
      message = action.error.response.body.error;
    } else if (action.error.response &&
                action.error.response.body &&
                action.error.response.body.error &&
                typeof(action.error.response.body.error.message) === 'string') {
      message = action.error.response.body.error.message;
    } else if (action.error.body &&
                typeof(action.error.body.error) === 'string') {
      message = action.error.body.error;
    } else if (action.error.body &&
                action.error.body.error &&
                typeof(action.error.body.error.message) === 'string') {
      message = action.error.body.error.message;
    } else if (typeof(action.error.message) === 'string') {
      message = action.error.message;
    } else if (action.error.response && typeof(action.error.response.text) === 'string') {
      message = action.error.response.text;
    } else if (action.error.response && typeof(action.error.response.statusText) === 'string') {
      message = action.error.response.statusText;
    }
  }
  return message;
}
