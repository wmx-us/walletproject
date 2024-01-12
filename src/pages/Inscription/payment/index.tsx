import Gap from "@/components/Gap"
import { Button, Card, Col, ConfigProvider, Descriptions, Divider, Row, Steps } from "antd"
import { CheckCircleOutlined, HourglassOutlined, ClockCircleOutlined } from "@ant-design/icons";
import type { DescriptionsProps } from 'antd';
import { useLocation } from "react-router-dom";

import "./index.scoped.css"
const PaymentPage = () => {


    const { key } = useLocation()
    console.log(key);

    const items: DescriptionsProps['items'] = [
        {
            key: 1,
            label: "铭文信息",
            labelStyle: {
                background: "black"
            },
            contentStyle: {
                background: "black"
            },
            children: "",
        },
        {
            key: 2,
            label: "铭文",
            children: "ercz",

        },
        {
            key: 3,
            label: "铭文地址",
            children: "0xuihyuhyuiohyugyyug",

        },
        {
            key: 4,
            label: "分数",
            children: "251",

        },
        {
            key: 5,
            label: "锻造时间",
            children: "2023.12.16 14:23:45",

        },
        {
            key: 6,
            label: "GAS消耗",
            children: "5341GAS",

        },
        {
            key: 7,
            label: "状态",
            children: "失败",

        },
    ]


    return (
        <Row justify="center">
            <Col span={18}>
                <Gap height={30} />
                <div className="title">铭文订单信息 <CheckCircleOutlined style={{ color: "#65B85D" }} /></div>
                <Gap height={25} />
                <Card style={{ background: "#222531" }}>
                    <Row justify="space-between">
                        <Col className="deal">交易 <span style={{ color: "#2196F3" }}>56sdfadASDAsdqwwrd345esfsa234csdac</span></Col>
                        <Col>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Button: {
                                            // defaultBg: '#121C38',
                                            defaultBg: "#152248",
                                            defaultColor: '#FFFFFF',
                                            defaultBorderColor: '#777AFF'
                                        }
                                    }
                                }}
                            >
                                <Button style={{ width: 113, height: 38 }}>排队中</Button>
                            </ConfigProvider>
                        </Col>
                    </Row>
                    <Divider />
                    <Steps
                        labelPlacement="vertical"
                        items={[
                            {
                                title: '排队中',
                                status: 'wait',
                                icon: <ClockCircleOutlined />,
                            },
                            {
                                title: '等待上链',
                                status: 'wait',
                                icon: <ClockCircleOutlined />,
                            },
                            {
                                title: '上链完成',
                                // status: 'finish',
                                icon: <HourglassOutlined />,

                                // icon: <LoadingOutlined />,
                            },
                        ]}
                    />
                    <Divider dashed={true} />
                    <Descriptions bordered items={items} column={1} />
                </Card>
            </Col>
        </Row>
    )
}

export default PaymentPage