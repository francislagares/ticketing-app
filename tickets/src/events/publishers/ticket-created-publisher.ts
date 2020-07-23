import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@flagares-ticketing/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
