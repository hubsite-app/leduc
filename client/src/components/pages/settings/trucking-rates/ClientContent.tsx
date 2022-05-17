import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useSystem } from "../../../../contexts/System";
import {
  JobsiteTruckingRatesSnippetFragment,
  useJobsiteSetAllEmptyTruckingRatesMutation,
  useJobsitesTruckingRateQuery,
} from "../../../../generated/graphql";
import jobsiteName from "../../../../utils/jobsiteName";
import TextField from "../../../Common/forms/TextField";
import Loading from "../../../Common/Loading";
import Permission from "../../../Common/Permission";
import PleaseWait from "../../../Common/PleaseWait";
import SystemMaterialShipmentVehicleTypeDefaults from "../../../Common/System/MaterialShipmentVehicleTypeDefaults";
import TruckingRates from "../../jobsite/id/views/TruckingRates";

const JobsiteTruckingRateSettingsClientContent = () => {
  /**
   * ----- Hook Initialization -----
   */

  const router = useRouter();

  const [jobsites, setJobsites] = React.useState<
    JobsiteTruckingRatesSnippetFragment[]
  >([]);

  const [searchString, setSearchString] = React.useState("");

  const [searchTimeout, setSearchTimeout] = React.useState<NodeJS.Timeout>();

  const {
    state: { system },
  } = useSystem();

  const { data, loading } = useJobsitesTruckingRateQuery({
    variables: {
      options: {
        pageLimit: 99999,
      },
    },
  });

  const [setAll, { loading: setAllLoading }] =
    useJobsiteSetAllEmptyTruckingRatesMutation();

  /**
   * ----- Functions -----
   */

  const filterList = React.useCallback(() => {
    if (searchString) {
      setJobsites(
        data?.jobsites.filter((jobsite) =>
          jobsiteName(jobsite.name, jobsite.jobcode)
            .toLowerCase()
            .match(searchString.toLowerCase())
        ) || []
      );
    } else if (data?.jobsites) setJobsites(data?.jobsites);
    else return setJobsites([]);
  }, [data?.jobsites, searchString]);

  const handleSearchChange = React.useCallback(
    (value: string) => {
      setSearchString(value);
      if (searchTimeout) clearTimeout(searchTimeout);
      setSearchTimeout(
        setTimeout(() => {
          filterList();
        }, 500)
      );
    },
    [filterList, searchTimeout]
  );

  /**
   * ----- Variables -----
   */

  React.useEffect(() => {
    if (data?.jobsites && !loading) filterList();
  }, [data?.jobsites, filterList, loading, searchString]);

  /**
   * ----- Rendering -----
   */

  if (system) {
    return (
      <Permission showError>
        {setAllLoading && <PleaseWait />}
        <Flex justifyContent="space-between">
          <Heading>Trucking Rates Management</Heading>
          <Button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure? This will set all empty jobsite trucking rate to the default. It cannot be reversed."
                )
              ) {
                setAll().then(() => {
                  router.reload();
                });
              }
            }}
            isLoading={setAllLoading}
            backgroundColor="gray.200"
          >
            Fill all empty Rates
          </Button>
        </Flex>
        <SystemMaterialShipmentVehicleTypeDefaults
          system={system}
          onPropogationSuccess={() => router.reload()}
        />
        <Box backgroundColor="gray.200" p={2} borderRadius={4}>
          <Flex flexDir="row" justifyContent="space-between">
            <Heading size="md">Jobsite Trucking Rates</Heading>
            <Box w="25%">
              <TextField
                value={searchString}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search"
              />
            </Box>
          </Flex>
          <Box minH="80vh" maxH="80vh" overflowY="scroll" p={2} mt={2}>
            {loading ? (
              <Loading />
            ) : (
              jobsites.map((jobsite) => (
                <TruckingRates
                  jobsite={jobsite}
                  displayJobsiteName
                  defaultCollapsed
                  key={jobsite._id}
                />
              ))
            )}
          </Box>
        </Box>
      </Permission>
    );
  } else return <Loading />;
};

export default JobsiteTruckingRateSettingsClientContent;
