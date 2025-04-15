import { Target } from "src/target/domain/entities/target";
import { TargetStatus } from "src/target/domain/enums/target-status.enum";
import { TargetRepository } from "src/target/domain/repository/target.repository";

export class TypeOrmTargetRepository implements TargetRepository {

  findById(id: string): Promise<Target | null> {
    return Promise.resolve(new Target(id, 'asd', TargetStatus.ENABLED));
  };
  existByChannelInfo(channelInfo: string): Promise<boolean> {
    return Promise.resolve(true);
  };
  save(target: Target): Promise<void> {
    return Promise.resolve();
  }
}
