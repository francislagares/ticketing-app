import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from '@flagares-ticketing/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
