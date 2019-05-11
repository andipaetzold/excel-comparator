import React, { useState, useCallback, useEffect } from "react";
import Grid from "antd/lib/card/Grid";
import { Row, Col, Select } from "antd";
import CompareOption from "types/CompareOption";

interface Props {
    headersLeft: string[];
    headersRight: string[];
    onChange: (options: CompareOption[]) => void;
}

export default function CompareOptions({ headersLeft, headersRight, onChange }: Props) {
    const [options, setOptions] = useState<CompareOption[]>([{ left: null, right: null }]);

    const setLeftOption = useCallback(
        (optionIndex: number, value: number | null) => {
            setOptions(prev =>
                prev.map((o, i) => ({
                    ...o,
                    left: i === optionIndex ? value : o.left
                }))
            );
        },
        [setOptions]
    );

    const setRightOption = useCallback(
        (optionIndex: number, value: number | null) => {
            setOptions(prev =>
                prev.map((o, i) => ({
                    ...o,
                    right: i === optionIndex ? value : o.right
                }))
            );
        },
        [setOptions]
    );

    useEffect(() => {
        console.log(options);
        const lastOption = options[options.length - 1];
        if (lastOption.left !== null && lastOption.right !== null) {
            setOptions(opt => [...opt, { left: null, right: null }]);
        }
    }, [options, setOptions]);

    useEffect(() => onChange(options.slice(0, -1)), [onChange, options]);

    return (
        <Grid>
            {options.map((optionTuple, optionIndex) => (
                <Row key={optionIndex} gutter={10}>
                    <Col span={12}>
                        <Select<number | null>
                            style={{ width: "100%" }}
                            value={optionTuple.left}
                            onChange={v => setLeftOption(optionIndex, v)}
                        >
                            <Select.Option key={"null"} value={null as any}>
                                ---
                            </Select.Option>
                            {headersLeft.map((header, value) => (
                                <Select.Option key={header} value={value}>
                                    {header}
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={12}>
                        <Select<number | null>
                            style={{ width: "100%" }}
                            value={optionTuple.right}
                            onChange={v => setRightOption(optionIndex, v)}
                        >
                            <Select.Option key={"null"} value={null as any}>
                                ---
                            </Select.Option>
                            {headersRight.map((header, value) => (
                                <Select.Option key={header} value={value}>
                                    {header}
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>
                </Row>
            ))}
        </Grid>
    );
}
