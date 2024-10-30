import React, { useMemo } from "react";

import Filters from "./components/Filters";

import { Table, TableContainer, TableFooter, TablePagination, TableRow } from "@mui/material";

import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";

import "./styles.scss";
import { generateRecordItems } from "@/mockData/recordsPage";
import { RecordTableListItemType } from "@/types/Records";
import Screen from "@/components/Screen";

import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { PATHS } from "@/routes/paths";
import { useNavigate } from "react-router-dom";
import { ScreenHeaderProps } from "@/components/Screen/components/ScreenHeader";
// https://www.figcomponents.com/components/user-interface?id=62cf946b12847cc9ecafe6b2

const MOCK_DATA = generateRecordItems(80);

const Records = () => {
  const navigate = useNavigate();

  const data = MOCK_DATA;

  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof RecordTableListItemType>("dateCreated");

  const [page, setPage] = React.useState(0);

  const rowsPerPage = 40;

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof RecordTableListItemType
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const visibleRows = React.useMemo(
    () =>
      [...data]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  const headerProps: ScreenHeaderProps = useMemo(
    () => ({
      title: "Registos",
      subtext: "Manage your records and details",
      actions: [
        {
          startIcon: <AddIcon />,
          text: "Novo",
          onClick: () => navigate(PATHS.NEW_RECORD)
        },
        {
          startIcon: <FileDownloadIcon />,
          text: "Download",
          onClick: () => {},
          variant: "outlined"
        }
      ]
    }),
    []
  );

  return (
    <Screen
      headerProps={headerProps}
      postHeaderComponent={<Filters />}
      stickyFooterComponent={
        <Table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[]}
              />
            </TableRow>
          </TableFooter>
        </Table>
      }
    >
      <TableContainer style={{ height: "100%" }}>
        <Table sx={{ minWidth: 850 }} aria-labelledby="tableTitle" size={"medium"}>
          <TableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody visibleRows={visibleRows} />
        </Table>
      </TableContainer>
    </Screen>
  );
};

export default Records;

export interface Data {
  id: number;
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const aValue = a[orderBy];
  const bValue = b[orderBy];

  // Handle numbers
  if (typeof aValue === "number" && typeof bValue === "number") {
    return bValue - aValue;
  }

  // Handle dates
  if (aValue instanceof Date && bValue instanceof Date) {
    return bValue.getTime() - aValue.getTime();
  }

  // Handle booleans
  if (typeof aValue === "boolean" && typeof bValue === "boolean") {
    return bValue === aValue ? 0 : bValue ? 1 : -1;
  }

  // Handle the `rotation` (assuming `Specialty` is an object with a string property you want to sort by)
  if (
    typeof aValue === "object" &&
    aValue &&
    "name" in aValue &&
    typeof (aValue as any).name === "string"
  ) {
    return (bValue as any).name.localeCompare((aValue as any).name);
  }

  // Default fallback (you may want to handle other cases)
  if (bValue < aValue) return -1;
  if (bValue > aValue) return 1;
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
