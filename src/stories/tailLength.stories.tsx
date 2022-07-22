import React, { useMemo } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Table } from '../table/table';
import { TextEllipsis } from '../textEllipsis/textEllipsis';

interface Props {
    leftText: string;
    rightText: string;
    tailLength: number;
}
const data = Array(20)
    .fill(1)
    .map((_, index) => index);

const TailLengthComponent = (props: Props) => {
    const { tailLength, leftText, rightText } = props;

    return (
        <div
            style={{
                display: 'flex',
                overflow: 'hidden',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Table>
                <>
                    {data.map(key => {
                        return (
                            <TextEllipsis key={key} tailLength={tailLength}>
                                {leftText}
                            </TextEllipsis>
                        );
                    })}
                </>
                <>
                    {data.map(key => {
                        return (
                            <TextEllipsis key={key} tailLength={tailLength}>
                                {rightText}
                            </TextEllipsis>
                        );
                    })}
                </>
            </Table>
        </div>
    );
};

export default {
    title: 'Example/TailLength',
    component: TailLengthComponent,
} as ComponentMeta<typeof TailLengthComponent>;

const Template: ComponentStory<typeof TailLengthComponent> = args => (
    <TailLengthComponent {...args} />
);

export const TailLength = Template.bind({});
TailLength.args = {
    leftText:
        'Loremipsumdolorsitamet,consecteturadipiscingelit.Nullaultricies.',
    rightText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies.',
    tailLength: 20,
};
