import { Button, Form, Input, Row, Space, Upload, message } from "antd";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import "../index.scoped.css";
import "../index.css";
import Gap from "@/components/Gap";

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 18 },
};
const ModalCooperation = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [cooperate] = Form.useForm();

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUploadHandler = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>
        <div>点击添加图片</div>
        <div>支持扩展名：jpg、png</div>
      </div>
    </button>
  );
  return (
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
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          fileList={[]}
          action={""}
          beforeUpload={beforeUploadHandler}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
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
      <Gap height={50}/>
    </Form>
  );
};

export default ModalCooperation;
