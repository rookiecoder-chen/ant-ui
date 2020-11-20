import {useEffect, useState} from 'react';

function useDebounce(value: any, delay = 300) {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const handler = window.setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        //useEffect返回函数，用于清除副作用
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debounceValue;
}

export default useDebounce;