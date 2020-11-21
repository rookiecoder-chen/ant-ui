import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Upload, UploadFile} from './upload';
import Icon from '../Icon/icon';
import Button from '../Button/button';

const defaultFileList: UploadFile[] = [
    {uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30},
    {uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30},
    {uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30}
];
// const checkFileSize = (file: File) => {
//   if (Math.round(file.size / 1024) > 50) {
//     alert('file too big')
//     return false;
//   }
//   return true;
// }
// const filePromise = (file: File) => {
//   const newFile = new File([file], 'new_name.docx', {type: file.type})
//   return Promise.resolve(newFile)
// }
const SimpleUpload = () => {
    return (
        <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            defaultFileList={defaultFileList}
            onChange={action('changed')}
            onRemove={action('removed')}
            multiple
        >
            <Button btnType='primary'>上传文件</Button>
        </Upload>
    );
};
const UploadWithFileFormat = () => {
    return (
        <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={action('changed')}
            onRemove={action('removed')}
            multiple
            accept=".jpg"
        >
            <Button btnType='primary'>上传图片</Button>
        </Upload>
    );
};
const DragUpload = () => {
    return (
        <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={action('changed')}
            onRemove={action('removed')}
            name="fileName"
            multiple
            drag
        >
            <Icon icon="upload" size="5x" theme="secondary"/>
            <br/>
            <p>拖动文件到此处上传</p>
        </Upload>
    );
};
storiesOf('Upload 文件上传', module)
    .add('Upload', SimpleUpload)
    .add('上传图片', UploadWithFileFormat)
    .add('拖动文件上传', DragUpload);