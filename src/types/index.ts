
export interface DbTables {
  'VOTES': string
  'GAMES': string
  'USERS': string
}

export interface GameI {
  id: string
  name: string
  badges: string
  rank: number
  server_type: string
  url: string
}

export interface SqsNames {
  'lambda': string
  'vote': string
}

export interface VoteI {
  id: string
  user_id: string
  game_id: string
  server_type: string
  votes: number
  created_at: string
  username: string
  daily_votes: number
  password?: string
  server_name: string
  vote_id: string

}

export interface PaypalEventPayloadI {
  event_type: string
  summary: string
  resource: {
    id: string
    plan_id: string
    quantity: number
  }
}
export interface PaypalEventParsedPayloadI {
  event_type: string
  summary: string
  subscription_id: string
  plan_id: string
  quantity: number
}

export interface UserI {
  id: string
  is_active: boolean
  subscription_id: string
}
