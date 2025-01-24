import React from 'react';
import { Form, Input } from 'antd';

function InputComponent({ type = null, ...props }) {
    return (
        <Form.Item {...props}>
            <Input type={type} />
        </Form.Item>
    );
}

export default InputComponent;
