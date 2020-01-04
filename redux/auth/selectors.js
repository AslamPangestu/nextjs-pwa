const all = store => store.auth;
const username = store => store.auth.username;
const password = store => store.auth.password;

export default {
  all,
  username,
  password
};
