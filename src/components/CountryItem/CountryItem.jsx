import styles from "./CountryItem.module.css";

function CountryItem( { countryObj } ) {

  const { country, emoji } = countryObj
  return (
    <li className={ styles.countryItem }>
      <img src={ emoji } alt={ country }></img>
      <span>{ country }</span>
    </li>
  );
}

export default CountryItem;
