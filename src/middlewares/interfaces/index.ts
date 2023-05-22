
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

export interface DriverI {
  id?: string
  first_name: string
  last_name: string
  password: string
  image: string
  username: string
  phone: string
  email: string
  is_busy: boolean
  // vehicles: Vehicle[]
  created_at?: string
  // transports: Transport[]
  license: string
  ensurance: string
  kids_allowed: boolean
  kids_allowance_image: string
  is_verified: boolean
}

export interface TransportI {
  id?: string
  origin: string
  destination: string
  from_date: Date
  to_date: Date
  arrival_time?: Date
  price: string
  provider_id: string
  driver_id: string
  status: string
  seats_number: number
  created_at?: string
  vehicle_id: string
}

export interface VehicleI {
  id?: string
  name: string
  image: string
  model: string
  driver_id: string
  created_at: Date
  updated_at: Date
  seats_number: number

}
