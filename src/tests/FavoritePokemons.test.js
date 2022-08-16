import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../pages';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste do componente FavoritesPokemons', () => {
  it('É exibida a mensagem quando não há Pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const pageTitle = screen
      .getByRole('heading', { level: 2, name: /Favorite pokémons/i });
    const message = screen.getByText(/No favorite pokemon found/i);

    expect(pageTitle).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it('É exibido o pokémon card corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsBtn = screen.getByRole('link', { name: /More details/i });

    userEvent.click(moreDetailsBtn);

    const favoriteCheckbox = screen
      .getByRole('checkbox', { name: /Pokémon favoritado/i });

    userEvent.click(favoriteCheckbox);

    history.push('/favorites');

    const pokemonImg = screen
      .getByRole('img', { name: /Pikachu is marked as favorite/i });

    expect(pokemonImg).toBeInTheDocument();
  });
});
