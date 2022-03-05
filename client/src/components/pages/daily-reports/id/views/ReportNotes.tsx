import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { useReportNotesUpdateForm } from "../../../../../forms/reportNote";

import {
  DailyReportFullSnippetFragment,
  DailyReportNoteUpdateData,
  useDailyReportNoteUpdateMutation,
} from "../../../../../generated/graphql";
import Card from "../../../../Common/Card";
import SubmitButton from "../../../../Common/forms/SubmitButton";

interface IReportNotes {
  dailyReport: DailyReportFullSnippetFragment;
}

const ReportNotes = ({ dailyReport }: IReportNotes) => {
  /**
   * ----- Hook Initialization -----
   */

  const [collapsed, setCollapsed] = React.useState(true);

  const { FormComponents } = useReportNotesUpdateForm({
    defaultValues: {
      note: dailyReport.reportNote?.note || "",
    },
  });

  const [update, { loading }] = useDailyReportNoteUpdateMutation();

  /**
   * ----- Functions -----
   */

  const submitUpdate = React.useCallback(
    (data: DailyReportNoteUpdateData) => {
      update({
        variables: {
          id: dailyReport._id,
          data,
        },
      });
    },
    [dailyReport._id, update]
  );

  /**
   * ----- Rendering -----
   */

  return (
    <Card>
      <Heading
        ml={2}
        size="md"
        my="auto"
        w="100%"
        cursor="pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        Notes
      </Heading>
      {!collapsed && (
        <Box my={2}>
          <FormComponents.Form submitHandler={submitUpdate}>
            <FormComponents.Note isLoading={loading} />
            <SubmitButton isLoading={loading} />
          </FormComponents.Form>
        </Box>
      )}
    </Card>
  );
};

export default ReportNotes;
