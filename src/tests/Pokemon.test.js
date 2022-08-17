import React from 'react';
import { screen } from '@testing-library/react';
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

  it('O card do pokémon exibe um link de navegação "More details"', () => {
    renderWithRouter();

  })
});
