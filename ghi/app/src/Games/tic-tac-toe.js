import { useState } from 'react';

function Square() {
    const [value, setValue] = useState(null);

    function handleClick() {
        setValue('X');
    }
    return (
        <button 
            className="btn btn-dark btn-outline-info btn-lg" 
            onClick={handleClick}
        >
            {value}
        </button>
    );
}


export default function Board() {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div>
            <div className="d-flex justify-content-center">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="d-flex justify-content-center">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="d-flex justify-content-center">
                <Square />
                <Square />
                <Square />
            </div>
            </div>
        </div>
      </>
    );
  }
