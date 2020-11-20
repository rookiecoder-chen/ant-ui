import React, {FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef} from 'react';
import Input, {InputProps} from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import classNames from 'classnames';
import useClickOutsize from '../../hooks/useClickOutsize';


interface DataSourceObject {
    value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
    onSelect?: (item: DataSourceType) => void
    renderOption?: (item: DataSourceType) => ReactElement
}

export const Autocomplete: FC<AutoCompleteProps> = (props) => {
    const {value, fetchSuggestions, onSelect, renderOption, ...restProps} = props;
    //inputValue来自Input组件
    const [inputValue, setInputValue] = useState(value as string);
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
    const [loading, setLoading] = useState(false);
    const debounceValue = useDebounce(inputValue, 500);
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const triggerSearch = useRef(false);
    const componentRef = useRef<HTMLDivElement>(null);
    useClickOutsize(componentRef, () => {
        setSuggestions([]);
    });

    useEffect(() => {
        if (debounceValue && triggerSearch.current) {
            const results = fetchSuggestions(debounceValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(data => {
                    setLoading(false);
                    setSuggestions(data);
                });
            } else {
                setSuggestions(results);
            }
        } else {
            setSuggestions([]);
        }
        setHighlightIndex(-1);
    }, [debounceValue]);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;

    };
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value);
        setSuggestions([]);
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
            <ul>
                {suggestions.map((item, index) => {
                    const cnames = classNames('suggestion-item', {
                        'item-highlighted': index === highlightIndex
                    });
                    return (
                        <li key={index} className={cnames} onClick={() => {
                            handleSelect(item);
                        }}>
                            {renderTemplate(item)}
                        </li>
                    );
                })}
            </ul>
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
            {loading && <ul><Icon icon='spinner' spin/></ul>}
            {(suggestions.length > 0) && generateDropdown()}
        </div>
    );
};
export default Autocomplete;