import 'boxicons'
import "./styles.scss";
import React, { useEffect, useRef, useState } from 'react';


export default function CreateDialog(props) {
    const {disable} = props
    return (
        <div className= {`dialog ${!disable && `disable` }` }>
            <div 
            className='dialog__children'>
                {props.children}
            </div>
        </div>
    )
}