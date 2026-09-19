import {
	CreateEventInput,
	DeleteCalendarEventsInput,
	DeleteEventInput,
	GetEventInput,
	UpdateEventInput
} from "middleware/event.validation";
import { Events } from '@prisma/client';
import { IThisWhisUserId } from 'types';
import prisma from "config/database";

class EventService {
	async getAllEvents(userId: string): Promise<Events[]> {
		// Check if there are any events in the database for the given userId. If not, return an empty array.
		if (await prisma.events.count() === 0) return [];

		const events = await prisma.events.findMany({
			where: { userId },
		});

		if (!events) {
			return [];
		}

		return events.map(event => ({
			...event,
			time: JSON.parse(event.time || "")
		}));
	}

	async getEvent({id}: GetEventInput): Promise<Events> {
		const event = await prisma.events.findUnique({
			where: { id }
		});

		if (!event) {
			throw { message: 'Event not found', statusCode: 404 };
		}

		return event;
	}

	async createEvent({userId, calendarId, title, date, repeat, time, description}: IThisWhisUserId<CreateEventInput>): Promise<Events> {
		const newEvent = await prisma.events.create({
			data: {
				userId,
				calendarId,
				title,
				date,
				repeat,
				time: JSON.stringify(time),
				description
			}
		});

		if (!newEvent) {
			throw { message: 'Failed to create event', statusCode: 500 };
		}

		return newEvent;
	}

	async updateEvent({id, title, date, repeat, time, description}: UpdateEventInput): Promise<Events> {
		const event = await prisma.events.update({
			where: { id },
			data: {
				title,
				date,
				repeat,
				time: JSON.stringify(time),
				description
			}
		});

		if (!event) {
			throw { message: 'Failed to update event', statusCode: 500 };
		}

		return {
			...event,
			time: JSON.parse(event.time || "")
		};
	}

	async deleteEvent({id}: DeleteEventInput): Promise<void> {
		await prisma.events.delete({
			where: { id }
		});
	}

	async deleteCalendarEvents({ calendarId }: DeleteCalendarEventsInput): Promise<void> {
		await prisma.events.deleteMany({
			where: { calendarId }
		});
	}

	async deleteAllEvents(userId: string): Promise<void> {
		await prisma.events.deleteMany({
			where: { userId }
		});
	}
}

export default new EventService();