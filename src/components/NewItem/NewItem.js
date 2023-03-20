import React from 'react';
import NewItemForm from './NewItemForm.js';
import './NewItemForm.css'

const NewItem = () => {
    return (
        <div className='new-item'>
            <h1>내역 추가</h1>
            <NewItemForm />
        </div>
    );
}

export default NewItem;