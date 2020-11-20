import React, {FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef} from 'react';
import Input, {InputProps} from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import classNames from 'classnames';
import useClickOutsize from '../../hooks/useClickOutsize';
import Transition from '../Transition/transition';


interface DataSourceObject {
    value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /** 用户自定义实现筛选数据的方法（支持异步请求数据）*/
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
    /** 用户选择下拉菜单中的值触发的方法 */
    onSelect?: (item: DataSourceType) => void
    /** 用户自定义下拉菜单样式 */
    renderOption?: (item: DataSourceType) => ReactElement
}

/**
 * ### 引入方式
 * ~~~js
 * import { AutoComplete } from "ant-ui"
 * ~~~
 */
export const Autocomplete: FC<AutoCompleteProps> = (props) => {
    const {value, fetchSuggestions, onSelect, renderOption, ...restProps} = props;
    //inputValue来自Input组件
    const [inputValue, setInputValue] = useState(value as string);
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const debounceValue = useDebounce(inputValue, 500);
    const [highlightIndex, setHighlightIndex] = useState(-1);
    // 希望在选中数据后 不会再次进行搜索
    const triggerSearch = useRef(false);
    // 指向组件的Dom节点 传入泛型 因为最外层是div
    const componentRef = useRef<HTMLDivElement>(null);
    useClickOutsize(componentRef, () => {
        setSuggestions([]);
    });

    useEffect(() => {
        if (debounceValue && triggerSearch.current) {
            setSuggestions([]);
            const results = fetchSuggestions(debounceValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(data => {
                    setLoading(false);
                    setSuggestions(data);
                    if (data.length > 0) {
                        setShowDropdown(true);
                    }
                });
            } else {
                setSuggestions(results);
                setShowDropdown(true);
                if (results.length > 0) {
                    setShowDropdown(true);
                }
            }
        } else {
            setShowDropdown(false);
        }
        setHighlightIndex(-1);
    }, [debounceValue, fetchSuggestions]);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;

    };
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value);
        setShowDropdown(false);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value;
    };
    const generateDropdown = () => {
        return (
            <Transition in={showDropdown || loading} animation='zoom-in-top' timeout={300} onExited={() => {
                setSuggestions([]);
            }}>
                <ul className='ant-suggestion-list'>
                    {loading && <div className="suggest-loading-icon">
                        <Icon icon="spinner" spin/>
                    </div>}
                    {suggestions.map((item, index) => {
                        const cnames = classNames('suggestion-item', {
                            'is-active': index === highlightIndex
                        });
                        return (
                            <li key={index} className={cnames} onClick={() => {
                                handleSelect(item);
                            }}>
                                {renderTemplate(item)}
                            </li>
                        );
                    })}</ul>

            </Transition>
        );
    };
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const highlight = (index: number) => {
            if (index < 0) {
                index = 0;
            }
            if (index >= suggestions.length) {
                index = suggestions.length - 1;
            }
            setHighlightIndex(index);
        };
        switch (e.keyCode) {
            //回车
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            //上方向键
            case 38:
                highlight(highlightIndex - 1);
                break;
            //下方向键
            case 40:
                highlight(highlightIndex + 1);
                break;
            //esc键
            case 27:
                setSuggestions([]);
                break;
            default:
                break;
        }
    };
    return (
        <div className='ant-auto-complete' ref={componentRef}>
            <Input value={inputValue} {...restProps} onChange={handleChange} onKeyDown={handleKeyDown}/>
            {generateDropdown()}
        </div>
    );
};
export default Autocomplete;