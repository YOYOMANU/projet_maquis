export type User = {
  createdAt: string | null
  email: string
  fullName: string | null
  id: number
  updatedAt: string | null
  initials: string
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
