export type IUser = {
  id: string;
  name: string;
  password: string;
  email: string;
  role: string;
  contactNo: string;
  address: string;
  profileImg: string;
};

export type IUserFilterRequest = {
  name?: string;
  email?: string;
  role?: string;
  contactNo?: string;
  address?: string;
};
