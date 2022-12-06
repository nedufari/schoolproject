import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { userRole } from "../../entities/user.entity";
import { ROLES_KEY } from "./role.decorator";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor (private reflector:Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const requiredroles = this.reflector.getAllAndOverride<userRole[]>(ROLES_KEY,[
            context.getHandler(),
            context.getClass()
        ])
        if (!requiredroles){
            return true
        }
        const {user}=context.switchToHttp().getRequest()
        return requiredroles.some((role)=> user.roles?.includes(role))
        
    }
}