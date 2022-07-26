import React from 'react';
import { render, screen } from '@testing-library/react';
import { TextEllipsis } from './textEllipsis';

describe('TextEllipsis', () => {
    test('should render text which pass as children', () => {
        render(<TextEllipsis tailLength={10}>some text</TextEllipsis>);
        const textElement = screen.getByTestId('text-ellipsis');

        expect(textElement).toBeInTheDocument();
        expect(textElement).toHaveTextContent(/^some text$/);
    });

    test('should use passed className', () => {
        render(
            <TextEllipsis className="my-class-name" tailLength={10}>
                some text
            </TextEllipsis>,
        );
        const textElement = screen.getByTestId('text-ellipsis');

        expect(textElement).toBeInTheDocument();
        expect(textElement).toHaveClass('my-class-name');
    });

    test('should split text into two parts by tailLength', async () => {
        const { rerender } = render(
            <TextEllipsis tailLength={3}>123456789</TextEllipsis>,
        );
        const innerContainer = screen.getByTestId('text-ellipsis-inner');

        expect(innerContainer).toBeInTheDocument();
        expect(innerContainer).toHaveAttribute('data-head', '123456');
        expect(innerContainer).toHaveAttribute('data-tail', '789');

        rerender(<TextEllipsis tailLength={10}>1234567891011</TextEllipsis>);

        expect(innerContainer).toBeInTheDocument();
        expect(innerContainer).toHaveAttribute('data-head', '123');
        expect(innerContainer).toHaveAttribute('data-tail', '4567891011');
    });

    test('should have only head if tail length is 0', async () => {
        render(<TextEllipsis tailLength={0}>this is long text</TextEllipsis>);
        const innerContainer = screen.getByTestId('text-ellipsis-inner');

        expect(innerContainer).toBeInTheDocument();
        expect(innerContainer).toHaveAttribute(
            'data-head',
            'this is long text',
        );
        expect(innerContainer).toHaveAttribute('data-tail', '');
    });

    test('should have only tail if tail length is greater than text', async () => {
        render(<TextEllipsis tailLength={100}>this is long text</TextEllipsis>);
        const innerContainer = screen.getByTestId('text-ellipsis-inner');

        expect(innerContainer).toBeInTheDocument();
        expect(innerContainer).toHaveAttribute('data-head', '');
        expect(innerContainer).toHaveAttribute(
            'data-tail',
            'this is long text',
        );
    });
});
