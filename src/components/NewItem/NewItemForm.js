import React, { useCallback, useContext, useState } from 'react';
import { ItemDispatchContext } from '../../App.js';
import { StopEditContext } from './NewItemContainer.js';
import './NewItemForm.css';

const NewItemForm = () => {
    const [{ onAdd }, { nextItemId }] = useContext(ItemDispatchContext);
    const { stopEditingHandler } = useContext(StopEditContext);

    const TITLE_SIZE = 35;

    const [enteredDate, setEnteredDate] = useState('');
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');

    const [isTitleSizeOver, setIsTitleSizeOver] = useState(false);
    const [isEnteredWrongAmount, setIsEnteredWrongAmount] = useState(false);

    const getDate = useCallback(() => {
        return new Date().toISOString().substring(0, 10);
    }, []);


    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    };

    const titleChangeHandler = (event) => {
        let isSizeOver = event.target.value.length > TITLE_SIZE ? true : false;
        setIsTitleSizeOver(isSizeOver);

        setEnteredTitle(event.target.value);
    }

    const amountChangeHandler = (event) => {
        let isNotNumber = /^[^1-9][^0-9]{0,11}$/g.test(event.target.value)
            ? true
            : false;
        setIsEnteredWrongAmount(isNotNumber);
        if (isNotNumber) return;
        setEnteredAmount();
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredData = {
            id: nextItemId,
            date: new Date(enteredDate),
            title: enteredTitle,
            amount: enteredAmount
        }

        onAdd(enteredData);

        setEnteredDate('');
        setEnteredTitle('');
        setEnteredAmount('');

        stopEditingHandler();
    };

    return (
        <form className='new-item__form' onSubmit={submitHandler}>
            <div className='new-item__form-info'>
                <h2>날짜</h2>
                <input
                    type='date'
                    value={enteredDate}
                    onChange={dateChangeHandler}
                    min='2020-01-01'
                    max={getDate()}
                    required
                />
            </div>

            <div className='new-item__form-info'>
                <div className='new-item__form-info--title'>
                    <h2>제목</h2>
                    <span
                        style={{ display: isTitleSizeOver ? 'inline-block' : 'none' }}
                    >
                        {TITLE_SIZE}자까지만 입력할 수 있어요.
                    </span>
                </div>
                <input
                    type='text'
                    value={enteredTitle}
                    onChange={titleChangeHandler}
                    placeholder='사용 내역을 입력해 주세요.'
                    maxLength={TITLE_SIZE}
                    required
                />
            </div>

            <div className='new-item__form-info'>
                <div className='new-item__form-info--title'>
                    <h2>금액</h2>
                    <span
                        style={{ display: isEnteredWrongAmount ? 'inline-block' : 'none' }}
                    >
                        10억 미만의 정수만 입력할 수 있어요.
                    </span>
                </div>
                <input
                    type='text'
                    value={enteredAmount}
                    onChange={amountChangeHandler}
                    placeholder='금액을 입력해주세요.'
                    maxLength='11'
                    required
                />
            </div>

            <div className='new-item__form-actions'>
                <button type='submit' className='btn-primary'>
                    등록
                </button>
                <button
                    type='button'
                    className='btn-secondary'
                    onClick={stopEditingHandler}
                >
                    취소
                </button>
            </div>
        </form>
    );
};

export default NewItemForm;