import './Home.css';
import solidLogo from '../../assets/solid.svg';
import viteLogo from '/vite.svg'

const Home = () => {

  return (
    <nav className='flex'>
    <a href="#/jd" className="app-link">
      <img src={solidLogo} alt="JD Icon" className="app-icon" />
      JD
    </a>
    <a href="#/manki" className="app-link">
      <img src={viteLogo} alt="Manki Icon" className="app-icon" />
      Manki
    </a>
</nav>
  );
};

export default Home;
