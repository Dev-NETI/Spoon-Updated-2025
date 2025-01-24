'use client';
import React from 'react';
import { Select, Form } from 'antd';
const { Option } = Select;

function SelectComponent({
    placeholder,
    dataArray = null,
    onChange,
    ...props
}) {
    return (
        <Form.Item {...props}>
            <Select placeholder={placeholder} onChange={onChange}>
                {dataArray &&
                    dataArray.map(item => (
                        <Option key={item.id} value={item.id}>
                            {item.name}
                        </Option>
                    ))}
            </Select>
        </Form.Item>
    );
}

export default SelectComponent;
