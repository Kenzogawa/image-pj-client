import styles from '../../styles/Item.module.css';
import Image from 'next/image';

export default function Item({ name, img, thum }) {
  return (
    <div className={styles.item}>
      <a target='_blank' href={`/images/${img}.png`} rel='noreferrer noopener'>
        <h1 className={styles.h1}>{name}</h1>
        <Image
          className={styles.img}
          src={`/images/${thum}.png`}
          width={364}
          height={457}
          alt={name}
          layout={'fixed'}
          objectFit={'contain'}
          priority={true}
        />
      </a>
    </div>
  );
}
