import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@flagares-ticketing/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  readonly subject: Subjects.ExpirationCompleted = Subjects.ExpirationCompleted;
}
