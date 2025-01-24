import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'antd';
import InputComponent from '@/components/form/antd/InputComponent';
import SelectComponent from '@/components/form/antd/SelectComponent';
import { uesDialingCode } from '@/hooks/api/dialing-code';

function UpdateContactForm({
    setNewContactData,
    setUpdateContactState,
    generateVerificationCode,
}) {
    const [dialingCodeData, setDialingCodeData] = useState([]);
    const [selectedDialingCode, setSelectedDialingCode] = useState();
    const { index: getDialingCode, show: getSelectedDialingCode } =
        uesDialingCode();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getDialingCode();
            const dialingCodeItem = data.map(item => ({
                ...item,
                name: item.country_code + ' (+' + item.dialing_code + ')',
            }));
            setDialingCodeData(dialingCodeItem);
        };
        fetchData();
    }, []);

    const onFinish = async values => {
        values.dialingCode = selectedDialingCode.dialing_code;
        setNewContactData(values);
        setUpdateContactState(prevState => ({ ...prevState, activeView: 3 }));
        generateVerificationCode();
    };

    const handleChangeDialingCode = async value => {
        const { data } = await getSelectedDialingCode(value);
        setSelectedDialingCode(data);
    };

    return (
        <Form
            name='updateProfile'
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 1000,
            }}
            initialValues={{
                remember: false,
            }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete='off'
        >
            <InputComponent
                label='Email'
                name='email'
                rules={[
                    {
                        required: true,
                        message: 'Email is required!',
                    },
                ]}
            />

            <Form.Item label='Contact #'>
                <Row gutter={12}>
                    <Col span={12}>
                        <SelectComponent
                            name='dialingCodeId'
                            rules={[
                                {
                                    required: true,
                                    message: 'Dialing Code is required!',
                                },
                            ]}
                            placeholder='Dialing Code'
                            dataArray={dialingCodeData}
                            onChange={handleChangeDialingCode}
                        />
                    </Col>
                    <Col span={12}>
                        <InputComponent
                            name='contactNumber'
                            rules={[
                                {
                                    required: true,
                                    message: 'Contact Number is required!',
                                },
                            ]}
                        />
                    </Col>
                </Row>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type='primary' htmlType='submit'>
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
}

export default UpdateContactForm;
