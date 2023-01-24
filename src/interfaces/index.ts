export type UserI = {
  _id?: string;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone: string;
  image: string;
  isAdmin: boolean;
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
