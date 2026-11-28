
// Unit-тесты состояния авторизации Liner Web Frontend.
import { describe, expect, it } from 'vitest'
import { createAuthStore } from '../../../src/store/auth.store'
import type { IAuthService } from '../../../src/interfaces/auth-service.interface'

const testUser = {
    id: 'user-1',
    name: 'Test User',
    email: 'test@example.com',
}

const defaultService: IAuthService = {
    signIn: async () => ({ ok: false, message: 'Not configured' }),
    signUp: async () => ({ ok: false, message: 'Not configured' }),
}

describe('Auth Store', () => {
    it('starts without an authenticated user', () => {
        const store = createAuthStore(defaultService)

        expect(store.getState().user).toBeNull()
        expect(store.getState().status).toBe('idle')
    })

    it('saves the user after successful sign-in', async () => {
        const store = createAuthStore({
            ...defaultService,
            signIn: async () => ({ ok: true, user: testUser }),
        })

        const result = await store.getState().signIn({
            email: 'test@example.com',
            password: 'password123',
        })

        expect(result).toBe(true)
        expect(store.getState().user).toEqual(testUser)
        expect(store.getState().status).toBe('success')
    })

    it('does not authenticate a user when sign-in fails', async () => {
        const store = createAuthStore({
            ...defaultService,
            signIn: async () => ({
                ok: false,
                message: 'Invalid credentials',
            }),
        })

        const result = await store.getState().signIn({
            email: 'test@example.com',
            password: 'wrongpassword',
        })

        expect(result).toBe(false)
        expect(store.getState().user).toBeNull()
        expect(store.getState().status).toBe('error')
        expect(store.getState().message).toBe('Invalid credentials')
    })

    it('clears the user after sign-out', async () => {
        const store = createAuthStore({
            ...defaultService,
            signIn: async () => ({ ok: true, user: testUser }),
        })

        await store.getState().signIn({
            email: 'test@example.com',
            password: 'password123',
        })

        store.getState().signOut()

        expect(store.getState().user).toBeNull()
        expect(store.getState().status).toBe('idle')
    })

    it('saves the user after successful sign-up', async () => {
        const store = createAuthStore({
            ...defaultService,
            signUp: async () => ({ ok: true, user: testUser }),
        })

        const result = await store.getState().signUp({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            confirmPassword: 'password123',
        })

        expect(result).toBe(true)
        expect(store.getState().user).toEqual(testUser)
        expect(store.getState().status).toBe('success')
    })

    it('does not authenticate a user when sign-up fails', async () => {
        const store = createAuthStore({
            ...defaultService,
            signUp: async () => ({
                ok: false,
                message: 'Email already registered',
            }),
        })

        const result = await store.getState().signUp({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            confirmPassword: 'password123',
        })

        expect(result).toBe(false)
        expect(store.getState().user).toBeNull()
        expect(store.getState().status).toBe('error')
        expect(store.getState().message).toBe('Email already registered')
    })

})
