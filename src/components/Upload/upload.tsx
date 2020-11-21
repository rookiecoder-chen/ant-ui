import React, {ChangeEvent, FC, useRef, useState} from 'react';
import axios from 'axios';
import Button from '../Button/button';
import UploadList from './uploadList';
import Dragger from './dragger';

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
    /** 文件ID */
    uid: string
    /** 文件大小 */
    size: number
    /** 文件名 */
    name: string
    /** 上传状态 */
    status?: UploadFileStatus
    /** 上传进度 */
    percent?: number
    /** 源文件 */
    raw?: File
    /** 上传成功的响应 */
    response?: any
    /** 上传失败的错误响应 */
    error?: any
}

export interface UploadProps {
    //文件接收接口地址
    /**文件后台接口地址*/
    action: string
    /** 默认显示的文件列表 */
    defaultFileList?: UploadFile[]
    /** 文件上传前的操作，用来完成验证或者文件转换 */
    beforeUpload?: (file: UploadFile) => boolean | Promise<UploadFile>
    /** 文件进度改变时调用的方法 */
    onProgress?: (percentage: number, file: UploadFile) => void
    /** 上传成功 (data: 服务器返回的数据)*/
    onSuccess?: (data: any, file: UploadFile) => void
    /** 上传失败 */
    onError?: (err: any, file: UploadFile) => void
    /** 文件上传时触发的方法 */
    onChange?: (file: UploadFile) => void
    /** 删除文件 */
    onRemove?: (file: UploadFile) => void
    /** 用户自定义的请求头 */
    headers?: Record<string, any>// Record: 用来拷贝属性，将headers的string类型改为any类型
    /** 用户自定义的文件名name */
    name?: string
    /** 用户自定义的formData数据 */
    data?: { [key: string]: any }
    /** Post发送时是否携带cookie */
    withCredentials?: boolean
    /** 允许上传文件的类型 */
    accept?: string
    /** 是否支持上传多个文件 */
    multiple?: boolean
    /** 是否支持拖动文件上传 */
    drag?: boolean
}

/**
 * ### 引入方式
 * ~~~js
 * import { Upload } from "ant-ui"
 * ~~~
 */
export const Upload: FC<UploadProps> = (props) => {
    const {
        action, beforeUpload, defaultFileList, onProgress, onSuccess, onError, onChange, onRemove,
        headers, name, data, withCredentials, accept, multiple, drag, children
    } = props;
    // 由于真正上传文件的是input，但是input被隐藏了，因此为其设置一个ref，使用useRef来获取该节点
    const fileInput = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        /**
         * 如果setFileList(file)，由于是异步更新的文件，无法拿到最新的状态。
         * 如果新的 state 需要通过使用先前的 state 计算得出，
         * 那么可以将函数传递给 setState。该函数将接收先前的 state，并返回一个更新后的值。
         *
         * 而更新列表的某一项时返回的是一个新的列表，而不是在原列表上进行更改。
         * 因为调用 State Hook 的更新函数并传入当前的 state 时，React 将跳过子组件的渲染及 effect 的执行。
         * （因为React 使用 Object.is 比较算法 来比较 state。）
         */
        setFileList(prevList => {
            return prevList.map(file => {
                if (file.uid === updateFile.uid) {
                    return {...file, ...updateObj};
                } else {
                    return file;
                }
            });
        });
    };
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    const post = (file: UploadFile) => {
        // setFileList([_file, ...fileList])有bug，当上传多个文件时只能获取到最后一个上传的文件，因此需要函数式更新state
        // setFileList([_file, ...fileList]);
        setFileList((prevList) => {
            return [file, ...prevList];
        });
        const formData = new FormData();
        formData.append(name || 'file', file.raw!);// name存在就用name,不存在就用原始file代替,ts属性后面加！代表非空断言(!null, !undefined)
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            onUploadProgress: (e) => {
                //计算上传百分比
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(file, {percent: percentage, status: 'uploading'});
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
        }).then(response => {
            updateFileList(file, {status: 'success', response: response.data});
            if (onSuccess) {
                onSuccess(response.data, file);
            }
            if (onChange) {
                onChange(file);
            }
        }).catch(err => {
            updateFileList(file, {status: 'error', error: err});
            console.log(err);
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
        });
    };
    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => {
            return prevList.filter(item => item.uid !== file.uid);
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files);
        postFiles.forEach(file => {
            let _file: UploadFile = {
                uid: Date.now() + 'upload-file',
                status: 'ready',
                name: file.name,
                size: file.size,
                percent: 0,
                raw: file
            };
            if (!beforeUpload) {
                post(_file);
            } else {
                const result = beforeUpload(_file);
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile);
                    });
                } else if (result !== false) {
                    post(_file);
                }
            }
        });
    };
    return (
        <div className='ant-upload-component'>
            <div className="ant-upload-input" style={{display: 'inline-block'}} onClick={handleClick}>
                {/* 固定的触发元素使用children代替，来实现自定义上传元素和拖动上传 */}
                {drag ? (
                    <Dragger
                        onFile={(files) => {
                            uploadFiles(files);
                        }}
                    >
                        {children}
                    </Dragger>
                ) : (
                    children
                )}
            </div>
            <input
                type="file"
                className='ant-file-input'
                style={{display: 'none'}}
                ref={fileInput}
                onChange={handleFileChange}
                accept={accept}
                multiple={multiple}
            />
            <UploadList fileList={fileList} onRemove={handleRemove}/>
        </div>
    );
};
Upload.defaultProps = {
    name: 'file'
};
export default Upload;