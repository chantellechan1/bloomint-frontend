import * as AxiosService from "../services/AxiosService";
import axios from "axios";

export interface GenericResponse {
    status: string,
    error?: unknown
}

export interface CreateAccountRequest {
    email: string
}

export interface CreateAccountResponse extends GenericResponse {}

export const CreateAccount = async (req: CreateAccountRequest): Promise<CreateAccountResponse> => {

    const res = await axios.post<string>(
        `/auth/create_user`,
        req,
        AxiosService.getOptions()
    );

    if (res.data === 'success') {
        return { status: 'success' }
    } else {
        throw new Error(res.data)
    }

}

export interface LoginRequest {
    email: string,
    password: string
}

export interface LoginResponse extends GenericResponse {
    jwt: string
}

export const Login = async (req: LoginRequest): Promise<LoginResponse> => {

    const res = await axios.post<{jwt: string}>(
        `/auth/login`,
        req,
        AxiosService.getOptions()
    );

    return {status: 'success', jwt: res.data.jwt}
}


