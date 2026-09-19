import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Aside, EventsCalendar, EventsPopup, Header } from "components/Complex";
import { calendarsApi, eventsApi } from "./api";
import { setCalendarList, ICalendar } from "store/calendars.reducer";
import { setEventsList, IEvent } from "store/events.reducer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([calendarsApi.list(), eventsApi.list()])
      .then(([calendars, events]: [ICalendar[], IEvent[]]) => {
        dispatch(setCalendarList(calendars));
        dispatch(setEventsList(events));
      })
      .catch((error) => console.error("Failed to load calendar data", error));
  }, [dispatch]);

  return (
    <>
      <Header />
      <main>
        <Aside />
        <EventsPopup />
        <EventsCalendar />
      </main>
    </>
  );
}

export default App;
