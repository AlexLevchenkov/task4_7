import { Reducer } from "redux";

export interface ICalendar {
  id: string | number;
  title: string;
  color: string;
  visible: boolean;
}

interface IInitialState {
  calendarList: ICalendar[];
}

const SET_CALENDAR_LIST = "set_calendar_list";
const ADD_CALENDAR_ITEM = "add_calendar_item";
const UPDATE_CALENDAR_ITEM = "update_calendar_item";
const DELETE_CALENDAR_ITEM = "delete_calendar_item";

type ActionType =
  | { type: typeof SET_CALENDAR_LIST; value: ICalendar[] }
  | { type: typeof ADD_CALENDAR_ITEM; value: ICalendar }
  | { type: typeof UPDATE_CALENDAR_ITEM; value: ICalendar }
  | { type: typeof DELETE_CALENDAR_ITEM; value: string | number };


export const setCalendarList = (value: ICalendar[]) => ({
  type: SET_CALENDAR_LIST,
  value,
});

export const addCalendarItem = (value: ICalendar) => ({
  type: ADD_CALENDAR_ITEM,
  value,
});

export const updateCalendarItem = (value: ICalendar) => ({
  type: UPDATE_CALENDAR_ITEM,
  value,
});

export const deleteCalendarItem = (value: string | number) => ({
  type: DELETE_CALENDAR_ITEM,
  value,
});


const initialState: IInitialState = {
  calendarList: [],
};

const calendarsReducer: Reducer<IInitialState, ActionType> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_CALENDAR_LIST:
      return { ...state, calendarList: action.value };
    case ADD_CALENDAR_ITEM:
      return { 
        ...state, 
        calendarList: [...state.calendarList, action.value]
      };
    case UPDATE_CALENDAR_ITEM:
      return {
        ...state,
        calendarList: state.calendarList.map((item) =>
          item.id === action.value.id ? action.value : item
        ),
      };
    case DELETE_CALENDAR_ITEM:
      return {
        ...state,
        calendarList: state.calendarList.filter((item) =>
          String(item.id) !== String(action.value)
        ),
      };
    default:
      return state;
  }
};
export default calendarsReducer;
