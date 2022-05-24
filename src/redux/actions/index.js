export const ADD_NAME = 'ADD_NAME';
export const ADD_EMAIL = 'ADD_EMAIL';

export function actionAddName(name) {
  return {
    type: ADD_NAME,
    payload: name,
  };
}

export function actionAddEmail(email) {
  return {
    type: ADD_EMAIL,
    payload: email,
  };
}
