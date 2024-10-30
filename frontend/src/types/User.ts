export type UserProps = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  usertype: UserType;
};

export type UserType = "intern" | "tutor" | "admin";
