import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import Autocomplete from './autoComplete';

// interface LakerPlayerProps {
//     value: string
//     number: number
// }
//
// interface GithubUserProps {
//     login: string
//     url: string
//     avatar_url: string
// }

const SimpleAutoComplete = () => {
    // const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];
    const lakersWithNumber = [
        {value: 'bradley', number: 11},
        {value: 'pope', number: 1},
        {value: 'caruso', number: 4},
        {value: 'cook', number: 2},
        {value: 'cousins', number: 15},
        {value: 'james', number: 23},
        {value: 'AD', number: 3},
        {value: 'green', number: 14},
        {value: 'howard', number: 39},
        {value: 'kuzma', number: 0},
    ];
    // const handleFetch = (query: string) => {
    //     return lakers.filter(name => name.includes(query)).map(name => ({value: name}));
    // };
    const handleFetch = (query: string) => {
        return lakersWithNumber.filter(player => player.value.includes(query));
    };
    // const renderOption = (item: DataSourceType<LakerPlayerProps>) => {
    //     return (
    //         <>
    //             <h2>Name:{item.value}</h2>
    //             <p>Number:{item.number}</p>
    //         </>
    //     );
    // };
    // const renderOption = (item: DataSourceType<GithubUserProps>) => {
    //     return (
    //         <>
    //             <h2>Name:{item.login}</h2>
    //             <p>Number:{item.url}</p>
    //         </>
    //     );
    // };
    return (
        <>
            <Autocomplete
                style={{width:'300px'}}
                fetchSuggestions={handleFetch}
                onSelect={action('selected')}
                // renderOption={renderOption}
            />
        </>
    );
};

const asyncAutoComplete = () => {
    const handleFetch = (query: string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res => res.json())
            .then(({items}) => {
                return items.slice(0, 10).map((item: { login: any; }) => ({value: item.login, ...item}));
            });
    };
    return (
        <>
            <Autocomplete
                placeholder="请求Github用户的API"
                style={{width:'300px'}}
                fetchSuggestions={handleFetch}
                onSelect={action('selected')}/>
        </>
    );
};
storiesOf('AutoComplete 自动完成', module)
    .add('AutoComplete', SimpleAutoComplete)
    .add('异步请求的AutoComplete', asyncAutoComplete);
