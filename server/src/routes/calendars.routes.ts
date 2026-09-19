import { Router } from 'express';
import { CalendarController } from 'controllers';
import {
	validateGetCalendar,
	validateGetCalendars,
	validateUpdateCalendar,
	validateDeleteCalendar,
	validateDeleteCalendars,
	validateCreateCalendar
} from 'middleware/calendar.validation';
import { verifyFirebaseToken } from 'middleware/firebaseAuth';

const calendarRouter: Router = Router();

calendarRouter.use(verifyFirebaseToken);
calendarRouter.get('/', validateGetCalendars, CalendarController.getAllCalendars.bind(CalendarController));
calendarRouter.get('/:id', validateGetCalendar, CalendarController.getCalendar.bind(CalendarController));
calendarRouter.post('/', validateCreateCalendar, CalendarController.createCalendar.bind(CalendarController));
calendarRouter.put('/:id', validateUpdateCalendar, CalendarController.updateCalendar.bind(CalendarController));
calendarRouter.delete('/:id', validateDeleteCalendar, CalendarController.deleteCalendar.bind(CalendarController));
calendarRouter.delete('/', validateDeleteCalendars, CalendarController.deleteCalendars.bind(CalendarController));

export default calendarRouter;