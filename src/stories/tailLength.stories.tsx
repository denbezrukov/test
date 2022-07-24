import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Table } from '../table/table';

import styles from './tailLength.module.css';
import { TextEllipsis } from '../textEllipsis/textEllipsis';

interface Props {
    leftText: string;
    rightText: string;
    tailLength: number;
    title: string;
}
const data = Array(20)
    .fill(1)
    .map((_, index) => index);

const TailLengthComponent = (props: Props) => {
    const { tailLength, leftText, rightText, title } = props;

    return (
        <div className={styles.container}>
            <Table>
                <>
                    {data.map(key => {
                        return (
                            <TextEllipsis
                                key={key}
                                className={
                                    key % 2 === 0 ? styles.even : styles.odd
                                }
                                tailLength={tailLength}
                                title={title}
                            >
                                {leftText}
                            </TextEllipsis>
                        );
                    })}
                </>
                <>
                    {data.map(key => {
                        return (
                            <TextEllipsis
                                key={key}
                                className={
                                    key % 2 === 0 ? styles.odd : styles.even
                                }
                                tailLength={tailLength}
                                title={title}
                            >
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
    title: 'some title',
};
