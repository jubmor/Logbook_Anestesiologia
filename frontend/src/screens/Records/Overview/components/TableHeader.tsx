import React from "react";

import { Box, TableCell, TableHead, TableSortLabel, TableRow } from "@mui/material";

import { visuallyHidden } from "@mui/utils";
import { RecordTableListItemType } from "@/types/Records";

type Props = {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof RecordTableListItemType
  ) => void;
  order: Order;
  orderBy: string;
};

type Order = "asc" | "desc";

const TableHeader = ({ onRequestSort, order, orderBy }: Props) => {
  const createSortHandler =
    (property: keyof RecordTableListItemType) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead className="records_container__body_wrapper__container__header">
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;

interface HeadCell {
  disablePadding: boolean;
  id: keyof RecordTableListItemType;
  label: string;
  numeric: boolean;
  canSort: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "episodeNumber",
    numeric: false,
    disablePadding: true,
    label: "Nº Episódio",
    canSort: false
  },
  {
    id: "processNumber",
    numeric: false,
    disablePadding: false,
    label: "Nº Processo",
    canSort: false
  },
  {
    id: "rotation",
    numeric: false,
    disablePadding: false,
    label: "Estágio",
    canSort: true
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Estado",
    canSort: true
  },
  {
    id: "dateCreated",
    numeric: false,
    disablePadding: false,
    label: "Criado Em",
    canSort: true
  },
  {
    id: "archivedDate",
    numeric: false,
    disablePadding: false,
    label: "Arquivado Em",
    canSort: true
  }
];
