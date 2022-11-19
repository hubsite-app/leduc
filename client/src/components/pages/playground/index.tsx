import React from "react";
import { useJobsiteFullQuery } from "../../../generated/graphql";
import Panel from "../../Common/Panel";
import JobsiteMaterialsCosting from "../jobsite/id/views/JobsiteMaterials";

const PlaygroundClientOnly = () => {
  /**
   * ----- Hook Initialization -----
   */

  const { data, loading } = useJobsiteFullQuery({
    variables: {
      id: "6266c5af27beaf001215b57b",
    },
  });

  /**
   * ----- Render -----
   */

  const content = React.useMemo(() => {
    if (data?.jobsite) {
      return <JobsiteMaterialsCosting jobsite={data.jobsite} />;
    } else return null;
  }, [data?.jobsite]);

  return (
    <Panel name="Jobsite Materials" loading={loading}>
      {content}
    </Panel>
  );
};

export default PlaygroundClientOnly;
