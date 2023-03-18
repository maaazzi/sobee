import React, { useState, useEffect, useMemo } from 'react';
import './SobeeContainer.css';

export const FilterContext = React.createContext();

const SobeeContainer = (props) => {
    const initialFilterBaseMonth = new Date().getMonth().toString();
    const [filterBaseMonth, setFilterBaseMonth] = useState(initialFilterBaseMonth);
    let filteredItems = [];
    let filteredExpenses = [];

    useEffect(() => {
        if (props.isAddItem) {
            let lastedItemId = Math.max(...props.items.map((item) => item.id));
            let lastedItem = props.items.filter((item) => item.id === lastedItemId);
            let lastedFilterBaseMonth = lastedItem[0].date.getMonth().toString();
            setFilterBaseMonth(lastedFilterBaseMonth);
        }
    }, [props.items]);

    if (props.items.length > 0) {
        filteredItems = props.items.filter(
            (item) => item.date.getMonth().toString() === filterBaseMonth
        );

        filteredExpenses = filteredItems.filter(
            (item) => item.amountType === 'expense'
        );
    }

    const onChangeFilter = useCallback((selectedMonth) => {
        setFilterBaseMonth(selectedMonth);
    }, []);

    const memoizedFilter = useMemo(() => {
        return { onChangeFilter, filteredItems, filterBaseMonth, filteredExpenses };
    }, [filteredItems, filterBaseMonth]);

    return (
        <div className='sobee__container'>
            <FilterContext.Provider value={memoizedFilter}>
                <SobeeTotal />
                <SobeeList />
            </FilterContext.Provider>
        </div>
    );
};

export default SobeeContainer;