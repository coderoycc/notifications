import { TargetStatus } from '../enums/target-status.enum';
export class Target {
  targetId: string;
  channelInfo: string; // xx@mail.cc o 5534534
  enableState: TargetStatus;

  constructor(
    id: string,
    channelInfo: string,
    targetStatus: TargetStatus
  ) {
    this.targetId = id;
    this.channelInfo = channelInfo;
    this.enableState = targetStatus;
  }

  hasContactable(): boolean {
    return !!this.channelInfo;
  }
}
