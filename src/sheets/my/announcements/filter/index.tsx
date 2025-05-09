import styles from './index.module.scss';

const tabs = [
    {
        id: 0,
        label: 'Actif (3)',
    },
    {
        id: 1,
        label: 'Actif (3)',
    },
    {
        id: 2,
        label: 'Service (2)',
    },
];

const Filter = () => {
    return (
        <div className={styles.root}>
            <p className={styles.title}>Mes annonces</p>
            <ul className={styles.tabs}>
                {tabs.map((tab) => (
                    <li key={tab.id}>{tab.label}</li>
                ))}
            </ul>
        </div>
    );
};

export default Filter;
