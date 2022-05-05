import { Text, View } from "@react-pdf/renderer";
import dayjs from "dayjs";
import { ProductionCardSnippetFragment } from "../../../../generated/graphql";
import formatNumber from "../../../../utils/formatNumber";

interface IProductionTable {
  productions: ProductionCardSnippetFragment[];
}

const ProductionJobColumnWidth = "40%";
const ProductionQuantityColumnWidth = "15%";
const ProductionStartTimeColumnWidth = "15%";
const ProductionEndTimeColumnWidth = "15%";
const ProductionHoursColumnWidth = "15%";

const ProductionTable = ({ productions }: IProductionTable) => {
  return (
    <View style={{ width: "50%" }}>
      <Text style={{ fontSize: "10px" }}>Production</Text>
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
              width: ProductionJobColumnWidth,
            }}
          >
            Job
          </Text>
          <Text
            style={{
              fontSize: "8px",
              width: ProductionQuantityColumnWidth,
            }}
          >
            Quantity
          </Text>
          <Text
            style={{
              fontSize: "8px",
              width: ProductionStartTimeColumnWidth,
            }}
          >
            Start Time
          </Text>
          <Text
            style={{
              fontSize: "8px",
              width: ProductionEndTimeColumnWidth,
            }}
          >
            End Time
          </Text>
          <Text
            style={{
              fontSize: "8px",
              width: ProductionHoursColumnWidth,
            }}
          >
            Hours
          </Text>
        </View>

        <View>
          {productions.map((production) => (
            <View
              key={production._id}
              style={{
                marginVertical: "2px",
              }}
            >
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text
                  style={{ fontSize: "7px", width: ProductionJobColumnWidth }}
                >
                  {production.jobTitle}
                </Text>
                <Text
                  style={{
                    fontSize: "7px",
                    width: ProductionQuantityColumnWidth,
                  }}
                >
                  {formatNumber(production.quantity)} {production.unit}
                </Text>
                <Text
                  style={{
                    fontSize: "7px",
                    width: ProductionStartTimeColumnWidth,
                  }}
                >
                  {dayjs(production.startTime).format("hh:mm a")}
                </Text>
                <Text
                  style={{
                    fontSize: "7px",
                    width: ProductionEndTimeColumnWidth,
                  }}
                >
                  {dayjs(production.endTime).format("hh:mm a")}
                </Text>
                <Text
                  style={{ fontSize: "7px", width: ProductionHoursColumnWidth }}
                >
                  {formatNumber(
                    Math.abs(
                      dayjs(production.startTime).diff(
                        production.endTime,
                        "minutes"
                      )
                    ) / 60
                  )}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ProductionTable;
