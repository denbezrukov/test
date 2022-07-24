import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Table } from '../table/table';

import styles from './textEllipsis.module.css';
import { TextEllipsis as Text } from '../textEllipsis/textEllipsis';

interface Props {
    leftText: string;
    rightText: string;
    tailLength: number;
    title: string;
}
const data = Array(20)
    .fill(1)
    .map((_, index) => index);

const TextEllipsisComponent = (props: Props) => {
    const { tailLength, leftText, rightText, title } = props;

    return (
        <div className={styles.container}>
            <Table>
                <>
                    {data.map(key => {
                        return (
                            <Text
                                key={key}
                                className={
                                    key % 2 === 0 ? styles.even : styles.odd
                                }
                                tailLength={tailLength}
                                title={title}
                            >
                                {leftText}
                            </Text>
                        );
                    })}
                </>
                <>
                    {data.map(key => {
                        return (
                            <Text
                                key={key}
                                className={
                                    key % 2 === 0 ? styles.odd : styles.even
                                }
                                tailLength={tailLength}
                                title={title}
                            >
                                {rightText}
                            </Text>
                        );
                    })}
                </>
            </Table>
        </div>
    );
};

export default {
    title: 'Example/TextEllipsis',
    component: TextEllipsisComponent,
} as ComponentMeta<typeof TextEllipsisComponent>;

const Template: ComponentStory<typeof TextEllipsisComponent> = args => (
    <TextEllipsisComponent {...args} />
);

export const TextEllipsis = Template.bind({});
TextEllipsis.args = {
    leftText:
        'Loremipsumdolorsitamet,consecteturadipiscingelit.Nullaultricies.',
    rightText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies.',
    tailLength: 20,
    title: 'some title',
};
