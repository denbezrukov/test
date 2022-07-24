import React from 'react';
import { render, screen } from '@testing-library/react';
import { TextEllipsis } from './textEllipsis';

describe('TextEllipsis', () => {
    test('should render text which pass as children', () => {
        render(<TextEllipsis tailLength={10}>some text</TextEllipsis>);
        const textElement = screen.getByTestId('text-ellipsis');

        expect(textElement).toBeInTheDocument();
        expect(textElement).toHaveTextContent('some text');
    });

    test('should use passed className and combine it with container class', () => {
        render(
            <TextEllipsis className="my-class-name" tailLength={10}>
                some text
            </TextEllipsis>,
        );
        const textElement = screen.getByTestId('text-ellipsis');

        expect(textElement).toBeInTheDocument();
        expect(textElement).toHaveAttribute('class', 'my-class-name container');
    });

    test('should split text into two parts by tailLength', async () => {
        const { rerender } = render(
            <TextEllipsis tailLength={3}>this is long text</TextEllipsis>,
        );
        const headElement = screen.getByTestId('text-ellipsis-head');
        const tailElement = screen.getByTestId('text-ellipsis-tail');

        expect(headElement).toBeInTheDocument();
        expect(headElement).toHaveTextContent('this is long t');

        expect(tailElement).toBeInTheDocument();
        expect(tailElement).toHaveTextContent('ext');

        rerender(
            <TextEllipsis tailLength={10}>this is long text</TextEllipsis>,
        );

        expect(headElement).toBeInTheDocument();
        expect(headElement).toHaveTextContent('this is');

        expect(tailElement).toBeInTheDocument();
        expect(tailElement).toHaveTextContent('long text');
    });

    test('should have only head if tail length is 0', async () => {
        render(
            <TextEllipsis tailLength={0}>this is long text</TextEllipsis>,
        );
        const headElement = screen.getByTestId('text-ellipsis-head');
        const tailElement = screen.queryByTestId('text-ellipsis-tail');

        expect(tailElement).not.toBeInTheDocument();
        expect(headElement).toBeInTheDocument();
        expect(headElement).toHaveTextContent('this is long text');
    });

    test('should have only tail if tail length is greater than text', async () => {
        render(
            <TextEllipsis tailLength={100}>this is long text</TextEllipsis>,
        );
        const headElement = screen.queryByTestId('text-ellipsis-head');
        const tailElement = screen.getByTestId('text-ellipsis-tail');

        expect(headElement).not.toBeInTheDocument();
        expect(tailElement).toBeInTheDocument();
        expect(tailElement).toHaveTextContent('this is long text');
    });
});
