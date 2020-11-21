import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import Upload, {UploadFile} from './upload';

const defaultFileList: UploadFile[] = [
    {uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30},
    {uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30},
    {uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30}
];
const SimpleUpload = () => {
    const checkFileSize = (file: File) => {
        if (Math.round(file.size / 1024) > 50) {
            alert('文件太大');
            return false;
        }
        return true;
    };
    const filePromise = (file: File) => {
        const newFile = new File([file], 'new_name.txt', {type: file.type});
        return Promise.resolve(newFile);
    };
    return (
        <Upload
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            action="https://run.mocky.io/v3/48969418-7129-4af7-a3eb-840198a8a97b"
            onChange={action('changed')}
            defaultFileList={defaultFileList}
            onRemove={action('removed')}
            name="fileName"
            data={{'key': 'value'}}
            headers={{'X-Powered-By': 'ant-ui'}}
            accept={'.jpg'}
            multiple
        />
    );
};

storiesOf('Upload上传', module)
    .add('Upload', SimpleUpload);