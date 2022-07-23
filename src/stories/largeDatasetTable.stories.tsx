import { useMemo } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Table } from '../table/table';
import { TextEllipsis } from '../textEllipsis/textEllipsis';

import styles from './largeDatasetTable.module.css';

const longTextWithoutSpaces =
    'Loremipsumdolorsitamet,consecteturadipiscingelit.Nullaultricies.';
const longTextWithSpaces =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies.';

interface Props {
    length: number;
}

const LargeTableComponent = (props: Props) => {
    const { length } = props;

    const data = useMemo(() => {
        return Array(length)
            .fill(1)
            .map((_, index) => index);
    }, [length]);

    return (
        <div className={styles.container}>
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
        </div>
    );
};

export default {
    title: 'Example/LargeDataset',
    component: LargeTableComponent,
} as ComponentMeta<typeof LargeTableComponent>;

const Template: ComponentStory<typeof LargeTableComponent> = args => (
    <LargeTableComponent {...args} />
);

export const LargeDataset = Template.bind({});
LargeDataset.args = {
    length: 2000,
};
