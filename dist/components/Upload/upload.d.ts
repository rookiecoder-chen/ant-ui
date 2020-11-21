import { FC } from 'react';
export declare type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    /** 文件ID */
    uid: string;
    /** 文件大小 */
    size: number;
    /** 文件名 */
    name: string;
    /** 上传状态 */
    status?: UploadFileStatus;
    /** 上传进度 */
    percent?: number;
    /** 源文件 */
    raw?: File;
    /** 上传成功的响应 */
    response?: any;
    /** 上传失败的错误响应 */
    error?: any;
}
export interface UploadProps {
    /**文件后台接口地址*/
    action: string;
    /** 默认显示的文件列表 */
    defaultFileList?: UploadFile[];
    /** 文件上传前的操作，用来完成验证或者文件转换 */
    beforeUpload?: (file: UploadFile) => boolean | Promise<UploadFile>;
    /** 文件进度改变时调用的方法 */
    onProgress?: (percentage: number, file: UploadFile) => void;
    /** 上传成功 (data: 服务器返回的数据)*/
    onSuccess?: (data: any, file: UploadFile) => void;
    /** 上传失败 */
    onError?: (err: any, file: UploadFile) => void;
    /** 文件上传时触发的方法 */
    onChange?: (file: UploadFile) => void;
    /** 删除文件 */
    onRemove?: (file: UploadFile) => void;
    /** 用户自定义的请求头 */
    headers?: Record<string, any>;
    /** 用户自定义的文件名name */
    name?: string;
    /** 用户自定义的formData数据 */
    data?: {
        [key: string]: any;
    };
    /** Post发送时是否携带cookie */
    withCredentials?: boolean;
    /** 允许上传文件的类型 */
    accept?: string;
    /** 是否支持上传多个文件 */
    multiple?: boolean;
    /** 是否支持拖动文件上传 */
    drag?: boolean;
}
/**
 * ### 引入方式
 * ~~~js
 * import { Upload } from "ant-ui"
 * ~~~
 */
export declare const Upload: FC<UploadProps>;
export default Upload;
