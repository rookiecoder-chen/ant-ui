import { FC, ReactElement } from 'react';
import { InputProps } from '../Input/input';
interface DataSourceObject {
    value: string;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /** 用户自定义实现筛选数据的方法（支持异步请求数据）*/
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /** 用户选择下拉菜单中的值触发的方法 */
    onSelect?: (item: DataSourceType) => void;
    /** 用户自定义下拉菜单样式 */
    renderOption?: (item: DataSourceType) => ReactElement;
}
/**
 * ### 引入方式
 * ~~~js
 * import { AutoComplete } from "ant-ui"
 * ~~~
 */
export declare const Autocomplete: FC<AutoCompleteProps>;
export default Autocomplete;
