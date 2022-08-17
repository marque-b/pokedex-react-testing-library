import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do componente App.js', () => {
  it('O topo da aplicação possui um conjunto de links', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();

    const favoritesLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritesLink).toBeInTheDocument();
  });

  it('Ao clicar no link Home é redirecionada para a rota "/"', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  it('Ao clicar no link About é redirecionada para a rota "/about"', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /About/i });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  it('Ao clicar no link Favorite Pokémons é redirecionada para "/favorites"', () => {
    const { history } = renderWithRouter(<App />);

    const favoritesLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoritesLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('É redirecionada para a página "Not Found" ao inserir rota inválida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/paginaInexistente');

    const notFoundTitle = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/i });

    expect(notFoundTitle).toBeInTheDocument();
  });
});
