import React, { useContext, useEffect, useState } from 'react';
import { FilterContext } from './SobeeContainer';
import "./SobeeTotal.css";

const SobeeTotal = (props) => {
    const { filteredItems, filterBaseMonth } = useContext(FilterContext);

    const [totalExpense, setTotalExpense] = useState(0);

    useEffect(() => {
        let total = { expense: 0 };

        if (filteredItems.length > 0) {
            filteredItems.forEach((item) => {
                total.expense += +item.amount;
            })
        }

        setTotalExpense(total.expense);
    }, [filteredItems]);

    return (
        <div className="sobee__total">
            <div className="sobee__total--desc">
                <span>소비한 금액</span>
                <strong>
                    {totalExpense.toString()}원
                </strong>
            </div>
        </div>
    );
}

export default SobeeTotal;