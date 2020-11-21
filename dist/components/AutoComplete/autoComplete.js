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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useEffect, useRef } from 'react';
import Input from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import classNames from 'classnames';
import useClickOutsize from '../../hooks/useClickOutsize';
import Transition from '../Transition/transition';
/**
 * ### 引入方式
 * ~~~js
 * import { AutoComplete } from "taozi-ui"
 * ~~~
 */
export var Autocomplete = function (props) {
    var value = props.value, fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, renderOption = props.renderOption, restProps = __rest(props, ["value", "fetchSuggestions", "onSelect", "renderOption"]);
    //inputValue来自Input组件
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(false), showDropdown = _d[0], setShowDropdown = _d[1];
    var debounceValue = useDebounce(inputValue, 500);
    var _e = useState(-1), highlightIndex = _e[0], setHighlightIndex = _e[1];
    // 希望在选中数据后 不会再次进行搜索
    var triggerSearch = useRef(false);
    // 指向组件的Dom节点 传入泛型 因为最外层是div
    var componentRef = useRef(null);
    useClickOutsize(componentRef, function () {
        setSuggestions([]);
    });
    useEffect(function () {
        if (debounceValue && triggerSearch.current) {
            setSuggestions([]);
            var results = fetchSuggestions(debounceValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                    if (data.length > 0) {
                        setShowDropdown(true);
                    }
                });
            }
            else {
                setSuggestions(results);
                setShowDropdown(true);
                if (results.length > 0) {
                    setShowDropdown(true);
                }
            }
        }
        else {
            setShowDropdown(false);
        }
        setHighlightIndex(-1);
    }, [debounceValue, fetchSuggestions]);
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setShowDropdown(false);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement(Transition, { in: showDropdown || loading, animation: 'zoom-in-top', timeout: 300, onExited: function () {
                setSuggestions([]);
            } },
            React.createElement("ul", { className: 'ant-suggestion-list' },
                loading && React.createElement("div", { className: "suggest-loading-icon" },
                    React.createElement(Icon, { icon: "spinner", spin: true })),
                suggestions.map(function (item, index) {
                    var cnames = classNames('suggestion-item', {
                        'is-active': index === highlightIndex
                    });
                    return (React.createElement("li", { key: index, className: cnames, onClick: function () {
                            handleSelect(item);
                        } }, renderTemplate(item)));
                }))));
    };
    var handleKeyDown = function (e) {
        var highlight = function (index) {
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
    return (React.createElement("div", { className: 'ant-auto-complete', ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue }, restProps, { onChange: handleChange, onKeyDown: handleKeyDown })),
        generateDropdown()));
};
export default Autocomplete;
