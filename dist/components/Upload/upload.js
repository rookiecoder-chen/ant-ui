var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useRef, useState } from 'react';
import axios from 'axios';
import UploadList from './uploadList';
import Dragger from './dragger';
/**
 * ### 引入方式
 * ~~~js
 * import { Upload } from "taozi-ui"
 * ~~~
 */
export var Upload = function (props) {
    var action = props.action, beforeUpload = props.beforeUpload, defaultFileList = props.defaultFileList, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, drag = props.drag, children = props.children;
    // 由于真正上传文件的是input，但是input被隐藏了，因此为其设置一个ref，使用useRef来获取该节点
    var fileInput = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (updateFile, updateObj) {
        /**
         * 如果setFileList(file)，由于是异步更新的文件，无法拿到最新的状态。
         * 如果新的 state 需要通过使用先前的 state 计算得出，
         * 那么可以将函数传递给 setState。该函数将接收先前的 state，并返回一个更新后的值。
         *
         * 而更新列表的某一项时返回的是一个新的列表，而不是在原列表上进行更改。
         * 因为调用 State Hook 的更新函数并传入当前的 state 时，React 将跳过子组件的渲染及 effect 的执行。
         * （因为React 使用 Object.is 比较算法 来比较 state。）
         */
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    var post = function (file) {
        // setFileList([_file, ...fileList])有bug，当上传多个文件时只能获取到最后一个上传的文件，因此需要函数式更新state
        // setFileList([_file, ...fileList]);
        setFileList(function (prevList) {
            return __spreadArrays([file], prevList);
        });
        var formData = new FormData();
        formData.append(name || 'file', file.raw); // name存在就用name,不存在就用原始file代替,ts属性后面加！代表非空断言(!null, !undefined)
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                //计算上传百分比
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(file, { percent: percentage, status: 'uploading' });
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
        }).then(function (response) {
            updateFileList(file, { status: 'success', response: response.data });
            if (onSuccess) {
                onSuccess(response.data, file);
            }
            if (onChange) {
                onChange(file);
            }
        }).catch(function (err) {
            updateFileList(file, { status: 'error', error: err });
            console.log(err);
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
        });
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            var _file = {
                uid: Date.now() + 'upload-file',
                status: 'ready',
                name: file.name,
                size: file.size,
                percent: 0,
                raw: file
            };
            if (!beforeUpload) {
                post(_file);
            }
            else {
                var result = beforeUpload(_file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(_file);
                }
            }
        });
    };
    return (React.createElement("div", { className: 'ant-upload-component' },
        React.createElement("div", { className: "ant-upload-input", style: { display: 'inline-block' }, onClick: handleClick }, drag ? (React.createElement(Dragger, { onFile: function (files) {
                uploadFiles(files);
            } }, children)) : (children)),
        React.createElement("input", { type: "file", className: 'ant-file-input', style: { display: 'none' }, ref: fileInput, onChange: handleFileChange, accept: accept, multiple: multiple }),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    name: 'file'
};
export default Upload;
