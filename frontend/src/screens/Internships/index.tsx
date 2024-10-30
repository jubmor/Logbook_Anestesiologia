import Screen from "@/components/Screen";
import { ScreenHeaderProps } from "@/components/Screen/components/ScreenHeader";
import React, { useMemo } from "react";
import YearlyResidencyTable from "./components/YearlyResidencyTable";
import CalendarView from "../Dashboard/HomeIntern/components/CalendarView";

const Internships = () => {
  const headerProps: ScreenHeaderProps = useMemo(() => {
    return {
      title: "Internatos",
      actions: []
    };
  }, []);

  return (
    <Screen headerProps={headerProps}>
      <YearlyResidencyTable />
    </Screen>
  );
};

export default Internships;
