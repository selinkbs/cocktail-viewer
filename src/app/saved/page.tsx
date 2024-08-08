// app/saved-cocktails/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons'; // Kayıt ikonu
import styles from '../styles/saved.module.scss'; // Stil dosyasının doğru yoldan import edildiğinden emin olun

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
}

export default function SavedCocktails() {
  const [savedCocktails, setSavedCocktails] = useState<Cocktail[]>([]);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [confirmMessage, setConfirmMessage] = useState<string>('');
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const router = useRouter();

 useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      router.push('/login');
    } else {
      const saved = localStorage.getItem('savedCocktails');
      if (saved) {
        setSavedCocktails(JSON.parse(saved));
      }
    }
  }, [router]);
  const openConfirm = (message: string, action: () => void) => {
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setShowConfirm(true);
  };

  const removeCocktail = (id: string) => {
    openConfirm('Do you want to remove this cocktail?', () => {
      const updatedCocktails = savedCocktails.filter(cocktail => cocktail.idDrink !== id);
      setSavedCocktails(updatedCocktails);
      localStorage.setItem('savedCocktails', JSON.stringify(updatedCocktails));
      setShowConfirm(false);
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>
        Saved Cocktails
        <FontAwesomeIcon icon={faBookmark} className={styles.icon} />
      </h1>
      <div className={styles.cocktailsList}>
        {savedCocktails.map((cocktail) => (
          <div key={cocktail.idDrink} className={styles.cocktailCard}>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <h2>{cocktail.strDrink}</h2>
            <button onClick={() => removeCocktail(cocktail.idDrink)}>Remove</button>
          </div>
        ))}
      </div>
      {showConfirm && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmBox}>
            <p>{confirmMessage}</p>
            <button onClick={confirmAction}>Yes</button>
            <button onClick={() => setShowConfirm(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}
