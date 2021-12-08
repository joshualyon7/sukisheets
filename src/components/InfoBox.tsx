import React from 'react';
import '../css/InfoBox.css';


export function InfoBox({title, value, children}: {title: string, value?: string | number, children?: JSX.Element}) {
    return (
        <div className='info-box raised-pane'>
            <div className='info-box raised-pane'>
                <div>{value ? `${value}` : children}</div>
                <div className='info-box-title'>{title}</div>
            </div>
        </div>
    );
}
