import { InboxOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import ScalableButton from "@/components/button";
import React, { useState } from "react";
import type { IUploadProps } from "./types";
import type { RcFile, UploadFile } from "antd/lib/upload";

/**
 *
 * @param {IUploadProps} props - props for upload
 * @returns {React.FC} uploader Component
 */
const FileUploader: React.FC<IUploadProps> = (props: IUploadProps) => {
  const {
    title,
    defaultStyle,
    type,
    btnColor,
    icon,
    preview,
    dragger,
    draggerText,
    previewImage,
    ...rest
  } = props;

  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [image, setPreviewImage] = useState<string>(previewImage || "");

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  /**
   * image preview get base64 string
   *
   * @param {RcFile} file - file
   * @returns {void} handler close
   */
  const getBase64 = (file: RcFile): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        return resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        return reject(error);
      };
    });
  };
  /**
   * preview close handler
   *
   * @returns {void} preview close
   */
  const handleCancel = () => {
    return setPreviewOpen(false);
  };
  /**
   * preview handler
   *
   * @param {UploadFile} file - file
   * @returns {void} preview handler
   */
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  /**
   *
   * @returns {React.FC} uploader Component
   */
  const DraggerComponent: React.FC = () => {
    return (
      <Upload.Dragger onPreview={handlePreview} {...rest}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          {draggerText ||
            "Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files"}
        </p>
      </Upload.Dragger>
    );
  };
  const UploadComponent = dragger ? DraggerComponent : Upload;

  return (
    <>
      {preview ? (
        <UploadComponent
          onPreview={handlePreview}
          listType={"picture-card"}
          {...rest}
        >
          {image !== null && uploadButton}
        </UploadComponent>
      ) : null}
      {defaultStyle && (
        <UploadComponent onPreview={handlePreview} {...rest}>
          <ScalableButton type={btnColor} icon={icon || <UploadOutlined />}>
            {title}
          </ScalableButton>
        </UploadComponent>
      )}
      {preview && (
        <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
          <img alt="preview" style={{ width: "100%" }} src={image} />
        </Modal>
      )}
    </>
  );
};

export default FileUploader;
