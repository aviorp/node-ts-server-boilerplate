export type UserI = {
  _id?: string;
  username: string;
  password?: string;
  first_name: string;
  last_name: string;
  image: string;
  is_admin: boolean;
};
export type ErrorI = {
  message: string;
  statusCode?: string;
  status?: string;
  stack?: string;
};

export type HealthCheckResponseI = {
  status: string;
  message: string;
};

export type PrismaParamsI = {
  args: object | undefined;
  dataPath: [];
  runInTransaction: boolean;
  action: string;
  model: string;
};
