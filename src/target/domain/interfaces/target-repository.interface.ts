import { Target } from "../entities/target";

export const TARGET_REPOSITORY = 'TARGET_REPOSITORY';

export interface TargetRepository {
  findById(id: string): Promise<Target | null>;

  save(target: Target): Promise<Target | null>;

  existByChannelInfo(channelInfo: string): Promise<boolean>;

  update(target: Target): Promise<Target | null>;
}
