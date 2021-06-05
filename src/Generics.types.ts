export type ResponseTemplate<T = any> = {
  message?: String;
  ok?: Boolean;
  data?: T;
};

export type AuthenticatedRequestsPayload<T = any>={
  data:T;
  token:string
}