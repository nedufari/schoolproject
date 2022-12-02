import { EntityRepository, Repository } from "typeorm";
import { Hospital } from "../entities/hospital.entity";
@EntityRepository(Hospital)
export class HospitalRepository extends Repository<Hospital>{}