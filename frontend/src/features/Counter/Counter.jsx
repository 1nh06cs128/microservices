import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount, decrementByAmount } from '../../slices/counterSlice';
import React, { useState } from 'react';

const Counter = () => {

    const [incrementAmount, setIncrementAmount] = useState(0);
    const byValue = Number(incrementAmount) || 0;
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    const resetAll = () => {
        setIncrementAmount(0);
        dispatch(reset());
    }

    return (
        <section>
            <p>{count}</p>
            <div className="counter">
                <button onClick={() => dispatch(increment())}>+</button>
                <button onClick={() => dispatch(decrement())}>-</button>
                <input
                    type='text'
                    value={incrementAmount}
                    onChange={
                        (e) => setIncrementAmount(e.target.value)
                    }
                />
                <button onClick={() => dispatch(incrementByAmount(byValue))}>++</button>
                <button onClick={() => dispatch(decrementByAmount(byValue))}>--</button>

                <button onClick={resetAll}>Reset</button>
            </div>
        </section>
    )
}

export default Counter;