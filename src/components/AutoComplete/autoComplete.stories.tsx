import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import Autocomplete from './autoComplete';

const SimpleComplete = () => {
    const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];
    const handleFetch = (query: string) => {
        return lakers.filter(name => name.includes(query));
    };
    return (
        <>
            <Autocomplete fetchSuggestions={handleFetch} onSelect={action('selected')}/>
        </>
    );
};

storiesOf('AutoComplete自动完成', module)
    .add('AutoComplete', SimpleComplete);