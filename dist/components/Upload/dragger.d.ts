import { FC } from 'react';
export interface DraggerProps {
    /** 文件拖动完成后触发的事件 */
    onFile: (file: FileList) => void;
}
export declare const Dragger: FC<DraggerProps>;
export default Dragger;
