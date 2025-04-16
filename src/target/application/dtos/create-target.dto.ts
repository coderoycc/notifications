import { TargetStatus } from "src/target/domain/enums/target-status.enum";

export class CreateTargetDTO {
  channelInfo: string;
  status: TargetStatus;
}
