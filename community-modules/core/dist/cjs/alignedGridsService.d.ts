// Type definitions for @ag-grid-community/core v25.1.0
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { GridPanel } from "./gridPanel/gridPanel";
import { AgEvent, ColumnEvent } from "./events";
import { Column } from "./entities/column";
import { BeanStub } from "./context/beanStub";
export declare class AlignedGridsService extends BeanStub {
    private columnController;
    private logger;
    private gridPanel;
    private consuming;
    private setBeans;
    registerGridComp(gridPanel: GridPanel): void;
    private init;
    private fireEvent;
    private onEvent;
    private fireColumnEvent;
    private fireScrollEvent;
    private onScrollEvent;
    getMasterColumns(event: ColumnEvent): Column[];
    getColumnIds(event: ColumnEvent): string[];
    onColumnEvent(event: AgEvent): void;
    private processGroupOpenedEvent;
    private processColumnEvent;
}
