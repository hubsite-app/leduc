import React from "react";

import dayjs from "dayjs";

import SubmitButton from "../../../../Common/forms/SubmitButton";
import TextLink from "../../../../Common/TextLink";
import createLink from "../../../../../utils/createLink";

interface ICrewDownloadDailyReports {
  crewId: string;
}

const CrewDownloadDailyReports = ({ crewId }: ICrewDownloadDailyReports) => {
  /**
   * ----- Hook Initialization -----
   */

  // example value: "2022-05"
  const [selectedDate, setSelectedDate] = React.useState(
    new Date().toISOString().substr(0, 7)
  );

  /**
   * ----- Variables -----
   */

  const dateObject = React.useMemo(() => {
    return new Date(selectedDate + "-02");
  }, [selectedDate]);

  /**
   * ----- Render -----
   */

  return (
    <div>
      <input
        type="month"
        onChange={(e) => setSelectedDate(e.target.value)}
        value={selectedDate}
        style={{
          width: "100%",
        }}
      />
      <TextLink
        link={createLink.server_crewDailyReportMonthExcelDownload(
          crewId,
          dayjs(dateObject).format("YYYY-MM-DD")
        )}
        newTab
        mx="auto"
      >
        <SubmitButton>
          Download for {dayjs(dateObject).format("MMMM")},{" "}
          {dayjs(dateObject).format("YYYY")}
        </SubmitButton>
      </TextLink>
    </div>
  );
};

export default CrewDownloadDailyReports;
