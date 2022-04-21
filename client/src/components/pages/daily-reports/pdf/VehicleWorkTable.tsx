import { Text, View } from "@react-pdf/renderer";
import { VehicleWorkCardSnippetFragment } from "../../../../generated/graphql";
import parseDataForPDF from "../../../../utils/parseDataForPDF";

interface IVehicleWorkTable {
  vehicleWorks: VehicleWorkCardSnippetFragment[];
}

const VehicleColumnWidth = "30%";
const VehicleJobColumnWidth = "55%";
const VehicleHourColumnWidth = "15%";

const VehicleWorkTable = ({ vehicleWorks }: IVehicleWorkTable) => {
  const VehicleWorkData = parseDataForPDF.vehicleWork(vehicleWorks);

  return (
    <View style={{ width: "50%" }}>
      <Text style={{ fontSize: "10px" }}>Vehicle Hours</Text>
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
              width: VehicleColumnWidth,
            }}
          >
            Vehicle
          </Text>
          <Text
            style={{
              fontSize: "8px",
              width: VehicleJobColumnWidth,
            }}
          >
            Job
          </Text>
          <Text
            style={{
              fontSize: "8px",
              width: VehicleHourColumnWidth,
            }}
          >
            Hours
          </Text>
        </View>

        <View>
          {VehicleWorkData.map((work, index) => (
            <View
              key={index}
              style={{
                marginVertical: "2px",
              }}
            >
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ fontSize: "7px", width: VehicleColumnWidth }}>
                  {work.vehicle.name}
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
                      <Text style={{ width: "78.6%", fontSize: "7px" }}>
                        {job.jobTitle}
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
                <Text
                  style={{ fontSize: "7px", width: VehicleHourColumnWidth }}
                >
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

export default VehicleWorkTable;
