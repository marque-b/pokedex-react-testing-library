import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemonTypeBtns = ['Electric', 'Fire', 'Bug',
  'Poison', 'Psychic', 'Normal', 'Dragon'];

const pokemonUnique = 'pokemon-name';

describe('Testa o componente Pokedex', () => {
  it('O título do componente é exibido', () => {
    renderWithRouter(<App />);

    const pageTitle = screen
      .getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(pageTitle).toBeInTheDocument();
  });

  it('O botão "Próximo pokémon" é exibido', () => {
    renderWithRouter(<App />);

    const nextPokemonBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemonBtn).toBeInTheDocument();
  });

  it('Ao clicar em "Próximo pokémon", um novo pokémon é exibido', () => {
    renderWithRouter(<App />);

    const nextPokemonBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(nextPokemonBtn);

    const currentPokemonName = screen.getByTestId(pokemonUnique);
    expect(currentPokemonName.innerHTML).toBe('Charmander');
  });

  it('Ao clicar no botão do último pokémon a lista volta ao início', () => {
    renderWithRouter(<App />);

    const pokemonListLength = 9;

    const nextPokemonBtn = screen.getByRole('button', { name: /Próximo pokémon/i });

    for (let i = 0; i < pokemonListLength; i += 1) {
      userEvent.click(nextPokemonBtn);
    }
    const currentPokemonName = screen.getByTestId(pokemonUnique);
    expect(currentPokemonName.innerHTML).toBe('Pikachu');
  });

  it('É exibido apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const currentPokemonName = screen.getAllByTestId(pokemonUnique);

    expect(currentPokemonName).toHaveLength(1);
  });

  it('Os botões de filtro são exibidos corretamente', () => {
    renderWithRouter(<App />);

    const allButtons = screen.getAllByTestId('pokemon-type-button');
    allButtons.forEach((button) => {
      expect(pokemonTypeBtns).toContain(button.innerHTML);
      const allButton = screen.getByRole('button', { name: /All/i });
      expect(allButton).toBeInTheDocument();
    });
  });

  it('É possivel clicar no botão "All"', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /All/i });
    expect(allButton.disabled).toBe(false);
    userEvent.click(allButton);

    const currentPokemonName = screen.getByTestId(pokemonUnique);
    expect(currentPokemonName).toBeInTheDocument();
  });
});
