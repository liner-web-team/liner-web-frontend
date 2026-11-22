export type AuthMode = 'signin' | 'signup'

export type AuthUser = {
  id: string
  name: string
  email: string
}

export type SignInPayload = {
  email: string
  password: string
}

export type SignUpPayload = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type AuthResult =
  | { ok: true; user: AuthUser }
  | { ok: false; message: string }
