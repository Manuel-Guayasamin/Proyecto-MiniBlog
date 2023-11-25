export const response_created = (message, data, id) => {
  return {
    success: true,
    status: 201,
    message: message,
    data: data,
    id_inserted: id
  }
};

export const response_success = (message, data) => {
  return {
    success: true,
    status: 200,
    message: message,
    data: data
  }
};

export const response_not_found = (message) => {
  return {
    success: false,
    status: 404,
    message: message,
    data: null
  }
};

export const response_error = (message) => {
  return {
    success: false,
    status: 500,
    message: message,
    data: null
  }
};