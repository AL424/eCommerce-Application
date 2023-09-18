import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from './Footer';
import teamMembersData from '../../pages/About/About.constants';

describe('Footer component', () => {
  it('should render the logo', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const logoElement = getByAltText('The Wonderful World');
    expect(logoElement).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const mainLink = getByText('Main');
    const catalogLink = getByText('Catalog');
    const aboutLink = getByText('About us');

    expect(mainLink).toBeInTheDocument();
    expect(catalogLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  });

  it('should render GitHub links for team members', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const githubLink1 = getByText(teamMembersData[0].name);
    const githubLink2 = getByText(teamMembersData[1].name);
    const githubLink3 = getByText(teamMembersData[2].name);

    expect(githubLink1).toBeInTheDocument();
    expect(githubLink2).toBeInTheDocument();
    expect(githubLink3).toBeInTheDocument();
  });

  it('should render the RSSchool logo', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const rsschoolLogo = getByTestId('rsSchoolLogo');
    expect(rsschoolLogo).toBeInTheDocument();
  });

  it('should render the copyright year', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const copyrightText = getByText('© 2023');
    expect(copyrightText).toBeInTheDocument();
  });
});
