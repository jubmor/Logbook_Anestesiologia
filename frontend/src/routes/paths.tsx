export enum PATHS {
  ROOT = "/",

  //===================> Auth
  AUTH = "/auth/",
  LOGIN = `${PATHS.AUTH}login`,
  REGISTER = `${PATHS.AUTH}register`,
  RECOVER_PASSWORD = `${PATHS.AUTH}recover-password`,

  //===================> Profile
  PROFILE = "/a-minha-conta",

  //===================> Records
  RECORDS = "/registos",
  NEW_RECORD = `${PATHS.RECORDS}/novo`,

  //===================> Casuistry
  CASUISTRY = "/casuistica",

  //===================> Rotations
  ROTATIONS = "/estagios"
}
