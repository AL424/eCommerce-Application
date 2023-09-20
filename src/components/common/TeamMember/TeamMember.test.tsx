import React from 'react';
import { render, screen } from '@testing-library/react';
import TeamMember from './TeamMember';

// Тесты для компонента TeamMember
describe('TeamMember Component', () => {
  const testProps = {
    name: 'John Doe',
    role: 'Developer',
    bio: 'A talented developer',
    img: 'john-doe.jpg',
    githubLink: 'https://github.com/johndoe'
  };

  it('renders the team member name, role, and bio', () => {
    render(<TeamMember {...testProps} />);

    // Check name, role, bio displayed on page
    expect(screen.getByText(testProps.name)).toBeInTheDocument();
    expect(screen.getByText(testProps.role)).toBeInTheDocument();
    expect(screen.getByText(testProps.bio)).toBeInTheDocument();
  });

  it('displays the team member image with alt text', () => {
    render(<TeamMember {...testProps} />);

    // Check for images have alt attribuute
    const imgElement = screen.getByAltText(testProps.name);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', testProps.img);
  });

  it('renders the GitHub link', () => {
    render(<TeamMember {...testProps} />);

    // Check gh link displayed and contain valid URL
    const githubLink = screen.getByText('GitHub');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', testProps.githubLink);
  });
});
