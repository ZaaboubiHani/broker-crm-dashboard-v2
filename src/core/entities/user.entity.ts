import WilayaEntity from "./wilaya.entity";

export enum UserRole {
    admin = 'Admin',
    supervisor = 'Supervisor',
    delegate = 'Delegate',
    kam = 'Kam',
    operator = 'Operator',
    superAdmin = 'SuperAdmin',
}

export default class UserEntity {
    _id?: string;
    username?: string;
    fullName?: string;
    phonePersonal?: string;
    phoneProfessional?: string;
    address?: string;
    email?: string;
    isBlocked?: boolean;
    password?: string;
    accessToken?: string;
    refreshToken?: string;
    wilaya?: string;
    commune?: string;
    createdAt?: Date;
    createdBy?: string;
    role?: UserRole;
    wilayas?: WilayaEntity[];

    constructor(data?: Partial<UserEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    static fromJson(json: Record<string, any>): UserEntity {
        const createdAt = json.createdAt ? new Date(json.createdAt) : undefined;
        createdAt?.setHours(createdAt.getHours() + 1);
        return new UserEntity({ ...json, createdAt });
    }

    toJson(): Record<string, any> {

        return { ...this };
    }

    copyWith(data: Partial<UserEntity>): UserEntity {
        return new UserEntity({ ...this, ...data });
    }

}