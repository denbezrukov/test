import React, { useState } from 'react';
import { TextEllipsis } from './textEllipsis/textEllipsis';
import { Table } from './table/table';

import styles from './app.module.css';

const data = Array(20)
    .fill(123)
    .map((_, index) => index);

const longTextWithoutSpaces =
    'Loremipsumdolorsitamet,consecteturadipiscingelit.Nullaultricies.';
const longTextWithSpaces =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies.';

export const App = () => {
    const [text, setText] = useState('123');

    return (
        <div className={styles.container}>
            <input
                value={text}
                onChange={event => setText(event.currentTarget.value)}
            />
            <div>tail length 20</div>
            <Table>
                <>
                    {data.map(key => {
                        return (
                            <TextEllipsis key={key} tailLength={20}>
                                {text}
                            </TextEllipsis>
                        );
                    })}
                </>
                <>
                    {data.map(key => {
                        return (
                            <TextEllipsis key={key} tailLength={20}>
                                {text}
                            </TextEllipsis>
                        );
                    })}
                </>
            </Table>

            <div>tail length 100</div>
            <Table>
                <>
                    {data.map(key => {
                        return (
                            <TextEllipsis key={key} tailLength={100}>
                                {longTextWithoutSpaces}
                            </TextEllipsis>
                        );
                    })}
                </>
                <>
                    {data.map(key => {
                        return (
                            <TextEllipsis key={key} tailLength={100}>
                                {longTextWithSpaces}
                            </TextEllipsis>
                        );
                    })}
                </>
            </Table>
            <div>tail length 20</div>
            <Table>
                <>
                    {data.map(key => {
                        return (
                            <TextEllipsis key={key} tailLength={20}>
                                {longTextWithoutSpaces}
                            </TextEllipsis>
                        );
                    })}
                </>
                <>
                    {data.map(key => {
                        return (
                            <TextEllipsis key={key} tailLength={20}>
                                {longTextWithSpaces}
                            </TextEllipsis>
                        );
                    })}
                </>
            </Table>
            <div>tail length 0</div>
            <Table>
                <>
                    {data.map(key => {
                        return (
                            <TextEllipsis key={key} tailLength={0}>
                                {longTextWithoutSpaces}
                            </TextEllipsis>
                        );
                    })}
                </>
                <>
                    {data.map(key => {
                        return (
                            <TextEllipsis key={key} tailLength={0}>
                                {longTextWithSpaces}
                            </TextEllipsis>
                        );
                    })}
                </>
            </Table>
        </div>
    );
};
