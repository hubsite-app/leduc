const employee = (employeeId: string) => {
  return `/employee/${employeeId}`;
};

const vehicle = (vehicleId: string) => {
  return `/vehicle/${vehicleId}`;
};

const crew = (crewId: string) => {
  return `/crew/${crewId}`;
};

const jobsite = (jobsiteId: string) => {
  return `/jobsite/${jobsiteId}`;
};

const dailyReport = (dailyReportId: string) => {
  return `/daily-report/${dailyReportId}`;
};

const createLink = {
  employee,
  vehicle,
  crew,
  jobsite,
  dailyReport,
};

export default createLink;
