import { EntityRepository, Repository } from "typeorm";
import { Pharmacy } from "../entities/pharmacy.entity";

@EntityRepository(Pharmacy)
export class PharmacyRepository extends Repository<Pharmacy>{}