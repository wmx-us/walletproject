import { Button, ConfigProvider, Form, Input, Row, Space } from "antd";
import "../index.scoped.css";
import "../index.css";
import Gap from "@/components/Gap";
import CustomUploader from "@/components/customUpLoad";

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 18 },
};
const ModalCooperation = () => {
  const [cooperate] = Form.useForm();

  const upLoadHandler = (url: string) => {
    console.log("url", url);
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorBorder: "#A0A0A0",
            colorBgContainer: "transparent",
          },
        },
      }}
    >
      <Form
        {...formItemLayout}
        labelAlign="left"
        initialValues={{ remember: true }}
        name="cooperateName"
        form={cooperate}
      >
        <FormItem
          name="companyName"
          required
          label="公司名称"
          rules={[{ required: true, message: "请输入公司名称" }]}
        >
          <Input placeholder="请输入公司名称" style={{ height: 36 }} />
        </FormItem>
        <FormItem
          name="contactWay"
          required
          label="联系方式"
          rules={[{ required: true, message: "请输入您的联系方式" }]}
        >
          <Input placeholder="请输入您的联系方式" style={{ height: 36 }} />
        </FormItem>
        <FormItem
          name="platformSouces"
          required
          label="平台资质"
          rules={[{ required: true, message: "请添加您的图片" }]}
        >
          <CustomUploader uploadUrl="url" onUpload={upLoadHandler} />
        </FormItem>
        <FormItem
          name="inscriptionName"
          required
          label="发行铭文名称"
          rules={[{ required: true, message: "请输入发行铭文名称" }]}
        >
          <Input placeholder="请输入发行铭文名称" style={{ height: 36 }} />
        </FormItem>
        <FormItem
          name="inscriptionNum"
          required
          label="发行铭文数量"
          rules={[{ required: true, message: "请输入发行铭文数量" }]}
        >
          <Input placeholder="请输入发行铭文数量" style={{ height: 36 }} />
        </FormItem>
        <FormItem
          name="inscriptionTime"
          required
          label="计划发行时间"
          rules={[{ required: true, message: "请输入计划发行时间" }]}
        >
          <Input placeholder="请输入计划发行时间" style={{ height: 36 }} />
        </FormItem>
        <Space>提供的资料越全面，通过概率就越大，丰富资料，高效铸造</Space>

        <Gap height={25} />
        <Row justify="center">
          <Button className="submitform">提交表单</Button>
        </Row>
        <Gap height={50} />
      </Form>
    </ConfigProvider>
  );
};

export default ModalCooperation;
