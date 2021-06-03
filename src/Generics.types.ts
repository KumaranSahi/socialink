export type ResponseTemplate<T = any> = {
  message?: String;
  ok?: Boolean;
  data?: T;
};
