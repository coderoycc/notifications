import { Inject, Injectable } from "@nestjs/common";
import { CreateTargetDTO } from "../dtos/create-target.dto";
import { targetRepoName, TargetRepository } from "src/target/domain/repository/target.repository";

@Injectable()
export class CreateTarget {
  constructor(
    @Inject(targetRepoName) private readonly targetRepository: TargetRepository
  ) { }

  async execute(data: CreateTargetDTO): Promise<void> {
    const { channelInfo, status } = data;
    const targetExists = await this.targetRepository.existByChannelInfo(channelInfo);
    if (targetExists) {
      throw new Error("Target already exists");
    }
    const target = {
      targetId: crypto.randomUUID() as string,
      channelInfo,
      enableState: status,
    };
    await this.targetRepository.save(target);
  }
}
