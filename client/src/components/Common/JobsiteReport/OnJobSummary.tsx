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

const handlePercent = (value: number, total: number) => {
  const percent = (value / total) * 100;
  if (isNaN(percent)) {
    return formatNumber(0);
  } else {
    return formatNumber(percent);
  }
};

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

  const total = React.useMemo(() => {
    return wages + equipment + materials.cost + trucking;
  }, [equipment, materials.cost, trucking, wages]);

  const fullTotal = React.useMemo(() => {
    if (allDayReports.length === 0) return null;

    return (
      (totalWages || 0) +
      (totalEquipment || 0) +
      (totalMaterials || 0) +
      (totalTrucking || 0)
    );
  }, [
    allDayReports.length,
    totalEquipment,
    totalMaterials,
    totalTrucking,
    totalWages,
  ]);

  /**
   * ----- Rendering -----
   */

  return (
    <SimpleGrid spacing={2} columns={[5]}>
      <Stat size={statSize} display="flex" justifyContent="center">
        <StatLabel>Wages</StatLabel>
        <StatNumber>${formatNumber(wages)}</StatNumber>
        {totalWages !== null ? (
          <StatHelpText fontSize={statSize}>
            {handlePercent(wages, totalWages)}%
          </StatHelpText>
        ) : null}
      </Stat>
      <Stat size={statSize} display="flex" justifyContent="center">
        <StatLabel>Equipment</StatLabel>
        <StatNumber>${formatNumber(equipment)}</StatNumber>
        {totalEquipment !== null ? (
          <StatHelpText fontSize={statSize}>
            {handlePercent(equipment, totalEquipment)}%
          </StatHelpText>
        ) : null}
      </Stat>
      <Stat size={statSize} display="flex" justifyContent="center">
        <StatLabel>Material</StatLabel>
        <StatNumber>${formatNumber(materials.cost)}</StatNumber>
        {totalMaterials !== null ? (
          <StatHelpText mb={0} fontSize={statSize}>
            {handlePercent(materials.cost, totalMaterials)}%
          </StatHelpText>
        ) : null}
        <StatHelpText fontSize={statSize}>
          Quantity: {formatNumber(materials.quantity)}
        </StatHelpText>
      </Stat>
      <Stat size={statSize} display="flex" justifyContent="center">
        <StatLabel>Trucking</StatLabel>
        <StatNumber>${formatNumber(trucking)}</StatNumber>
        {totalTrucking !== null ? (
          <StatHelpText fontSize={statSize}>
            {handlePercent(trucking, totalTrucking)}%
          </StatHelpText>
        ) : null}
      </Stat>

      <Stat size={statSize} display="flex" justifyContent="center">
        <StatLabel>Total</StatLabel>
        <StatNumber>${formatNumber(total)}</StatNumber>
        {fullTotal !== null ? (
          <StatHelpText fontSize={statSize}>
            {handlePercent(total, fullTotal)}%
          </StatHelpText>
        ) : null}
      </Stat>
    </SimpleGrid>
  );
};

export default JobsiteReportOnJobSummary;
