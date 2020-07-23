import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@flagares-ticketing/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
