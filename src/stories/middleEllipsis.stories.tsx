import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Table } from '../table/table';

import styles from './middleEllipsis.module.css';
import { TextMiddleEllipsis } from '../textMiddleEllipsis/textMiddleEllipsis';

interface Props {
    leftText: string;
    rightText: string;
}
const data = Array(20)
    .fill(1)
    .map((_, index) => index);

const MiddleEllipsisComponent = (props: Props) => {
    const { leftText, rightText } = props;

    return (
        <div className={styles.container}>
            <Table>
                <>
                    {data.map(key => {
                        return (
                            <TextMiddleEllipsis key={key}>
                                {leftText}
                            </TextMiddleEllipsis>
                        );
                    })}
                </>
                <>
                    {data.map(key => {
                        return (
                            <TextMiddleEllipsis key={key}>
                                {rightText}
                            </TextMiddleEllipsis>
                        );
                    })}
                </>
            </Table>
        </div>
    );
};

export default {
    title: 'Example/MiddleEllipsis',
    component: MiddleEllipsisComponent,
} as ComponentMeta<typeof MiddleEllipsisComponent>;

const Template: ComponentStory<typeof MiddleEllipsisComponent> = args => (
    <MiddleEllipsisComponent {...args} />
);

export const MiddleEllipsis = Template.bind({});
MiddleEllipsis.args = {
    leftText:
        'Loremipsumdolorsitamet,consecteturadipiscingelit.Nullaultricies.',
    rightText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies.',
};
