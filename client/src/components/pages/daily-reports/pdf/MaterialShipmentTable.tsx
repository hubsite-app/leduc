import { Text, View } from "@react-pdf/renderer";
import dayjs from "dayjs";
import { MaterialShipmentCardSnippetFragment } from "../../../../generated/graphql";
import formatNumber from "../../../../utils/formatNumber";
import parseDataForPDF from "../../../../utils/parseDataForPDF";

interface IMaterialShipmentTable {
  materialShipments: MaterialShipmentCardSnippetFragment[];
}

const MaterialShipmentColumnWidth = "25%";
const MaterialShipmentQuantityColumnWidth = "25%";
const MaterialShipmentVehicleColumnWidth = "35%";
const MaterialShipmentHourColumnWidth = "15%";

const MaterialShipmentTable = ({
  materialShipments,
}: IMaterialShipmentTable) => {
  const parsed = parseDataForPDF.materialShipments(materialShipments);

  let totalQuantity = 0,
    totalHours = 0;
  materialShipments.forEach((shipment) => {
    totalQuantity += shipment.quantity;

    if (shipment.startTime && shipment.endTime)
      totalHours +=
        Math.abs(dayjs(shipment.startTime).diff(shipment.endTime, "minutes")) /
        60;
  });

  return (
    <View style={{ width: "50%" }}>
      <Text style={{ fontSize: "10px" }}>MaterialShipments</Text>
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
              width: MaterialShipmentColumnWidth,
            }}
          >
            Shipment
          </Text>
          <Text
            style={{
              fontSize: "8px",
              width: MaterialShipmentQuantityColumnWidth,
            }}
          >
            Quantity
          </Text>
          <Text
            style={{
              fontSize: "8px",
              width: MaterialShipmentVehicleColumnWidth,
            }}
          >
            Vehicle
          </Text>
          <Text
            style={{
              fontSize: "8px",
              width: MaterialShipmentHourColumnWidth,
            }}
          >
            Hours
          </Text>
        </View>

        <View>
          {parsed.map((data, index) => {
            return (
              <View key={index}>
                {data.materialShipments.map((shipment) => {
                  let supplierMaterial;
                  if (shipment.noJobsiteMaterial) {
                    supplierMaterial = (
                      <>
                        {shipment.supplier} {shipment.shipmentType}
                      </>
                    );
                  } else {
                    supplierMaterial = (
                      <>
                        {shipment.jobsiteMaterial?.supplier.name}{" "}
                        {shipment.jobsiteMaterial?.material.name}
                      </>
                    );
                  }

                  return (
                    <View key={shipment._id} style={{ marginVertical: "2px" }}>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text
                          style={{
                            fontSize: "7px",
                            width: MaterialShipmentColumnWidth,
                          }}
                        >
                          {supplierMaterial}
                        </Text>
                        <Text
                          style={{
                            fontSize: "7px",
                            width: MaterialShipmentQuantityColumnWidth,
                          }}
                        >
                          {shipment.quantity}{" "}
                          {shipment.noJobsiteMaterial === false
                            ? shipment.jobsiteMaterial?.unit
                            : shipment.unit}
                        </Text>
                        <Text
                          style={{
                            fontSize: "7px",
                            width: MaterialShipmentVehicleColumnWidth,
                          }}
                        >
                          {shipment.vehicleObject ? (
                            <>
                              {shipment.vehicleObject?.source} /{" "}
                              {shipment.vehicleObject?.vehicleType} /{" "}
                              {shipment.vehicleObject?.vehicleCode}
                            </>
                          ) : (
                            "N/A"
                          )}
                        </Text>
                        <Text
                          style={{
                            fontSize: "7px",
                            width: MaterialShipmentHourColumnWidth,
                          }}
                        >
                          {shipment.startTime && shipment.endTime
                            ? formatNumber(
                                Math.abs(
                                  dayjs(shipment.startTime).diff(
                                    shipment.endTime,
                                    "hours",
                                    true
                                  )
                                )
                              )
                            : "N/A"}
                        </Text>
                      </View>
                    </View>
                  );
                })}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "lightgray",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "7px",
                      width: MaterialShipmentColumnWidth,
                    }}
                  >
                    Total
                  </Text>
                  <Text
                    style={{
                      fontSize: "7px",
                      width: MaterialShipmentQuantityColumnWidth,
                    }}
                  >
                    {data.totalQuantity}
                  </Text>
                  <View
                    style={{ width: MaterialShipmentVehicleColumnWidth }}
                  ></View>
                  <Text
                    style={{
                      fontSize: "7px",
                      width: MaterialShipmentHourColumnWidth,
                    }}
                  >
                    {data.totalHours}
                  </Text>
                </View>
              </View>
            );
          })}
          {/* {materialShipments.map((shipment) => {
            let supplierMaterial;
            if (shipment.noJobsiteMaterial) {
              supplierMaterial = (
                <>
                  {shipment.supplier} {shipment.shipmentType}
                </>
              );
            } else {
              supplierMaterial = (
                <>
                  {shipment.jobsiteMaterial?.supplier.name}{" "}
                  {shipment.jobsiteMaterial?.material.name}
                </>
              );
            }
            return (
              <View key={shipment._id} style={{ marginVertical: "2px" }}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: "7px",
                      width: MaterialShipmentColumnWidth,
                    }}
                  >
                    {supplierMaterial}
                  </Text>
                  <Text
                    style={{
                      fontSize: "7px",
                      width: MaterialShipmentQuantityColumnWidth,
                    }}
                  >
                    {shipment.quantity} {shipment.unit}
                  </Text>
                  <Text
                    style={{
                      fontSize: "7px",
                      width: MaterialShipmentVehicleColumnWidth,
                    }}
                  >
                    {shipment.vehicleObject ? (
                      <>
                        {shipment.vehicleObject?.source} /{" "}
                        {shipment.vehicleObject?.vehicleType} /{" "}
                        {shipment.vehicleObject?.vehicleCode}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </Text>
                  <Text
                    style={{
                      fontSize: "7px",
                      width: MaterialShipmentHourColumnWidth,
                    }}
                  >
                    {shipment.startTime && shipment.endTime
                      ? formatNumber(
                          Math.abs(
                            dayjs(shipment.startTime).diff(
                              shipment.endTime,
                              "hours",
                              true
                            )
                          )
                        )
                      : "N/A"}
                  </Text>
                </View>
              </View>
            );
          })}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "lightgray",
            }}
          >
            <Text
              style={{ fontSize: "7px", width: MaterialShipmentColumnWidth }}
            >
              Total
            </Text>
            <Text
              style={{
                fontSize: "7px",
                width: MaterialShipmentQuantityColumnWidth,
              }}
            >
              {totalQuantity}
            </Text>
            <View style={{ width: MaterialShipmentVehicleColumnWidth }}></View>
            <Text
              style={{
                fontSize: "7px",
                width: MaterialShipmentHourColumnWidth,
              }}
            >
              {totalHours}
            </Text>
          </View> */}
        </View>
      </View>
    </View>
  );
};

export default MaterialShipmentTable;
