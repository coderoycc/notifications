import { TargetApiDTO } from "../../../application/dtos/target-api.dto";
import { Target } from "../../../domain/entities/target";

export class TargetApiMapper {
  static toApiTargetCreated(target: Target): TargetApiDTO {
    return {
      id: target.targetId,
      state: target.enableState,
      channelInfo: target.channelInfo,
    }
  }
}
