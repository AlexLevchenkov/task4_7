import z from "zod";
import { makeValidator } from "utils/validation";

const getEventsSchema = z.object({});

const getEventSchema = z.object({
	id: z.coerce.string(),
});

const createEventSchema = z.object({
	calendarId: z.coerce.string(),
	title: z.coerce.string(),
	date: z.coerce.string(),
  repeat: z.coerce.string(),
	time: z.any(),
	description: z.coerce.string().default(''),
});

const updateEventSchema = z.object({
	id: z.coerce.string(),
	title: z.coerce.string(),
	date: z.coerce.string(),
  repeat: z.coerce.string(),
	time: z.any(),
	description: z.coerce.string().default(''),
});

const deleteEventSchema = z.object({
	id: z.coerce.string(),
});

const deleteCalendarEventsSchema = z.object({
	calendarId: z.coerce.string(),
});

const deleteAllEventsSchema = z.object({});

export type GetEventInput = z.infer<typeof getEventSchema>;
export type GetEventsInput = z.infer<typeof getEventsSchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type DeleteEventInput = z.infer<typeof deleteEventSchema>;
export type DeleteCalendarEventsInput = z.infer<typeof deleteCalendarEventsSchema>;
export type DeleteAllEventsInput = z.infer<typeof deleteAllEventsSchema>;

export const validateGetEvent = makeValidator(getEventSchema, {
	params: true,
});

export const validateGetEvents = makeValidator(getEventsSchema);

export const validateCreateEvent = makeValidator(createEventSchema, {
	body: true,
});

export const validateUpdateEvent = makeValidator(updateEventSchema, {
	params: true,
	body: true,
});

export const validateDeleteEvent = makeValidator(deleteEventSchema, {
	params: true,
});

export const validateDeleteCalendarEvents = makeValidator(deleteCalendarEventsSchema, {
	params: true,
});

export const validateDeleteAllEvents = makeValidator(deleteAllEventsSchema);