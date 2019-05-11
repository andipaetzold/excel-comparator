import React, { useCallback, useMemo } from "react";
import CompareOption from "types/CompareOption";
import Sheet from "types/Sheet";

interface Props {
    sheetLeft: Sheet;
    sheetRight: Sheet;
    options: CompareOption[];
}

export default function Result({ sheetLeft, sheetRight, options }: Props) {
    const isEqual = useCallback(
        (left: any, right: any) => {
            for (const option of options) {
                if (option.left === null || option.right === null) {
                    continue;
                }

                if (left[option.left] !== right[option.right]) {
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

                if (row1[option.left] !== row2[option.left]) {
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

                if (row1[option.right] !== row2[option.right]) {
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
        <ul>
            <li>Zeilen links, die keine übereinstimmende Zeile rechts haben: {missingLeft.length}</li>
            <li>Zeilen rechts, die keine übereinstimmende Zeile links haben: {missingRight.length}</li>
            <li>Zeilen links, die eine übereinstimmende Zeile rechts haben: {matchingLeft.length}</li>
            <li>Zeilen rechts, die eine übereinstimmende Zeile links haben: {matchingRight.length}</li>
            <li>Duplikate Links: {duplicateLeft.length}</li>
            <li>Duplikate Rechts: {duplicateRight.length}</li>
        </ul>
    );
}
