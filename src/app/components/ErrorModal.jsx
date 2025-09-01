import { Modal } from 'antd';

export const ErrorModal = ({ message, visible, onOk }) => {
  if (!visible) return null;

  return (
    <Modal
      title={<span className="text-red-400 text-xl font-semibold">Ошибка</span>}
      visible={visible}
      onOk={onOk}
      onCancel={onOk}
      closable={false}
      centered
      styles={{
        content: { 
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid rgba(255, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
        },
        header: { 
          backgroundColor: 'transparent',
          borderBottom: '1px solid rgba(255, 0, 0, 0.2)',
        },
        body: { 
          color: 'white',
        },
        footer: {
          borderTop: '1px solid rgba(255, 0, 0, 0.2)',
        }
      }}
    >
      <p className="text-lg">{message}</p>
    </Modal>
  );
};