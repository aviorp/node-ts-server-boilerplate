export interface UserI {
  _id?: string
  username: string
  password?: string
  first_name: string
  last_name: string
  image: string
  is_admin: boolean
}
export interface ErrorI {
  message: string
  statusCode?: string
  status?: string
  stack?: string
}

export interface HealthCheckResponseI {
  status: string
  message: string
}

export interface PrismaParamsI {
  args: object | undefined
  dataPath: []
  runInTransaction: boolean
  action: string
  model: string
}
