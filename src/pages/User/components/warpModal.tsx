import { Button, ConfigProvider, Modal } from "antd";
import { FC, ReactNode } from "react";

type IWrapProps = {
  isOpen: boolean;
  modalWidth: number;
  title: string;
  handleOk: () => void;
  handleCancel: () => void;
  from: ReactNode;
};

const WrapModal: FC<IWrapProps> = ({
  isOpen,
  modalWidth,
  title,
  handleOk,
  handleCancel,
  from,
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#34343E",
            headerBg: "#34343E",
            // titleColor:"red",
            // footerBg:"red"
          },
          Button: {
            colorPrimary: "#5E62FF",
            colorPrimaryHover: "#4D51FF",
          },
        },
      }}
    >
      <Modal
        title={title}
        open={isOpen}
        width={modalWidth}
        // onOk={handleOk}
        maskClosable={false}
        onCancel={handleCancel}
        footer={[
          <Button
            key="back"
            onClick={handleCancel}
            //   size="large"
            style={{ width: 80 }}
          >
            取消
          </Button>,
          <Button
            key="onOk"
            // size="large"
            style={{ width: 80 }}
            // key="submit"
            type="primary"
            // loading={loading}
            onClick={handleOk}
          >
            确认
          </Button>,
        ]}
      >
        {from}
      </Modal>
    </ConfigProvider>
  );
};

export default WrapModal;
