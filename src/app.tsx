import { Table } from './table/table';

import styles from './app.module.css';
import { TextEllipsis } from './textEllipsis/textEllipsis';

const data = Array(1)
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
                            <TextEllipsis key={key} tailLength={17}>
                                {longTextWithoutSpaces}
                            </TextEllipsis>
                        );
                    })}
                </>
                <>
                    {data.map(key => {
                        return (
                            <TextEllipsis key={key} tailLength={17}>
                                {longTextWithSpaces}
                            </TextEllipsis>
                        );
                    })}
                </>
            </Table>
        </div>
    );
};
