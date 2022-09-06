import styles from './buttonImages.module.scss';
import favouriteStar from '../assets/favouriteStar.png'
import thrash from '../assets/remove.png'

export const addImage = `<img src=${favouriteStar} class=${styles.image}></img>`
export const removeImage = `<img src=${thrash} class=${styles.image}></img>`
