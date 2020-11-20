import React, {FC, useState, ChangeEvent, ReactElement} from 'react';
import Input, {InputProps} from '../Input/input';


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
    const [inputValue, setInputValue] = useState(value);
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
        if (value) {
            const results = fetchSuggestions(value);
            if (results instanceof Promise) {
                console.log('triggered');
                results.then(data => {
                    setSuggestions(data);
                });
            } else {
                setSuggestions(results);
            }
        } else {
            setSuggestions([]);
        }
    };
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
    };
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value;
    };
    const generateDropdown = () => {
        return (
            <ul>
                {suggestions.map((item, index) => {
                    return (
                        <li key={index} onClick={() => {
                            handleSelect(item);
                        }}>
                            {renderTemplate(item)}
                        </li>
                    );
                })}
            </ul>
        );
    };
    return (
        <div className='ant-auto-complete'>
            <Input value={inputValue} {...restProps} onChange={handleChange}/>
            {(suggestions.length > 0) && generateDropdown()}
        </div>
    );
};
export default Autocomplete;