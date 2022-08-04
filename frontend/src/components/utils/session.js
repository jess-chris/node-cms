import { csrfFetch } from "./csrf";



export const createUser = async ( user ) => {


};



export const restoreUser = async () => {

  const res = await csrfFetch('/api/session');
  const data = await res.json();
  return data;

};


export const login = async ( user ) => {

  const {username, password} = user;

  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    })
  });

  const data = await res.json();

  return data;

};


export const logout = async () => {

  const res = await csrfFetch('/api/session', {
    method: 'DELETE'
  });

  return res;

};