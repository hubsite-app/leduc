import ExcelJS, { TableColumnProperties } from "exceljs";
import { CrewLocationClass } from "@typescript/crew";
import { Crew } from "@models";
import dayjs from "dayjs";

export const generateCrewLocationWorkbook = async (
  crewLocations: CrewLocationClass[],
  startDate: Date,
  endDate: Date
) => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("Crew Location");

  const columns: TableColumnProperties[] = [
    {
      name: "Date",
      filterButton: true,
    },
  ];

  for (let i = 0; i < crewLocations.length; i++) {
    const crew = await Crew.getById(crewLocations[i].crew);
    if (crew)
      columns.push({
        name: crew.name,
        filterButton: true,
      });
  }

  const uniqueDates = [];
  let start = dayjs(startDate);
  const end = dayjs(endDate).endOf("day");
  while (start.toDate().getTime() <= end.toDate().getTime()) {
    uniqueDates.push(start.format("YYYY-MM-DD"));
    start = start.add(1, "day");
  }

  const rows: (string | null)[][] = [];
  const totalsRow: number[] = crewLocations.map(() => 0);
  for (let i = 0; i < uniqueDates.length; i++) {
    const date = uniqueDates[i];
    rows[i] = [date];

    for (let j = 0; j < crewLocations.length; j++) {
      const crewLocation = crewLocations[j];

      const day = crewLocation.days.find((day) => {
        return dayjs(day.date).format("YYYY-MM-DD") === date;
      });

      if (day) {
        rows[i].push(
          day.items
            .map((item, index) => {
              let prepend = "";
              if (index < day.items.length - 1) prepend = " / ";

              return item.jobsiteName + " " + prepend;
            })
            .join("")
        );

        totalsRow[rows[i].length - 2] += 1;
      } else {
        rows[i].push(null);
      }
    }
  }

  worksheet.addTable({
    name: "Locations",
    ref: "A1",
    columns,
    rows: [...rows, ["Totals", ...totalsRow]],
  });

  // Fix Column Width
  worksheet.columns.forEach((column) => {
    column.width = 30;
    column.style = {
      alignment: {
        wrapText: true,
      },
    };
  });

  return workbook;
};
