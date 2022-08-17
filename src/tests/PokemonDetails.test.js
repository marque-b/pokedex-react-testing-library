import React from 'react';
import { getAllByAltText, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const pikachuPage = '/pokemons/25';

describe('Testa o componente PokemonDetails', () => {
  it('O título da página é exibido corretamente', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuPage);

    const pageTitle = screen.getByRole('heading', { level: 2, name: /Pikachu details/i });
    expect(pageTitle).toBeInTheDocument();
  });

  it('Os links são exibidos corretamente', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuPage);

    const correctLinks = ['Home', 'About', 'Favorite Pokémons'];
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(correctLinks).toContain(link.innerHTML);
    });
  });

  it('O heading com o texto "Summary" é exibido', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuPage);

    const summary = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(summary).toBeInTheDocument();
  });

  it('A seção exibe um parágrafo descritivo do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuPage);

    const paragraph = screen.getByText(/This intelligent Pokémon roasts hard/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('Os mapas com localização dos pokémons é exibido corretamente', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuPage);

    const sectionTitle = screen
      .getByRole('heading', { level: 2, name: /Game Locations of Pikachu/i });
    expect(sectionTitle).toBeInTheDocument();

    const maps = screen.getAllByAltText('Pikachu location');
    maps.forEach((mapImage) => {
      expect(mapImage.src).toContain('https://cdn2.bulbagarden.net/');
    });
  });

  it('Testa a função do checkbox de favoritos', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuPage);

    const favoriteCheckbox = screen
      .getByRole('checkbox', { name: /Pokémon favoritado/i });
    expect(favoriteCheckbox.checked).toBe(false);
    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toBe(true);
  });
});
