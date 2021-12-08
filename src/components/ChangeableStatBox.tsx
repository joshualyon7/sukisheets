import React from 'react';
import '../css/ChangeableStatBox.css';

function handleStatDClick(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    const target = e.target as HTMLInputElement;
    target.readOnly = false;
}

export function ChangeableStatBox({title, value, onChange, className}: {
    title: string,
    value: number | string,
    onChange: (e: React.FocusEvent<HTMLInputElement, Element>) => void,
    className?: string}) {

    return (
        <div className={className}>
            <input className='stat-input center-input'
                value={value}
                title={title}
                type ='string'
                readOnly
                onDoubleClick={handleStatDClick}
                onBlur={onChange}
            />
        </div>
    );

}
