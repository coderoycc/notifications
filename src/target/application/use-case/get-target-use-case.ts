import { Inject } from "@nestjs/common";
import { targetRepoName, TargetRepository } from "../../domain/repository/target.repository";

export class GetTargetById {
  constructor(
    @Inject(targetRepoName) private readonly targetRepository: TargetRepository
  ) { }
  async execute(id: string) {
    const target = await this.targetRepository.findById(id);
    if (!target)
      throw new Error("Target not found");
    return target;
  }
}
