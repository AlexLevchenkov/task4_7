import { Reducer } from "redux";

export enum Periods {
  Day = "Day",
  Week = "Week",
}

export type TPeriod = Periods.Day | Periods.Week;


export interface IUser {
  id: number;
  userName: string;
  userLogo: string | null;
}

interface IInitialState {
  selectedDate: string;
  period: TPeriod;
  user: IUser | null;
  colorList: {
    id: number;
    color: string;
    filter: string;
  }[];
  showAside: boolean;
}


const SET_SELECTED_DATE = "set_selected_date";
const SET_PERIOD = "set_period";
const SET_USER = "set_user";
const TOGGLE_ASIDE = "toggle_aside";


type ActionType =
  | { type: typeof SET_SELECTED_DATE; value: string }
  | { type: typeof SET_PERIOD; value: TPeriod }
  | { type: typeof SET_USER; value: IUser | null }
  | { type: typeof TOGGLE_ASIDE }


export const setSelectedDate = (value: string) => ({
  type: SET_SELECTED_DATE,
  value,
});
export const setPeriod = (value: TPeriod) => ({
  type: SET_PERIOD,
  value,
});
export const setUser = (value: IUser | null) => ({
  type: SET_USER,
  value,
});
export const toggleAside = () => ({
  type: TOGGLE_ASIDE,
});

const initialState: IInitialState = {
  selectedDate: new Date().toISOString(),
  period: Periods.Week,
  user: {
    id: 0,
    userName: "UserName",
    userLogo: null,
  },
  colorList: [
    {id: 0, color: "#9F2957", filter: "invert(23%) sepia(29%) saturate(3895%) hue-rotate(307deg) brightness(91%) contrast(93%)"},
    {id: 1, color: "#D90056", filter: "invert(14%) sepia(96%) saturate(6017%) hue-rotate(329deg) brightness(84%) contrast(104%)"},
    {id: 2, color: "#E25D33", filter: "invert(61%) sepia(93%) saturate(3946%) hue-rotate(340deg) brightness(91%) contrast(93%)"},
    {id: 3, color: "#DFC45A", filter: "invert(86%) sepia(28%) saturate(835%) hue-rotate(355deg) brightness(92%) contrast(90%"},
    {id: 4, color: "#B8C42F", filter: "invert(77%) sepia(68%) saturate(460%) hue-rotate(14deg) brightness(87%) contrast(95%)"},
    {id: 5, color: "#16AF6E", filter: "invert(62%) sepia(39%) saturate(6974%) hue-rotate(121deg) brightness(95%) contrast(83%)"},
    {id: 6, color: "#429488", filter: "invert(50%) sepia(49%) saturate(398%) hue-rotate(122deg) brightness(93%) contrast(90%"},
    {id: 7, color: "#397E49", filter: "invert(38%) sepia(24%) saturate(877%) hue-rotate(82deg) brightness(103%) contrast(94%)"},
    {id: 8, color: "#439BDF", filter: "invert(76%) sepia(68%) saturate(4628%) hue-rotate(180deg) brightness(92%) contrast(89%)"},
    {id: 9, color: "#4254AF", filter: "invert(35%) sepia(14%) saturate(4240%) hue-rotate(202deg) brightness(86%) contrast(90%)"},
    {id: 10, color: "#6C7AC4", filter: "invert(49%) sepia(48%) saturate(540%) hue-rotate(193deg) brightness(90%) contrast(81%)"},
    {id: 11, color: "#8332A4", filter: "invert(25%) sepia(34%) saturate(2866%) hue-rotate(257deg) brightness(98%) contrast(99%)"},
  ],
  showAside: false
};

const userProfileReducer: Reducer<IInitialState, ActionType> = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_DATE:
      return { ...state, selectedDate: action.value };
    case SET_PERIOD:
      return { ...state, period: action.value };
    case SET_USER:
      return { ...state, user: action.value };
    case TOGGLE_ASIDE:
      return { ...state, showAside: !state.showAside };
    default:
      return state;
  }
};
export default userProfileReducer;