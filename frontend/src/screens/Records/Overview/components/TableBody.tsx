import React from "react";

import { TableBody as MuiTableBody, TableCell, Checkbox, TableRow } from "@mui/material";

import { RecordTableListItemType, RecordStatus as RecordStatusType } from "@/types/Records";
import dayjs from "dayjs";

import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarRateIcon from "@mui/icons-material/StarRate";
import RecordStatusBadge from "@/components/RecordStatusBadge";

type Props = {
  visibleRows: RecordTableListItemType[];
};

const TableBody = ({ visibleRows }: Props) => {
  return (
    <MuiTableBody>
      {visibleRows.map((row, index) => {
        return (
          <TableRow
            hover
            //  onClick={(event) => handleClick(event, row.id)}
            role="checkbox"
            tabIndex={-1}
            sx={{ cursor: "pointer" }}
            className="records_container__body_wrapper__container__row"
            key={`${index}_}`}
          >
            <TableCell padding="checkbox" className="">
              {row.isFavorite ? <StarRateIcon /> : <StarOutlineIcon />}
            </TableCell>
            <TableCell component="th" scope="row" padding="none">
              {row.episodeNumber}
            </TableCell>
            <TableCell align="left">{row.processNumber}</TableCell>
            <TableCell width={300} align="left">
              {row.rotation}
            </TableCell>
            <TableCell width={270} align="left">
              <RecordStatusBadge status={row.status} />
            </TableCell>
            <TableCell align="left">{dayjs(row.dateCreated).format("DD/MM/YYYY")}</TableCell>
            <TableCell align="left">
              {row.archivedDate ? dayjs(row.archivedDate).format("DD/MM/YYYY") : "-"}
            </TableCell>
          </TableRow>
        );
      })}
    </MuiTableBody>
  );
};

export default TableBody;
