import { Request, Response } from 'express';
import { apiResponse } from 'utils/response';
import eventService from 'services/event.service';

class EventController {
	async getAllEvents(req: Request, res: Response): Promise<void> {
		try {
			const events = await eventService.getAllEvents(req.user.id);
			apiResponse(res, events);
		} catch (error: any) {
			apiResponse(res, { message: error.message ?? 'An error occurred' }, error.statusCode ?? 500);
		}
	}

	async getEvent(req: Request, res: Response): Promise<void> {
		try {
			const event = await eventService.getEvent({...req.validated});
			apiResponse(res, event);
		} catch (error: any) {
			apiResponse(res, { message: error.message ?? 'An error occurred' }, error.statusCode ?? 500);
		}
	}

	async createEvent(req: Request, res: Response): Promise<void> {
		try {
			const event = await eventService.createEvent({ ...req.validated, userId: req.user.id });
			apiResponse(res, event, 201);
		} catch (error: any) {
			apiResponse(res, { message: error.message ?? 'An error occurred' }, error.statusCode ?? 500);
		}
	}

	async updateEvent(req: Request, res: Response): Promise<void> {
		try {
			const updatedEvent = await eventService.updateEvent({...req.validated});
			apiResponse(res, updatedEvent);
		} catch (error: any) {
			apiResponse(res, { message: error.message ?? 'An error occurred' }, error.statusCode ?? 500);
		}
	}

	async deleteEvent(req: Request, res: Response): Promise<void> {
		try {
			await eventService.deleteEvent({...req.validated});
			apiResponse(res, { message: 'Event deleted successfully' });
		} catch (error: any) {
			apiResponse(res, { message: error.message ?? 'An error occurred' }, error.statusCode ?? 500);
		}
	}

	async deleteCalendarEvents(req: Request, res: Response): Promise<void> {
		try {
			await eventService.deleteCalendarEvents({...req.validated});
			apiResponse(res, { message: 'All events in this calendar have been deleted.' });
		} catch (error: any) {
			apiResponse(res, { message: error.message ?? 'An error occurred' }, error.statusCode ?? 500);
		}
	}

	async deleteAllEvents(req: Request, res: Response): Promise<void> {
		try {
			await eventService.deleteAllEvents(req.user.id);
			apiResponse(res, { message: 'All events deleted successfully' });
		} catch (error: any) {
			apiResponse(res, { message: error.message ?? 'An error occurred' }, error.statusCode ?? 500);
		}
	}
}

export default new EventController();