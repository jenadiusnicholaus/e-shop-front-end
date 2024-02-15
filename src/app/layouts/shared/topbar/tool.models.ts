export interface UserProfileModel {
  role: string;
  profile_picture: string;
  user: User;
}

export interface User {
  url: string;
  username: string;
  email: string;
  is_staff: boolean;
}
