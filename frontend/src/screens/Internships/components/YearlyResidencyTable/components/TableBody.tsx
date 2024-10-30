import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

const TableBody = ({ children }: Props) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const [tableHeight, setTableHeight] = useState<number>(0);

  const ROW_HEIGHT = 40; // Adjust as needed

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [scrollTop, setScrollTop] = useState<number>(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!tableRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - tableRef.current.offsetLeft);
    setStartY(e.pageY - tableRef.current.offsetTop);
    setScrollLeft(tableRef.current.scrollLeft);
    setScrollTop(tableRef.current.scrollTop);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !tableRef.current) return;

    e.preventDefault();

    const x = e.pageX - tableRef.current.offsetLeft;
    const y = e.pageY - tableRef.current.offsetTop;

    const walkX = (x - startX) * 2; // Adjust this multiplier for sensitivity
    const walkY = (y - startY) * 2;

    tableRef.current.scrollLeft = scrollLeft - walkX;
    tableRef.current.scrollTop = scrollTop - walkY;
  };

  useEffect(() => {
    const updateTableMetrics = () => {
      if (tableRef.current) {
        setTableHeight(tableRef.current.offsetHeight);
      }
    };

    const resizeObserver = new ResizeObserver(updateTableMetrics);

    if (tableRef.current) {
      resizeObserver.observe(tableRef.current);
    }

    return () => {
      if (tableRef.current) {
        resizeObserver.unobserve(tableRef.current);
      }
    };
  }, []);

  const syncScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (headerRef.current) {
      headerRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  return (
    <div className="table-container">
      <div style={{ flexDirection: "row", display: "flex" }}>
        <div ref={headerRef} className="table-container__table__header_wrapper">
          <Header tableHeight={tableHeight} />
        </div>
        <div style={{ width: "10px" }} />
      </div>

      <div
        className="table-container__table_wrapper"
        ref={tableRef}
        onScroll={syncScroll}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {children}
      </div>
    </div>
  );
};

export default TableBody;
