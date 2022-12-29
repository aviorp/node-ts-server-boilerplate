export interface UserI {
  _id?: string;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone: string;
  image: string;
  isAdmin: boolean;
}

export interface ErrorI {
  message: string;
  statusCode?: string;
  status?: string;
  stack?: string;
}

export interface HealthCheckResponseI {
  status: string;
  message: string;
}

export interface PrismaParamsI {
  args: object | undefined;
  dataPath: [];
  runInTransaction: boolean;
  action: string;
  model: string;
}
