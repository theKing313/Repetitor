import Image from 'next/image';
import styles from './index.module.scss';

const Discount = () => {
    return (
        <div className={styles.root}>
            <Image src={'/panel/images/profile/discount.svg'} width={52} height={40} alt="discount" />
            <p>
                Les ventes vous ont rapporté: <span>1 200 DZD</span>
            </p>
        </div>
    );
};

export default Discount;
