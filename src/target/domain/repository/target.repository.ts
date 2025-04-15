import { Target } from "../entities/target";

export interface TargetRepository {
  findById(id: string): Promise<Target | null>;
  existByChannelInfo(channelInfo: string): Promise<boolean>;
  save(target: Target): Promise<void>;
}

export const targetRepoName = "TargetRepository";
