import { TargetStatus } from "../interfaces/target-status.interface";

export class Target {
  targetId: string;
  channelInfo: string; // xx@mail.cc o 5534534
  enableState: TargetStatus;

  consturctor(
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
