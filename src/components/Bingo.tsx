import React, { useState } from 'react'

export default function Bingo() {
    const checks: string[] = [
        'child noises in the backgroung',
        'Hello, hello?',
        'I need to jump in another call',
        'can everyone go on mute',
        'could you please get closer to the mic',
        'load painful echo / feedback',
        'Next slide please.',
        'can we take this offline?',
        'is ___ on the call?',
        'Could you share this slides afterwards?',
        'can somebody grant presenter rights?',
        'can you email that to everyone?',
        'CONF CALL BINGO',
        'sorry, I had problem logging in',
        '(animal noises in the background)',
        "sorry, i didn't found the conference id",
        'i was having connection issues',
        "i'll have to get back to you",
        'who just joined?',
        'sorry, something __ with calendar',
        'do you see my screen?',
        "let's wait for __",
        'you will send the minutes?',
        'sorry, i was on mute.',
        'can you repeat please?'
    ]

    checks.sort(() => 0.5 - Math.random());
    const [content, setContent] = useState(checks);
    const [state, setState] = useState<any>({ checked: { 12: true } });

    const activeToggle = (el: number) => {
        if (el === 12) {
            return;
        }
        setState((state: any) => {
            const checked = { ...state.checked, [el]: !state.checked[el] };
            const won = isWon(checked);
            return {
                ...state,
                checked,
                won
            };
        })
    }

    const isWon = (checked: any) => {
        const range = [0, 1, 2, 3, 4];
        return (
            undefined !==
            range.find((row) =>
                range.every((column) => checked[row * 5 + column])
            ) ||
            undefined !==
            range.find((column) =>
                range.every((row) => checked[row * 5 + column])
            ) ||
            range.every((index) => checked[index * 5 + index]) ||
            range.every((index) => checked[index * 5 + 4 - index])
        );
    };

    return (
        <div className='Container'>
            <div className={state.won ? "rotate" : "bingoBox"} >
                {
                    content ? content.map((it: any, i: any) => {
                        return <div key={i} className={i === 12 ? 'card free' : state.checked[i] ? 'card active' : 'card'} onClick={(e: any) => activeToggle(i)}>
                            {i === 12 ? <p className='frees'>Free</p> : <p className={state.checked[i] ? 'top' : ''}></p>}
                            <p className='text'>{it}</p>
                        </div>
                    }) : null
                }
            </div>
        </div>
    )
}
