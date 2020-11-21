import React, {FC, useState, DragEvent} from 'react';
import classNames from 'classnames';

export interface DraggerProps {
    /** 文件拖动完成后触发的事件 */
    onFile: (file: FileList) => void
}

export const Dragger: FC<DraggerProps> = (props) => {
    const {onFile, children} = props;
    /** 拖动完成的状态 */
    const [dragOver, setDragOver] = useState(false);
    const cnames = classNames('ant-uploader-dragger', {
        'is-dragover': dragOver
    });
    const handleDrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault()
        setDragOver(false)
        //从e.dataTransfer.files获取fileList
        onFile(e.dataTransfer.files)
    };
    const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault();
        setDragOver(over);
    };
    return (
        <div
            className={cnames}
            onDragOver={e => {
                handleDrag(e, true);
            }}
            onDragLeave={e => {
                handleDrag(e, false);
            }}
            onDrop={handleDrop}
        >
            {children}
        </div>
    );
};
export default Dragger;