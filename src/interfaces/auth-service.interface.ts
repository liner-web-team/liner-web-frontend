
// Контракт сервиса авторизации Liner Web Frontend.
// Не зависит от Mock или конкретного HTTP-клиента.

import type {
  AuthResult,
  SignInPayload,
  SignUpPayload,
} from '../types/auth'

export interface IAuthService {
  signIn(payload: SignInPayload): Promise<AuthResult>
  signUp(payload: SignUpPayload): Promise<AuthResult>
}
