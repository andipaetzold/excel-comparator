import React, { useCallback, useMemo, useState } from "react";
import CompareOption from "types/CompareOption";
import Sheet from "types/Sheet";
import { Modal, Button } from "antd";
import SheetTable from "components/SheetTable";

interface Props {
    sheetLeft: Sheet;
    sheetRight: Sheet;
    options: CompareOption[];
}

export default function Result({ sheetLeft, sheetRight, options }: Props) {
    const [sheetInModal, setSheetInModal] = useState<Sheet | undefined>();

    const isEqual = useCallback(
        (left: any, right: any) => {
            for (const option of options) {
                if (option.left === null || option.right === null) {
                    continue;
                }

                if (left[option.left].value !== right[option.right].value) {
                    return false;
                }
            }

            return true;
        },
        [options]
    );

    const isEqualLeft = useCallback(
        (row1: any, row2: any) => {
            for (const option of options) {
                if (option.left === null) {
                    continue;
                }

                if (row1[option.left].value !== row2[option.left].value) {
                    return false;
                }
            }

            return true;
        },
        [options]
    );

    const isEqualRight = useCallback(
        (row1: any, row2: any) => {
            for (const option of options) {
                if (option.right === null) {
                    continue;
                }

                if (row1[option.right].value !== row2[option.right].value) {
                    return false;
                }
            }

            return true;
        },
        [options]
    );

    const missingLeft = useMemo(() => sheetLeft.data.filter(rowLeft => !sheetRight.data.find(rowRight => isEqual(rowLeft, rowRight))), [
        sheetLeft,
        sheetRight,
        isEqual
    ]);

    const missingRight = useMemo(() => sheetRight.data.filter(rowRight => !sheetLeft.data.find(rowLeft => isEqual(rowLeft, rowRight))), [
        sheetLeft,
        sheetRight,
        isEqual
    ]);

    const matchingLeft = useMemo(() => sheetLeft.data.filter(rowLeft => sheetRight.data.find(rowRight => isEqual(rowLeft, rowRight))), [
        sheetLeft,
        sheetRight,
        isEqual
    ]);

    const matchingRight = useMemo(() => sheetRight.data.filter(rowRight => sheetLeft.data.find(rowLeft => isEqual(rowLeft, rowRight))), [
        sheetLeft,
        sheetRight,
        isEqual
    ]);

    const duplicateLeft = useMemo(
        () =>
            sheetLeft.data.filter((row1, index1) =>
                sheetLeft.data.filter((_, index2) => index1 !== index2).find(row2 => isEqualLeft(row1, row2))
            ),
        [sheetLeft, isEqualLeft]
    );

    const duplicateRight = useMemo(
        () =>
            sheetRight.data.filter((row1, index1) =>
                sheetRight.data.filter((_, index2) => index1 !== index2).find(row2 => isEqualRight(row1, row2))
            ),
        [sheetRight, isEqualRight]
    );

    return (
        <>
            <ul>
                <li>
                    Zeilen links, die keine übereinstimmende Zeile rechts haben:{" "}
                    <Button type="link" onClick={() => setSheetInModal({ headers: sheetLeft.headers, data: missingLeft })}>
                        {missingLeft.length}
                    </Button>
                </li>
                <li>
                    Zeilen rechts, die keine übereinstimmende Zeile links haben:{" "}
                    <Button type="link" onClick={() => setSheetInModal({ headers: sheetRight.headers, data: missingRight })}>
                        {missingRight.length}
                    </Button>
                </li>
                <li>
                    Zeilen links, die eine übereinstimmende Zeile rechts haben:{" "}
                    <Button type="link" onClick={() => setSheetInModal({ headers: sheetLeft.headers, data: matchingLeft })}>
                        {matchingLeft.length}
                    </Button>
                </li>
                <li>
                    Zeilen rechts, die eine übereinstimmende Zeile links haben:{" "}
                    <Button type="link" onClick={() => setSheetInModal({ headers: sheetRight.headers, data: matchingRight })}>
                        {matchingRight.length}
                    </Button>
                </li>
                <li>
                    Duplikate Links:{" "}
                    <Button type="link" onClick={() => setSheetInModal({ headers: sheetLeft.headers, data: duplicateLeft })}>
                        {duplicateLeft.length}
                    </Button>
                </li>
                <li>
                    Duplikate Rechts:{" "}
                    <Button type="link" onClick={() => setSheetInModal({ headers: sheetRight.headers, data: duplicateRight })}>
                        {duplicateRight.length}
                    </Button>
                </li>
            </ul>
            <Modal
                visible={sheetInModal !== undefined}
                onOk={() => setSheetInModal(undefined)}
                cancelButtonProps={{ style: { display: "none" } }}
                width="1080"
                style={{ top: 0, paddingBottom: 0 }}
            >
                {sheetInModal && <SheetTable sheet={sheetInModal} />}
            </Modal>
        </>
    );
}
