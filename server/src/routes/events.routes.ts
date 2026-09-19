import { Router } from 'express';
import { EventController } from 'controllers';
import {
  validateGetEvent,
  validateGetEvents,
  validateUpdateEvent,
  validateDeleteEvent,
  validateDeleteCalendarEvents,
  validateCreateEvent,
  validateDeleteAllEvents
} from 'middleware/event.validation';
import { verifyFirebaseToken } from 'middleware/firebaseAuth';

const eventRouter: Router = Router();

eventRouter.use(verifyFirebaseToken);
eventRouter.get('/', validateGetEvents, EventController.getAllEvents.bind(EventController));
eventRouter.get('/:id', validateGetEvent, EventController.getEvent.bind(EventController));
eventRouter.post('/', validateCreateEvent, EventController.createEvent.bind(EventController));
eventRouter.put('/:id', validateUpdateEvent, EventController.updateEvent.bind(EventController));
eventRouter.delete('/all/:id', validateDeleteCalendarEvents, EventController.deleteCalendarEvents.bind(EventController));
eventRouter.delete('/:id', validateDeleteEvent, EventController.deleteEvent.bind(EventController));
eventRouter.delete('/', validateDeleteAllEvents, EventController.deleteAllEvents.bind(EventController));

export default eventRouter;