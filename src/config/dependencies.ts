
// Регистрация зависимостей Liner Web Frontend.
// Здесь выбираются конкретные реализации сервисных интерфейсов.

import type { IAuthService } from '../interfaces/auth-service.interface'
import { mockAuthService } from '../services/auth/mockAuth'

export const dependencies: {
  authService: IAuthService
} = {
  authService: mockAuthService,
}
