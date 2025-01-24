import React from 'react';
import { Alert } from 'antd';

function AlertComponent({ message, description, type, ...props }) {
    return (
        <Alert
            message={message}
            description={description}
            type={type}
            {...props}
        />
    );
}

export default AlertComponent;
