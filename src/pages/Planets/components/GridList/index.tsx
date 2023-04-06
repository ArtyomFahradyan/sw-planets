import React, { FC } from "react";
import { useNavigate } from "react-router";
import { Typography } from "@mui/material";
import {
  AutoSizer as _AutoSizer,
  WindowScroller as _WindowScroller,
  CellMeasurer as _CellMeasurer,
  CellMeasurerCache,
  Grid as _Grid,
} from "react-virtualized";
import type {
  GridCellProps,
  SectionRenderedParams,
} from "react-virtualized/dist/es/Grid";
import type { AutoSizerProps } from "react-virtualized/dist/es/AutoSizer";
import type { WindowScrollerProps } from "react-virtualized/dist/es/WindowScroller";
import { Planet } from "../../../../types";
import { Cell } from "./styles";

const AutoSizer = _AutoSizer as unknown as FC<any>;
const WindowScroller = _WindowScroller as unknown as FC<any>;
const CellMeasurer = _CellMeasurer as unknown as FC<any>;
const Grid = _Grid as unknown as FC<any>;

type Props = {
  changePage: () => void;
  setColumnWidth: (width: number) => void;
  dataCount?: number;
  columnWidth: number;
  isLoading: boolean;
  res: Planet[];
};

const COLUMNS_COUNT = 7;
const ROW_HEIGHT = 100;

function GridList({
  changePage,
  dataCount,
  isLoading,
  res,
  setColumnWidth,
  columnWidth,
}: Props) {
  const navigate = useNavigate();
  const grid = React.useRef<any>(null);
  const cache = React.useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );
  const cellRenderer = ({
    key,
    rowIndex,
    columnIndex,
    parent,
    style,
  }: GridCellProps) => {
    let content;

    if (rowIndex < res.length - 1) {
      const cellStyle = Object.assign({}, style, {
        backgroundColor: rowIndex % 2 ? "#eee" : null,
      });
      const values: (string | string[])[] = Object.values(res[rowIndex]);
      content = (
        <Cell
          onClick={() => navigate(`/planets/${rowIndex}`)}
          style={cellStyle}
        >
          <div>
            <Typography>{values[columnIndex]}</Typography>
          </div>
        </Cell>
      );
    }

    return (
      <CellMeasurer
        key={key}
        cache={cache.current}
        parent={parent}
        columnIndex={columnIndex}
        rowIndex={rowIndex}
      >
        {content}
      </CellMeasurer>
    );
  };

  const onResize = ({ width }: { width: number }) => {
    setColumnWidth((width - 30) / COLUMNS_COUNT);
    cache.current.clearAll();
    grid.current.recomputeGridSize();
  };

  const onSectionRendered = ({ rowStopIndex }: SectionRenderedParams) => {
    if (rowStopIndex === res.length && dataCount && !isLoading) {
      changePage();
    }
  };

  return (
    <WindowScroller>
      {({ height, scrollTop }: WindowScrollerProps) => (
        <AutoSizer disableHeight onResize={onResize}>
          {({ width }: AutoSizerProps) => (
            <Grid
              autoHeight
              width={width}
              height={height}
              scrollTop={scrollTop}
              ref={grid}
              columnWidth={columnWidth}
              columnCount={COLUMNS_COUNT}
              rowCount={res.length + 1}
              rowHeight={ROW_HEIGHT}
              cellRenderer={cellRenderer}
              onSectionRendered={onSectionRendered}
            />
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
}

export default GridList;
