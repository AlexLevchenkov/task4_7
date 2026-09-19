import { Request, Response } from 'express';
import { apiResponse } from 'utils/response';
import calendarService from 'services/calendar.service';

class CalendarController {
	async getAllCalendars(req: Request, res: Response): Promise<void> {
		try {
			const calendars = await calendarService.getAllCalendars(req.user.id);
			apiResponse(res, calendars);
		} catch (error: any) {
			apiResponse(res, { message: error.message ?? 'An error occurred' }, error.statusCode ?? 500);
		}
	}

	async getCalendar(req: Request, res: Response): Promise<void> {
		try {
			const calendar = await calendarService.getCalendar({...req.validated});
			apiResponse(res, calendar);
		} catch (error: any) {
			apiResponse(res, { message: error.message ?? 'An error occurred' }, error.statusCode ?? 500);
		}
	}

	async createCalendar(req: Request, res: Response): Promise<void> {
		try {
			const calendar = await calendarService.createCalendar({ ...req.validated, userId: req.user.id });
			apiResponse(res, calendar, 201);
		} catch (error: any) {
			apiResponse(res, { message: error.message ?? 'An error occurred' }, error.statusCode ?? 500);
		}
	}

	async updateCalendar(req: Request, res: Response): Promise<void> {
		try {
			const updatedCalendar = await calendarService.updateCalendar({...req.validated});
			apiResponse(res, updatedCalendar);
		} catch (error: any) {
			apiResponse(res, { message: error.message ?? 'An error occurred' }, error.statusCode ?? 500);
		}
	}

	async deleteCalendar(req: Request, res: Response): Promise<void> {
		try {
			await calendarService.deleteCalendar({...req.validated});
			apiResponse(res, { message: 'Calendar deleted successfully' });
		} catch (error: any) {
			apiResponse(res, { message: error.message ?? 'An error occurred' }, error.statusCode ?? 500);
		}
	}

	async deleteCalendars(req: Request, res: Response): Promise<void> {
		try {
			await calendarService.deleteCalendars(req.user.id);
			apiResponse(res, { message: 'All calendars deleted successfully' });
		} catch (error: any) {
			apiResponse(res, { message: error.message ?? 'An error occurred' }, error.statusCode ?? 500);
		}
	}
}

export default new CalendarController();