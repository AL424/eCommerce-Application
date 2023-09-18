import michaelScottImg from '../../assets/michaelscott.jpg';
import jimHalpertImg from '../../assets/jimhalpert.jpg';
import egorImg from '../../assets/egorberezhnov.jpg';

const teamMembersData = [
  {
    name: 'Alexander',
    role: 'Frontend-Developer, Team Lead',
    bio: "Alexander is our visionary leader and chief problem solver. With a passion for innovation and a knack for solving complex technical challenges, he's the driving force behind our projects. Alexander's leadership skills have been instrumental in our team's success",
    img: michaelScottImg,
    githubLink: 'https://github.com/al424'
  },
  {
    name: 'Dmitriy',
    role: 'Frontend-Developer',
    bio: "Dmitriy is a frontend wizard who turns design concepts into stunning user interfaces. His attention to detail and commitment to creating user-friendly experiences are unmatched. Dmitriy's extensive experience in web development have been instrumental in our team's success",
    img: jimHalpertImg,
    githubLink: 'https://github.com/dmitriyrim'
  },
  {
    name: 'Egor Berezhnov',
    role: 'Frontend-Developer',
    bio: "Egor is the mastermind behind our coordinated efforts. He has successfully assembled and led our team to successful completion of the project. Egor ensures everyone is in sync, and helps coordinate our actions. His commitment to teamwork and communication has been a driving force in our project's success.",
    img: egorImg,
    githubLink: 'https://github.com/ygrcore'
  }
];

export const teamTasksData = [
  {
    name: 'Alexander',
    tasks: [
      'Repository Setup',
      'Task Board Setup',
      'CommerceTools Project and API Client Setup',
      'User Profile Page Implementation',
      'Basket Page Implementation'
    ]
  },
  {
    name: 'Dmitriy',
    tasks: [
      'Development Environment Configuration',
      'Development Scripts',
      'State Management, Automatic Login, and Redirection',
      'Routing Implementation',
      'Catalog Page Implementation'
    ]
  },
  {
    name: 'Egor Berezhnov',
    tasks: [
      'Structure and Organize a React Application',
      'Login Page Implementation',
      'Registration Page Implementation',
      'Detailed Product Page Implementation',
      'About Us Page Implementation'
    ]
  }
];

export default teamMembersData;
