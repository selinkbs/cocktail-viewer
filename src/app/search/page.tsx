// app/search.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  [key: string]: string | undefined; // To handle dynamic ingredient and measure properties
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [randomCocktails, setRandomCocktails] = useState<Cocktail[]>([]);
  const [basket, setBasket] = useState<Cocktail[]>([]);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [confirmMessage, setConfirmMessage] = useState<string>('');
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const router = useRouter();

  // Fetch random cocktails when the component mounts
  useEffect(() => {
    fetchRandomCocktails();
  }, []);

  const fetchRandomCocktails = async () => {
    try {
      const promises = Array.from({ length: 5 }, () =>
        fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php').then(res => res.json())
      );
      const results = await Promise.all(promises);
      const cocktailsData = results.map(result => result.drinks[0]);
      setRandomCocktails(cocktailsData);
    } catch (error) {
      console.error('Error fetching random cocktails:', error);
    }
  };

  // Fetch cocktails based on search term
  const handleSearch = async () => {
    if (searchTerm.trim() === '') return;

    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const data = await response.json();
      setCocktails(data.drinks || []);
      setRandomCocktails([]); // Clear random cocktails when search results are displayed
    } catch (error) {
      console.error('Error fetching cocktails:', error);
    }
  };

  // Trigger search on Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Open confirmation dialog
  const openConfirm = (message: string, action: () => void) => {
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setShowConfirm(true);
  };

  // Add cocktail to basket with confirmation
  const addToBasket = (cocktail: Cocktail) => {
    openConfirm(`Do you want to add ${cocktail.strDrink} to the basket?`, () => {
      setBasket(prevBasket => [...prevBasket, cocktail]);
      setShowConfirm(false);
    });
  };

  // Save basket with confirmation
  const saveBasket = () => {
    openConfirm('Do you want to save the basket?', () => {
      localStorage.setItem('savedCocktails', JSON.stringify(basket));
      setBasket([]);
      setShowConfirm(false);
      router.push('/saved');
    });
  };

  // Function to get ingredients and measures
  const getIngredients = (cocktail: Cocktail) => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      const measure = cocktail[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${ingredient}${measure ? ` - ${measure}` : ''}`);
      }
    }
    return ingredients;
  };

  return (
    <main className="container">
      <h1 className="search-header">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        Search for Cocktails
      </h1>
      <input
        type="text"
        placeholder="Enter cocktail name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>Search</button>

      {randomCocktails.length > 0 && (
        <>
          <h2>Random Cocktails</h2>
          <div className="cocktailsList">
            {randomCocktails.map(cocktail => (
              <div key={cocktail.idDrink} className="cocktailCard">
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                <h2>{cocktail.strDrink}</h2>
                <p>{cocktail.strInstructions}</p>
                <h3>Ingredients:</h3>
                <ul>
                  {getIngredients(cocktail).map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <button onClick={() => addToBasket(cocktail)}>Add to Basket</button>
              </div>
            ))}
          </div>
        </>
      )}

      {cocktails.length > 0 && (
        <>
          <h2>Search Results</h2>
          <div className="cocktailsList">
            {cocktails.map(cocktail => (
              <div key={cocktail.idDrink} className="cocktailCard">
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                <h2>{cocktail.strDrink}</h2>
                <p>{cocktail.strInstructions}</p>
                <h3>Ingredients:</h3>
                <ul>
                  {getIngredients(cocktail).map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <button onClick={() => addToBasket(cocktail)}>Add to Basket</button>
              </div>
            ))}
          </div>
        </>
      )}

      {basket.length > 0 && (
        <div className="basket">
          <h2>Basket</h2>
          <div className="basket-items">
            {basket.map(cocktail => (
              <div key={cocktail.idDrink} className="basket-item">
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                <span>{cocktail.strDrink}</span>
              </div>
            ))}
          </div>
          <button onClick={saveBasket}>Save Basket</button>
        </div>
      )}

      {showConfirm && (
        <div className="confirmOverlay">
          <div className="confirmBox">
            <p>{confirmMessage}</p>
            <button onClick={confirmAction}>Yes</button>
            <button onClick={() => setShowConfirm(false)}>No</button>
          </div>
        </div>
      )}
    </main>
  );
}
