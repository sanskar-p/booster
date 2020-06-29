import fetch from 'cross-fetch'
import { LOCAL_PROVIDER_HOST } from './constants'

// --- Auth helpers ---

export async function createUser(username: string, password: string, roles: string[] = []): Promise<void> {
  const response = await fetch(signUpURL(), {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password,
      userAttributes: {
        roles: roles,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  await response.json()

  if (response.status != 200) {
    throw new Error('Failed to create a new user')
  }
}

export async function confirmUser(username: string): Promise<void> {
  const response: Response = await fetch(confirmUserURL(username), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  await response.json()

  if (response.status != 200) {
    throw new Error('Failed to confirm user')
  }
}

// --- URL helpers ---

export function signUpURL(): string {
  return new URL('auth/sign-up', LOCAL_PROVIDER_HOST).href
}

export function confirmUserURL(username: string): string {
  return new URL(`auth/confirm/${username}`, LOCAL_PROVIDER_HOST).href
}

export function signInURL(): string {
  return new URL('auth/sign-in', LOCAL_PROVIDER_HOST).href
}

export function signOutURL(): string {
  return new URL('auth/sign-out', LOCAL_PROVIDER_HOST).href
}