import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator(
    (data:string|undefined, ctx: ExecutionContext)=>{
        const request: Express.Request=ctx.switchToHttp().getRequest();
        return request.user
        if (data){
            return request.user[data]
        }
    }
)
/// decorator for getting the user to know if its th right user is performing some crud actions.