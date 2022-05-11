import {
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  StatProps,
} from "@chakra-ui/react";
import React from "react";
import { JobsiteDayReportFullSnippetFragment } from "../../../generated/graphql";
import formatNumber from "../../../utils/formatNumber";

interface IJobsiteReportOnJobSummary {
  dayReports: JobsiteDayReportFullSnippetFragment[];
  allDayReports?: JobsiteDayReportFullSnippetFragment[];
  statSize?: StatProps["size"];
}

const JobsiteReportOnJobSummary = ({
  dayReports,
  allDayReports = [],
  statSize = "sm",
}: IJobsiteReportOnJobSummary) => {
  /**
   * ----- Variables -----
   */

  const totalWages = React.useMemo(() => {
    if (allDayReports.length === 0) return null;

    let wages = 0;
    for (let i = 0; i < allDayReports.length; i++) {
      wages += allDayReports[i].summary.employeeCost;
    }

    return wages;
  }, [allDayReports]);

  const wages = React.useMemo(() => {
    let wages = 0;
    for (let i = 0; i < dayReports.length; i++) {
      wages += dayReports[i].summary.employeeCost;
    }

    return wages;
  }, [dayReports]);

  const totalEquipment = React.useMemo(() => {
    if (allDayReports.length === 0) return null;

    let equipment = 0;
    for (let i = 0; i < allDayReports.length; i++) {
      equipment += allDayReports[i].summary.vehicleCost;
    }

    return equipment;
  }, [allDayReports]);

  const equipment = React.useMemo(() => {
    let equipment = 0;
    for (let i = 0; i < dayReports.length; i++) {
      equipment += dayReports[i].summary.vehicleCost;
    }

    return equipment;
  }, [dayReports]);

  const totalMaterials = React.useMemo(() => {
    if (allDayReports.length === 0) return null;

    let materialCost = 0;
    for (let i = 0; i < allDayReports.length; i++) {
      materialCost += allDayReports[i].summary.materialCost;
    }

    return materialCost;
  }, [allDayReports]);

  const materials: { cost: number; quantity: number } = React.useMemo(() => {
    let materials = {
      cost: 0,
      quantity: 0,
    };
    for (let i = 0; i < dayReports.length; i++) {
      materials.cost += dayReports[i].summary.materialCost;
      materials.quantity += dayReports[i].summary.materialQuantity;
    }

    return materials;
  }, [dayReports]);

  const totalTrucking = React.useMemo(() => {
    if (allDayReports.length === 0) return null;

    let trucking = 0;
    for (let i = 0; i < allDayReports.length; i++) {
      trucking += allDayReports[i].summary.truckingCost;
    }

    return trucking;
  }, [allDayReports]);

  const trucking = React.useMemo(() => {
    let trucking = 0;
    for (let i = 0; i < dayReports.length; i++) {
      trucking += dayReports[i].summary.truckingCost;
    }

    return trucking;
  }, [dayReports]);

  /**
   * ----- Rendering -----
   */

  return (
    <SimpleGrid spacing={2} columns={[4]}>
      <Stat size={statSize} display="flex" justifyContent="center">
        <StatLabel>Wages</StatLabel>
        <StatNumber>${formatNumber(wages)}</StatNumber>
        {totalWages ? (
          <StatHelpText fontSize={statSize}>
            {formatNumber((wages / totalWages) * 100)}%
          </StatHelpText>
        ) : null}
      </Stat>
      <Stat size={statSize} display="flex" justifyContent="center">
        <StatLabel>Equipment</StatLabel>
        <StatNumber>${formatNumber(equipment)}</StatNumber>
        {totalEquipment ? (
          <StatHelpText fontSize={statSize}>
            {formatNumber((equipment / totalEquipment) * 100)}%
          </StatHelpText>
        ) : null}
      </Stat>
      <Stat size={statSize} display="flex" justifyContent="center">
        <StatLabel>Material</StatLabel>
        <StatNumber>${formatNumber(materials.cost)}</StatNumber>
        {totalMaterials ? (
          <StatHelpText mb={0} fontSize={statSize}>
            {formatNumber((materials.cost / totalMaterials) * 100)}%
          </StatHelpText>
        ) : null}
        <StatHelpText fontSize={statSize}>
          Quantity: {formatNumber(materials.quantity)}
        </StatHelpText>
      </Stat>
      <Stat size={statSize} display="flex" justifyContent="center">
        <StatLabel>Trucking</StatLabel>
        <StatNumber>${formatNumber(trucking)}</StatNumber>
        {totalTrucking ? (
          <StatHelpText fontSize={statSize}>
            {formatNumber((trucking / totalTrucking) * 100)}%
          </StatHelpText>
        ) : null}
      </Stat>
    </SimpleGrid>
  );
};

export default JobsiteReportOnJobSummary;
