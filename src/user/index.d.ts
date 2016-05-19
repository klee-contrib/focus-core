import {UserStore} from '../store';

export interface Login {
    login: string;
    password: string;
}

export interface Profile {
    id: string;
    provider: string;
    displayName: string;
    culture: string;
    email: string;
    photo: string;
    firstName: string;
    lastName: string;
}

/**
 * The built-in userStore.
 */
export let builtInStore: UserStore;

/**
 * Checks if a user has the given role or roles.
 * @param role A role or a list of roles.
 */
export function hasRole(role: string | string[]): boolean

/**
 * Gets the user login.
 */
export function getLogin(): Login

/**
 * Gets the user profile.
 */
export function getProfile(): Profile

/**
 * Gets the user roles.
 */
export function getRoles(): string[]

/**
 * Sets user profile.
 * @param login User login.
 */
export function setLogin(login: Login): void

/*
 * Sets the user profile.
 * @param profile User profile.
 */
export function setProfile(profile: Profile): void

/**
 * Sets the user roles.
 * @param roles User role list.
 */
export function setRoles(roles: string[]): void