import React, { useEffect, useState, useMemo } from 'react';
import SobeeContainer from './components/Sobee/SobeeContainer.js';
import NewItemContainer from './components/NewItem/NewItemContainer.js';
import './styles/reset.css';
import './styles/common.css';
import './styles/button.css';
import './styles/font.css';
import { useCallback } from 'react';

export const ItemDispatchContext = React.createContext();

const App = () => {
    const [isAddItem, setIsAddItem] = useState(false);
    const [nextItemId, setNextItemId] = useState(0);
    const [items, setItems] = useState([]);

    return (
        <>
            <ItemDispatchContext.Provider>
                <SobeeContainer items={items} isAddItem={isAddItem} />
                <NewItemContainer />
            </ItemDispatchContext.Provider>
        </>
    );

}

export default App;
