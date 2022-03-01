import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { useEmployeeWorkUpdateForm } from "../../../../../forms/employeeWork";

import {
  EmployeeWorkCardSnippetFragment,
  useEmployeeWorkUpdateMutation,
} from "../../../../../generated/graphql";
import SubmitButton from "../../../../Common/forms/SubmitButton";

interface IEmployeeWorkCard {
  employeeWork: EmployeeWorkCardSnippetFragment;
  dailyReportDate: Date;
}

const EmployeeWorkCard = ({
  employeeWork,
  dailyReportDate,
}: IEmployeeWorkCard) => {
  /**
   * ----- Hook Initialization
   */

  const [edit, setEdit] = React.useState(false);

  const [update, { loading }] = useEmployeeWorkUpdateMutation();

  const { FormComponents } = useEmployeeWorkUpdateForm({
    defaultValues: {
      jobTitle: employeeWork.jobTitle,
      startTime: employeeWork.startTime,
      endTime: employeeWork.endTime,
    },
  });

  /**
   * ----- Rendering -----
   */

  return (
    <Box p={2} w="100%" key={employeeWork._id} border="1px solid lightgray">
      <Box display="flex" flexDir="row" justifyContent="space-between">
        <Text>
          <Text as="span" fontWeight="bold">
            {employeeWork.jobTitle}
          </Text>{" "}
          - {employeeWork.employee.name}
        </Text>
        <IconButton
          backgroundColor="transparent"
          icon={<FiEdit />}
          aria-label="edit"
          onClick={() => setEdit(!edit)}
        />
      </Box>
      {edit && (
        <Box>
          <FormComponents.Form
            submitHandler={(data) => {
              update({
                variables: {
                  id: employeeWork._id,
                  data: {
                    ...data,
                    startTime: dayjs(dailyReportDate)
                      .set("hour", data.startTime.split(":")[0])
                      .set("minute", data.startTime.split(":")[1])
                      .toISOString(),
                    endTime: dayjs(dailyReportDate)
                      .set("hour", data.endTime.split(":")[0])
                      .set("minute", data.endTime.split(":")[1])
                      .toISOString(),
                  },
                },
              });
            }}
          >
            <FormComponents.JobTitle isLoading={loading} />
            <Flex flexDir="row">
              <FormComponents.StartTime mx={1} isLoading={loading} />
              <FormComponents.EndTime mx={1} isLoading={loading} />
            </Flex>
            <SubmitButton isLoading={loading} />
          </FormComponents.Form>
        </Box>
      )}
    </Box>
  );
};

export default EmployeeWorkCard;
