import React from 'react';
import { render } from '@testing-library/react';
import { About } from './About'; // Import your About component
import { BrowserRouter } from 'react-router-dom';

describe('About Component', () => {
  it('should render the About Us page', () => {
    const { getByText, getAllByText, getByTestId } = render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    // Check if the About Us page title is rendered
    const pageTitle = getByText('About Us');
    expect(pageTitle).toBeInTheDocument();

    // Check if contribution information is rendered
    const contributionHeaders = getAllByText('Our Contributions');
    expect(contributionHeaders).toHaveLength(1);

    // Check if the Effective Collaboration section is rendered
    const collaborationHeader = getByText('Effective Collaboration');
    expect(collaborationHeader).toBeInTheDocument();

    // Check if the RS School logo is rendered in a link tag
    const svgElement = getByTestId('rsSchoolLogo');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement.parentElement?.tagName).toBe('A');
  });
});
