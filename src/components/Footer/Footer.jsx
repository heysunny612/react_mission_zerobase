import styles from './Footer.module.css';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaCcDinersClub,
  FaCcDiscover,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsGithub } from 'react-icons/bs';
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        <Link to='/'>React Shop</Link>
      </p>
      <ul>
        <li>
          <FaCcVisa />
        </li>
        <li>
          <FaCcMastercard />
        </li>
        <li>
          <FaCcAmex />
        </li>
        <li>
          <FaCcPaypal />
        </li>
        <li>
          <FaCcDinersClub />
        </li>
        <li>
          <FaCcDiscover />
        </li>
      </ul>
      <ul>
        <li>
          <a href='#'>
            <BsFacebook />
          </a>
        </li>
        <li>
          <a href='#'>
            <BsInstagram />
          </a>
        </li>
        <li>
          <a href='#' target='_blank' rel='noreferrer'>
            <BsGithub />
          </a>
        </li>
      </ul>
      <p>Copyright © 2023 Hwang Su Yeon</p>
    </footer>
  );
}
