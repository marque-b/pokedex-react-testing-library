import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente NotFound', () => {
  it('O título da página é exibido', () => {
    renderWithRouter(<NotFound />);

    const pageTitle = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/i });

    expect(pageTitle).toBeInTheDocument();
  });

  it('É exibida uma imagem correta', () => {
    renderWithRouter(<NotFound />);

    const correctImgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const pikachuImg = screen.getByRole(
      'img', { name: /Pikachu crying because the page requested was not found/i },
    );

    expect(pikachuImg.src).toBe(correctImgSrc);
  });
});
