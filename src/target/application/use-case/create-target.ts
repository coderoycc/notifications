import { Injectable } from "@nestjs/common";
import { CreateTargetDTO } from "../dtos/create-target.dto";

@Injectable()
export class CreateTarget {
  constructor(
    private readonly targetRepo: TargetRepository,
  ) { }

  async execute(data: CreateTargetDTO): Promise<void> {
  }
}
