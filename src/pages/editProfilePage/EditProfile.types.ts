export type EditProfile = {
  name: string;
  bio: string;
  privacy: boolean;
  password: string;
  formTouched: boolean;
};

export type EditProfileAction =
  | { type: "ADD_NAME"; payload: string }
  | { type: "ADD_BIO"; payload: string }
  | { type: "ADD_PASSWORD"; payload: string }
  | { type: "SET_PRIVACY"; payload: boolean };
