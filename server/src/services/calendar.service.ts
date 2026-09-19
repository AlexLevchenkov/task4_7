import {
	CreateCalendarInput,
	DeleteCalendarInput,
	GetCalendarInput,
	UpdateCalendarInput
} from "middleware/calendar.validation";
import { Calendars } from '@prisma/client';
import { IThisWhisUserId } from 'types';
import prisma from "config/database";

class CalendarService {
	async getAllCalendars(userId: string): Promise<Calendars[]> {
		const calendars = await prisma.calendars.findMany({
			where: { userId } 
		});

		if (!calendars) {
			throw { message: 'No calendars found', statusCode: 404 };
		}

		return calendars;
	}

	async getCalendar({id}: GetCalendarInput): Promise<Calendars> {
		const calendar = await prisma.calendars.findUnique({
			where: { id } 
		});

		if (!calendar) {
			throw { message: 'Calendar not found', statusCode: 404 };
		}

		return calendar;
	}

	async createCalendar({userId, title, color, visible}: IThisWhisUserId<CreateCalendarInput>): Promise<Calendars> {
		const newCalendar = await prisma.calendars.create({
			data: {
				userId,
				title,
				color,
				visible
			}
		});

		if (!newCalendar) {
			throw { message: 'Failed to create calendar', statusCode: 500 };
		}

		return newCalendar;
	}

	async updateCalendar({id, title, color, visible}: UpdateCalendarInput): Promise<Calendars> {
		const calendar = await prisma.calendars.update({
			where: { id },
			data: {
				title,
				color,
				visible
			}
		});

		if (!calendar) {
			throw { message: 'Failed to update calendar', statusCode: 500 };
		}

		return calendar;
	}

	async deleteCalendar({id}: DeleteCalendarInput): Promise<void> {
		await prisma.calendars.delete({
			where: { id }
		});
	}

	async deleteCalendars(userId: string): Promise<void> {
		await prisma.calendars.deleteMany({
			where: { userId }
		});
	}
}

export default new CalendarService();