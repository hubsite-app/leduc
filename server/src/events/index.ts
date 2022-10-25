import { JobsiteDocument } from "@models";
import jobsiteEvents, { bindJobsiteEvents } from "./jobsite";
import { TypedEvent } from "./typedEvent";

export const onJobsiteRequestDayReportGeneration =
  new TypedEvent<JobsiteDocument>();

export const bindEventEmitters = () => {
  bindJobsiteEvents();
};

const eventEmitters = {
  jobsite: jobsiteEvents,
};

export default eventEmitters;
