import { Reducer } from "redux";

export type RepeatVariants = "not" | "daily" | "weekly" | "monthly" | "yearly";

export type shownPopup = null | "create" | "view" | "edit" | "delete";

export type Time12hFormat = {
  hours: number;
  minutes: number;
  ampm: "am" | "pm";
};

export interface IEvent {
  id: string | number;
  title: string;
  date: string;
  time: {
    start: Time12hFormat;
    end: Time12hFormat;
    isAllDay: boolean;
  };
  repeat: RepeatVariants;
  calendarId: string | number;
  description: string;
}

interface IInitialState {
  eventsList: IEvent[];
  shownPopup: shownPopup;
  currentEventId: string | number | null;
}

const SET_EVENT_LIST = "set_event_list";
const ADD_EVENT_ITEM = "add_event_item";
const UPDATE_EVENT_ITEM = "update_event_item";
const DELETE_EVENT_ITEM = "delete_event_item";
const CLEAR_CALENDAR = "clear_calendar";
const TOGGLE_POPUP = "toggle_popup";

type ActionType =
  | { type: typeof SET_EVENT_LIST; value: IEvent[] }
  | { type: typeof ADD_EVENT_ITEM; value: IEvent }
  | { type: typeof UPDATE_EVENT_ITEM; value: IEvent }
  | { type: typeof DELETE_EVENT_ITEM; value: string | number }
  | {
      type: typeof TOGGLE_POPUP;
      value: { shownPopup: shownPopup; currentEventId?: string | number };
    }
  | { type: typeof CLEAR_CALENDAR; value: number };

export const setEventsList = (value: IEvent[]) => ({
  type: SET_EVENT_LIST,
  value,
});
export const addEventItem = (value: IEvent) => ({
  type: ADD_EVENT_ITEM,
  value,
});
export const updateEventItem = (value: IEvent) => ({
  type: UPDATE_EVENT_ITEM,
  value,
});
export const deleteEventItem = (value: string | number) => ({
  type: DELETE_EVENT_ITEM,
  value,
});
export const changeShownPopup = (value: {
  shownPopup: shownPopup;
  currentEventId?: string | number;
}) => ({
  type: TOGGLE_POPUP,
  value,
});
export const deleteAllEventsFromTheCalendar = (value: string | number) => ({
  type: CLEAR_CALENDAR,
  value,
});

const initialState: IInitialState = {
  eventsList: [],
  shownPopup: null,
  currentEventId: null,
};

const eventsReducer: Reducer<IInitialState, ActionType> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_EVENT_LIST:
      return { ...state, eventsList: action.value };
    case ADD_EVENT_ITEM:
      return { ...state, eventsList: [...state.eventsList, action.value] };
    case UPDATE_EVENT_ITEM:
      return {
        ...state,
        eventsList: state.eventsList.map((event) =>{
          return event.id === action.value.id ? action.value : event
        }),
      };
    case DELETE_EVENT_ITEM:
      return {
        ...state,
        eventsList: state.eventsList.filter(
          (event) => String(event.id) !== String(action.value)
        ),
      };
    case TOGGLE_POPUP:
      if (action.value.currentEventId !== undefined) {
        return {
          ...state,
          shownPopup: action.value.shownPopup,
          currentEventId: action.value.currentEventId,
        };
      }

      return {
        ...state,
        shownPopup: action.value.shownPopup,
        currentEventId: null,
      };
    case CLEAR_CALENDAR:
      return {
        ...state,
        eventsList: state.eventsList.filter(
          (event) => String(event.calendarId) !== String(action.value)
        ),
      };
    default:
      return state;
  }
};
export default eventsReducer;
