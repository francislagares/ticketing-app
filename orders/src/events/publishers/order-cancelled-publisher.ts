import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from '@flagares-ticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
