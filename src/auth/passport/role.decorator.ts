import { SetMetadata } from "@nestjs/common";
import { userRole } from "../../entities/user.entity";


export const ROLES_KEY = 'role';
export const Roles =(...role:userRole[])=> SetMetadata(ROLES_KEY,role)