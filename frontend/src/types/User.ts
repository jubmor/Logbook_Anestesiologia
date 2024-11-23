export type UserProps = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_type: UserType;
};

export type UserType = "intern" | "tutor" | "admin";
