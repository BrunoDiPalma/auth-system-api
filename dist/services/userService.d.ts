import { loginUserDTO, RegisterUserDTO } from "../schemas/userSchema";
import { UserResponse } from "../types/user";
export declare const registerUserService: (data: RegisterUserDTO) => Promise<UserResponse>;
export declare const loginUserService: (data: loginUserDTO) => Promise<{
    user: {
        id: string;
        nome: string;
        email: string;
    };
    token: string;
}>;
export declare const getMeService: (userId: string) => Promise<{
    id: string;
    nome: string;
    email: string;
}>;
export declare const getUserService: () => Promise<{
    id: string;
    nome: string;
    email: string;
}[]>;
export declare const getUserbyIdService: (id: string) => Promise<{
    id: string;
    nome: string;
    email: string;
}>;
export declare const updateUserService: (id: string, data: {
    nome?: string | undefined;
    email?: string | undefined;
    senha?: string | undefined;
}) => Promise<{
    id: string;
    nome: string;
    email: string;
}>;
export declare const deleteUserService: (id: string) => Promise<{
    message: string;
}>;
//# sourceMappingURL=userService.d.ts.map