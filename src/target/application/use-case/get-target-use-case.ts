import { Inject } from "@nestjs/common";

export class GetTargetById {
  constructor(@Inject(targetRepositoryName) private readonly targetRepository: TargetRepository) { }
}
