import Cookies from "js-cookie";

/* =========================
   COOKIE KEYS
========================= */

const AUTH_TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "auth_user";

/* =========================
   SET TOKEN
========================= */

export const setAuthToken = (token: string) => {
  Cookies.set(AUTH_TOKEN_KEY, token, {
    expires: 7, // 7 days
    path: "/",
  });
};

/* =========================
   GET TOKEN
========================= */

export const getAuthToken = () => {
  return Cookies.get(AUTH_TOKEN_KEY) || null;
};

/* =========================
   REMOVE TOKEN
========================= */

export const removeAuthToken = () => {
  Cookies.remove(AUTH_TOKEN_KEY, { path: "/" });
  Cookies.remove(USER_DATA_KEY, { path: "/" });
};

/* =========================
   USER DATA (Optional)
========================= */

export const setAuthUser = (user: any) => {
  Cookies.set(USER_DATA_KEY, JSON.stringify(user), {
    expires: 7,
    path: "/",
  });
};

export const getAuthUser = () => {
  const user = Cookies.get(USER_DATA_KEY);
  return user ? JSON.parse(user) : null;
};
