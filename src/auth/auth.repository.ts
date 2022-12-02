import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { TypeormService } from "../typeorm/typeorm.service";

@EntityRepository()
export class AuthRepository extends Repository<User>{
  
  
}


