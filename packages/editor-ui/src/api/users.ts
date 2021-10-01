import { IRestApiContext, IUser, INewUser } from '@/Interface';
import { IDataObject } from 'n8n-workflow';
import { makeRestApiRequest } from './helpers';


export async function getCurrentUser(context: IRestApiContext): Promise<IUser | null> {
	return await makeRestApiRequest(context, 'GET', '/user');
}

export async function login(context: IRestApiContext, params: {email: string, password: string}): Promise<IUser> {
	return await makeRestApiRequest(context, 'POST', '/login', params);
}

export async function logout(context: IRestApiContext): Promise<void> {
	await makeRestApiRequest(context, 'POST', '/logout');
}

export async function setupOwner(context: IRestApiContext, params: INewUser): Promise<IUser> {
	return await makeRestApiRequest(context, 'POST', '/owner-setup', params as unknown as IDataObject);
}

export async function validateSignupToken(context: IRestApiContext, params: {token: string}): Promise<{inviter: {firstName: string, lastName: string}}> {
	return await makeRestApiRequest(context, 'GET', '/resolve-signup-token', params);
}

export async function signup(context: IRestApiContext, params: INewUser): Promise<IUser> {
	return await makeRestApiRequest(context, 'POST', '/user', params as unknown as IDataObject);
}

export async function sendForgotPasswordEmail(context: IRestApiContext, params: {email: string}): Promise<void> {
	await makeRestApiRequest(context, 'POST', '/forgot-password', params);
}

export async function validatePasswordToken(context: IRestApiContext, params: {token: string}): Promise<void> {
	await makeRestApiRequest(context, 'GET', '/resolve-password-token', params);
}

export async function changePassword(context: IRestApiContext, params: {token: string, password: string}): Promise<void> {
	await makeRestApiRequest(context, 'POST', '/change-password', params);
}

export async function updateUser(context: IRestApiContext, params: IUser): Promise<IUser> {
	return await makeRestApiRequest(context, 'PATCH', `/user/${params.id}`, params as unknown as IDataObject);
}

export async function updateUserPassword(context: IRestApiContext, params: {id: string, password: string}): Promise<void> {
	return await makeRestApiRequest(context, 'PATCH', `/user/${params.id}/password`, params);
}

export async function deleteUser(context: IRestApiContext, {id, transferId}: {id: string, transferId?: string}): Promise<IUser> {
	return await makeRestApiRequest(context, 'DELETE', `/user/${id}`, transferId ? { transferId } : {});
}

export async function getUsers(context: IRestApiContext): Promise<IUser[]> {
	return await makeRestApiRequest(context, 'GET', '/users');
}

export async function inviteUsers(context: IRestApiContext, params: {emails: string[], role: string}): Promise<IUser[]> {
	return await makeRestApiRequest(context, 'POST', '/invite', params);
}

export async function reinvite(context: IRestApiContext, params: {id: string}): Promise<void> {
	await makeRestApiRequest(context, 'POST', '/reinvite', params);
}
