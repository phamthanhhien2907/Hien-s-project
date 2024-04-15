import React, { memo } from "react";
import usePanigation from "../hooks/usePanigation";
import PagiItem from "./PagiItem";
const Pagination = ({ totalCount }) => {
  const pagination = usePanigation(11, 2);

  return (
    <div className="flex items-center">
      {pagination.map((el) => (
        <PagiItem key={el}>{el} </PagiItem>
      ))}
    </div>
  );
};

export default memo(Pagination);
