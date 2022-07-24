import { Table } from './table/table';

import styles from './app.module.css';
import { FlexTextEllipsis } from './flexTextEllipsis/flexTextEllipsis';

const data = Array(10)
    .fill(123)
    .map((_, index) => index);

const longTextWithoutSpaces =
    'Loremipsumdolorsitamet,consecteturadipiscingelit.Nullaultricies.';
const longTextWithSpaces =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies.';

export const App = () => {
    return (
        <div className={styles.container}>
            <Table>
                <>
                    {data.map(key => {
                        return (
                            <FlexTextEllipsis key={key} tailLength={10}>
                                {longTextWithoutSpaces}
                            </FlexTextEllipsis>
                        );
                    })}
                </>
                <>
                    {data.map(key => {
                        return (
                            <FlexTextEllipsis key={key} tailLength={10}>
                                {longTextWithSpaces}
                            </FlexTextEllipsis>
                        );
                    })}
                </>
            </Table>
        </div>
    );
};
