import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Teste do componente About', () => {
  it('O título da página é exibido', () => {
    renderWithRouter(<About />);

    const pageTitle = screen
      .getByRole('heading', { level: 2, name: /About Pokédex/i });

    expect(pageTitle).toBeInTheDocument();
  });

  it('São exibidos dois parágrafos com informações', () => {
    renderWithRouter(<About />);

    const paragraph1 = screen.getByText(/This application simulates a Pokédex, a */i);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type, and see */i);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('É exibida uma imagem correta da Pokédex', () => {
    renderWithRouter(<About />);

    const correctImgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const pokedexImg = screen.getByRole('img', { name: /Pokédex/i });

    expect(pokedexImg.src).toBe(correctImgSrc);
  });
});
