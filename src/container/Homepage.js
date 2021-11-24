/* eslint-disable  import/no-named-as-default-member */
/* eslint-disable  import/no-named-as-default */

import React from "react";
import RowContainer from "./row-container/RowContainer";
import BillboardRow from "../components/billboard-row/BillboardRow";

function Homepage() {
  return (
    <>
      <BillboardRow />
      <RowContainer />
    </>
  );
}

export default Homepage;
