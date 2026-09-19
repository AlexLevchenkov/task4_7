import z from "zod";
import { makeValidator } from "utils/validation";

const getCalendarsSchema = z.object({});

const getCalendarSchema = z.object({
	id: z.coerce.string(),
});

const createCalendarSchema = z.object({
	title: z.coerce.string(),
	color: z.coerce.string(),
  visible: z.coerce.boolean().default(true),
});

const updateCalendarSchema = z.object({
	id: z.coerce.string(),
	title: z.coerce.string(),
	color: z.coerce.string(),
  visible: z.coerce.boolean().default(true),
});

const deleteCalendarSchema = z.object({
	id: z.coerce.string(),
});

const deleteCalendarsSchema = z.object({
	userId: z.coerce.string()
});

export type GetCalendarInput = z.infer<typeof getCalendarSchema>;
export type GetCalendarsInput = z.infer<typeof getCalendarsSchema>;
export type CreateCalendarInput = z.infer<typeof createCalendarSchema>;
export type UpdateCalendarInput = z.infer<typeof updateCalendarSchema>;
export type DeleteCalendarInput = z.infer<typeof deleteCalendarSchema>;
export type DeleteCalendarsInput = z.infer<typeof deleteCalendarsSchema>;

export const validateGetCalendar = makeValidator(getCalendarSchema, {
	params: true,
});

export const validateGetCalendars = makeValidator(getCalendarsSchema);

export const validateCreateCalendar = makeValidator(createCalendarSchema, {
	body: true,
});

export const validateUpdateCalendar = makeValidator(updateCalendarSchema, {
	params: true,
	body: true,
});

export const validateDeleteCalendar = makeValidator(deleteCalendarSchema, {
	params: true,
});

export const validateDeleteCalendars = makeValidator(deleteCalendarsSchema);