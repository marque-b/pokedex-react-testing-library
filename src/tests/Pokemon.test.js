import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Pokemon', () => {
  it('Todas as informações do pokémon são renderizadas corretamente', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');

    const pokemonImg = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(pokemonImg).toBeInTheDocument();
  });

  it('O card do pokémon exibe um link de navegação "More details"', async () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /More details/i });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('É exibido o ícone de estrela na página de favoritos', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetailsLink);
    const favorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(favorite);

    history.push('/favorites');

    const pokemonImg = screen.getByRole('img', { name: /Pikachu sprite/i });
    const starIcon = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(pokemonImg.src).toContain('https://cdn2.bulbagarden.net/');
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toContain('/star-icon.svg');
  });
});
