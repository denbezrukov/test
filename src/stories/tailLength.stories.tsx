import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Table } from '../table/table';

import styles from './tailLength.module.css';
import { FlexTextEllipsis } from '../flexTextEllipsis/flexTextEllipsis';

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
        <div className={styles.container}>
            <Table>
                <>
                    {data.map(key => {
                        return (
                            <FlexTextEllipsis
                                key={key}
                                className={
                                    key % 2 === 0 ? styles.even : styles.odd
                                }
                                tailLength={tailLength}
                            >
                                {leftText}
                            </FlexTextEllipsis>
                        );
                    })}
                </>
                <>
                    {data.map(key => {
                        return (
                            <FlexTextEllipsis
                                key={key}
                                className={
                                    key % 2 === 0 ? styles.odd : styles.even
                                }
                                tailLength={tailLength}
                            >
                                {rightText}
                            </FlexTextEllipsis>
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
