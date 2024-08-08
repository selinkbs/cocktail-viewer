// pages/about.js
import styles from '../styles/about.module.scss';
import { FaInstagram, FaEnvelope, FaTwitter } from 'react-icons/fa';  // Font Awesome iconları kullanıldı.

export default function About() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>About Us</h1>
        <p>Learn more about us...</p>
      </header>
      <main className={styles.content}>
        <section className={styles.section}>
          <h2>Our Mission</h2>
          <p>
            At Cocktail Viewer, our mission is to bring the art of cocktail making to enthusiasts and professionals alike. We aim to inspire creativity, enhance knowledge, and foster a community where cocktail lovers can connect, share, and explore the vibrant world of cocktails.
          </p>
        </section>
        <section className={styles.section}>
          <h2>Our Story</h2>
          <p>
            Cocktail Viewer was born out of a passion for mixology and a desire to make the world of cocktails accessible to everyone. Our founders, a group of cocktail aficionados, noticed a gap in the availability of comprehensive and user-friendly resources for cocktail enthusiasts. With this in mind, they set out to create a platform that would not only provide recipes but also educate and inspire.
          </p>
        </section>
        <section className={styles.section}>
          <h2>What We Offer</h2>
          <p>
            <strong>Extensive Recipe Collection:</strong> Our database features a wide range of cocktail recipes, from timeless classics to innovative new creations. Each recipe is carefully curated with detailed instructions and ingredient lists.
          </p>
          <p>
            <strong>Expert Tips and Tricks:</strong> Learn from the best with our educational content. Whether you are looking to perfect your shaking technique or want to understand the history of your favorite spirits, our articles and videos have you covered.
          </p>
          <p>
            <strong>Community Engagement:</strong> Join a vibrant community of cocktail lovers. Share your own recipes, exchange tips, and engage in discussions with fellow enthusiasts.
          </p>
          <p>
            <strong>User-Friendly Experience:</strong> Our platform is designed with you in mind. Enjoy seamless navigation, easy-to-follow recipes, and personalized features like the favorites list and cocktail basket.
          </p>
        </section>
        <section className={styles.section}>
          <h2>Our Values</h2>
          <p>
            <strong>Quality:</strong> We are committed to providing high-quality content that is accurate, detailed, and reliable.
          </p>
          <p>
            <strong>Creativity:</strong> We celebrate creativity in mixology and encourage our users to experiment and innovate.
          </p>
          <p>
            <strong>Community:</strong> We believe in the power of community and strive to create a welcoming and supportive environment for all cocktail lovers.
          </p>
        </section>
        <section className={styles.section}>
          <h2>Join Us</h2>
          <p>
            Whether you're a seasoned bartender or just starting your cocktail journey, Cocktail Viewer is here to support you. Explore our resources, get inspired, and join our community to share your passion for cocktails.
          </p>
          <p><strong>Cocktail Viewer – Your gateway to the world of cocktails!</strong></p>
        </section>
      </main>
      
      <footer className={styles.footer}>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
          <FaInstagram size={30} className={styles.icon} /> 
          <span>Follow us on Instagram</span>
        </a>
        <a href="selincansuakbas@gmail.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
          <FaEnvelope size={30} className={styles.icon} /> 
          <span>Contact us via Email</span>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
          <FaTwitter size={30} className={styles.icon} /> 
          <span>Follow us on Twitter</span>
        </a>
      </footer>
    </div>
  );
}
