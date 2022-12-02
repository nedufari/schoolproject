import { EntityRepository, Repository } from "typeorm";
import { Laboratory } from "../entities/laboratory.entity";

@EntityRepository(Laboratory)
export class LaboratoryRepository extends Repository<Laboratory>{}