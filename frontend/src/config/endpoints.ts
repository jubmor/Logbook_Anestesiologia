//
export const BASE_API = import.meta.env.VITE_SOME_BASE_API_URL as string;

export const END_POINT = {
  // ======= AUTH
  LOGIN: `${BASE_API}/auth/token`,
  REGISTER: `${BASE_API}/users/register`,
  // ======= USERS
  REFRESH_USER_STATE: `${BASE_API}/users/me`,
  SEARCH_USER: `${BASE_API}/users/search`
  // ======= SPECIALIZATIONS
  // ======= INTERNSHIPS
} as const;
