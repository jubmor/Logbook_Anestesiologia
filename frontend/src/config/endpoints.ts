//
export const BASE_API = import.meta.env.VITE_SOME_BASE_API_URL as string;

export const END_POINT = {
  // ======= AUTH
  LOGIN: `${BASE_API}/auth/token`,
  // ======= USERS
  REGISTER: `${BASE_API}/users/register`,
  PERSONAL_DETAILS: `${BASE_API}/users/me`,
  SEARCH_USER: `${BASE_API}/users/search`
  // ======= SPECIALIZATIONS
  // ======= INTERNSHIPS
} as const;
