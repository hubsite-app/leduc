import { Text, View } from "@react-pdf/renderer";
import dayjs from "dayjs";
import React from "react";
import { EmployeeWorkCardSnippetFragment } from "../../../../generated/graphql";
import parseDataForPDF from "../../../../utils/parseDataForPDF";

interface IEmployeeWorkTable {
  employeeWorks: EmployeeWorkCardSnippetFragment[];
}

const EmployeeColumnWidth = "30%";
const EmployeeJobColumnWidth = "25%";
const EmployeeStartTimeWidth = "15%";
const EmployeeEndTimeWidth = "15%";
const EmployeeHoursWidth = "15%";

const EmployeeWorkTable = ({ employeeWorks }: IEmployeeWorkTable) => {
  const EmployeeWorkData = parseDataForPDF.employeeWork(employeeWorks);

  return (
    <View style={{ width: "50%" }}>
      <Text style={{ fontSize: "10px" }}>Employee Hours</Text>
      <View style={{ margin: "5px" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            borderBottom: "1px solid gray",
          }}
        >
          <Text
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              width: EmployeeColumnWidth,
            }}
          >
            Employee
          </Text>
          <Text
            style={{
              fontSize: "8px",
              width: EmployeeJobColumnWidth,
            }}
          >
            Job
          </Text>
          <Text
            style={{
              fontSize: "8px",
              width: EmployeeStartTimeWidth,
            }}
          >
            Start Time
          </Text>
          <Text
            style={{
              fontSize: "8px",
              width: EmployeeEndTimeWidth,
            }}
          >
            End Time
          </Text>
          <Text
            style={{
              fontSize: "8px",
              width: EmployeeHoursWidth,
            }}
          >
            Hours
          </Text>
        </View>

        <View>
          {EmployeeWorkData.map((work, index) => (
            <View
              key={index}
              style={{
                marginVertical: "2px",
              }}
            >
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ fontSize: "7px", width: EmployeeColumnWidth }}>
                  {work.employee.name}
                </Text>
                <View style={{ width: "70%" }}>
                  {work.jobs.map((job, index) => (
                    <View
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: "4px",
                      }}
                    >
                      <Text style={{ width: "35.7%", fontSize: "7px" }}>
                        {job.jobTitle}
                      </Text>
                      <Text style={{ fontSize: "7px", width: "21.4%" }}>
                        {dayjs(job.startTime).format("hh:mm a")}
                      </Text>
                      <Text style={{ fontSize: "7px", width: "21.4%" }}>
                        {dayjs(job.endTime).format("hh:mm a")}
                      </Text>
                      <Text style={{ fontSize: "7px", width: "21.4%" }}>
                        {job.hours}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "lightgray",
                }}
              >
                <Text style={{ fontSize: "7px" }}>Total</Text>
                <Text style={{ fontSize: "7px", width: EmployeeHoursWidth }}>
                  {work.totalHours}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default EmployeeWorkTable;
