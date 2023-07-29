import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Stats from "./Stats";

import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";


const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`

const DashboardLayout = () =>  {
//   const { bookings, isLoading: isLoading1 } = useRecentBookings();
//   const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();
  

  

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={0}
        confirmedStays={1}
        numDays={2}
        cabinCount={0}
      />
     
      
      
     
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;