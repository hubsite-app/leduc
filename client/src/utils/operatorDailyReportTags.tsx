import { Tag as T, TagProps } from "@chakra-ui/react";
import React from "react";
import { OperatorDailyReportCardSnippetFragment } from "../generated/graphql";

const Tag = ({ children, ...props }: TagProps) => {
  return (
    <T
      size="md"
      variant="solid"
      m={1}
      key={Math.random().toString()}
      {...props}
    >
      {children}
    </T>
  );
};

export default function operatorDailyReportTags(
  operatorDailyReport: OperatorDailyReportCardSnippetFragment
): React.ReactChild[] {
  const tags: React.ReactChild[] = [];

  // Malfunction
  if (operatorDailyReport.malfunction) {
    tags.push(<Tag colorScheme="red">Malfunction</Tag>);
  }

  // Damage Observed
  if (operatorDailyReport.damageObserved) {
    tags.push(<Tag colorScheme="red">Damage</Tag>);
  }

  // Leaks
  if (operatorDailyReport.leaks.length > 0) {
    const plural = operatorDailyReport.leaks.length > 1 ? "s" : "";

    tags.push(
      <Tag colorScheme="gray">
        {operatorDailyReport.leaks.length} Leak{plural} Found
      </Tag>
    );
  }

  // Fluids added
  if (operatorDailyReport.fluidsAdded.length > 0) {
    const plural = operatorDailyReport.fluidsAdded.length > 1 ? "s" : "";

    tags.push(
      <Tag colorScheme="teal">
        {operatorDailyReport.fluidsAdded.length} Fluid{plural} Added
      </Tag>
    );
  }

  // Backup alarm
  if (operatorDailyReport.functionChecks.backupAlarm === false) {
    tags.push(<Tag colorScheme="yellow">Backup Alarm</Tag>);
  }

  // Light issue
  if (operatorDailyReport.functionChecks.lights === false) {
    tags.push(<Tag colorScheme="yellow">Light</Tag>);
  }

  // License Plate issue
  if (operatorDailyReport.functionChecks.licensePlate === false) {
    tags.push(<Tag colorScheme="yellow">License Plate</Tag>);
  }

  // Fire Extinguisher issue
  if (operatorDailyReport.functionChecks.fireExtinguisher === false) {
    tags.push(<Tag colorScheme="yellow">Fire Extinguisher</Tag>);
  }

  return tags;
}
