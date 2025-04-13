import { TargetNotDefinedException } from "../exception/target.exception";

export abstract class ValueObject<T> {
  readonly value: T;
  constructor(value: T) {
    this.isDefined(value);
    this.value = value;
  }

  isDefined(value: T): void {
    if (value === undefined || value === null) {
      throw new TargetNotDefinedException();
    }
  }
}
