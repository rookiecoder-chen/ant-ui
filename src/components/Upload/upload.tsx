import React, {ChangeEvent, FC, useRef, useState} from 'react';
import axios from 'axios';
import Button from '../Button/button';
import UploadList from './uploadList';

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
    uid: string
    size: number
    name: string
    status?: UploadFileStatus
    percent?: number
    raw?: File
    response?: any
    error?: any
}

export interface UploadProps {
    //文件接收接口地址
    /**文件接收接口地址*/
    action: string
    defaultFileList?: UploadFile[]
    beforeUpload?: (file: File) => boolean | Promise<File>
    onProgress?: (percentage: number, file: File) => void
    onSuccess?: (data: any, file: File) => void
    onError?: (err: any, file: File) => void
    onChange?: (file: File) => void
    onRemove?: (file: UploadFile) => void
    headers?: { [key: string]: any }
    name?: string
    data?: { [key: string]: any }
    withCredentials?: boolean
    accept?: string
    multiple?: boolean
}

export const Upload: FC<UploadProps> = (props) => {
    const {
        action, beforeUpload, defaultFileList, onProgress, onSuccess, onError, onChange, onRemove,
        headers, name, data, withCredentials, accept, multiple
    } = props;
    const fileInput = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
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
    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };
        // setFileList([_file, ...fileList]);
        setFileList((prevList) => {
            return [_file, ...prevList];
        });
        const formData = new FormData();
        formData.append(name || 'file', file);
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
                    updateFileList(_file, {percent: percentage, status: 'uploading'});
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
        }).then(response => {
            updateFileList(_file, {status: 'success', response: response.data});
            if (onSuccess) {
                onSuccess(response.data, file);
            }
            if (onChange) {
                onChange(file);
            }
        }).catch(err => {
            updateFileList(_file, {status: 'error', error: err});
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
            if (!beforeUpload) {
                post(file);
            } else {
                const result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile);
                    });
                } else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    return (
        <div className='ant-upload-component'>
            <Button btnType='primary' onClick={handleClick}>上传文件</Button>
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