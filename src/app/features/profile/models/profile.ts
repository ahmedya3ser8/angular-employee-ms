export interface IProfileResponse {
  success: boolean;
  message: string;
  data: IProfileFormData;
}

export interface IProfileFormData {
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  bio: string;
}
