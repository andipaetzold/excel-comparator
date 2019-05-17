import { CellObject } from "xlsx/types";

export default interface Sheet {
    headers: string[];
    data: {
        [columnIndex: string]: {
            cell: CellObject;
            value: string;
        };
    }[];
}
