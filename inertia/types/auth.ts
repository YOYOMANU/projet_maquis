export type User = {
  id: number
  fullName: string | null
  email: string
  avatar?: string
  initials: string
  createdAt: string | null
  updatedAt: string | null
}

export type Auth = {
  user: User
}

/* @chisel-passkeys */
export type Passkey = {
  id: number
  name: string
  authenticator: string | null
  created_at_diff: string
  last_used_at_diff: string | null
}
/* @end-chisel-passkeys */

export type TwoFactorSetupData = {
  svg: string
  url: string
}

export type TwoFactorSecretKey = {
  secretKey: string
}
