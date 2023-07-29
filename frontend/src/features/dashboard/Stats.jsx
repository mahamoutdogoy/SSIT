import React, { useState, useEffect } from "react";
import {
    HiOutlineBanknotes,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
  } from "react-icons/hi2";
  import Stat from "./Stat";
  
  
  function Stats({ users, confirmedStays, numDays, cabinCount }) {
    // 1.
    // const numBookings = bookings.length;
    const numBookings = "";
    // 2.
    // const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
    const sales = "";
  
    // 3.
    // const checkins = confirmedStays.length;
    const checkins = ""
  
    // 4.
    // const occupation =
    //   confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    //   (numDays * cabinCount);

       const occupation =""
    // num checked in nights / all available nights (num days * num cabins)
  
    return (
      <>
        <Stat
          title="Users"
          color="blue"
          icon={<HiOutlineBriefcase />}
          value={2}
        />
        <Stat
          title="Vitre Fumees"
          color="green"
          icon={<HiOutlineBanknotes />}
          value={100}
        />
        <Stat
          title="Voitures"
          color="indigo"
          icon={<HiOutlineCalendarDays />}
          value={123}
        />
        <Stat
          title="Penalties"
          color="yellow"
          icon={<HiOutlineChartBar />}
          value={2}
        />
      </>
    );
  }
  
  export default Stats;