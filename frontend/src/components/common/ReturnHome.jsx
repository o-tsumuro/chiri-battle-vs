import { Link } from 'react-router-dom';

const ReturnHome = ({ label }) => {
  return (
    <Link to="/">{label}</Link>
  )
};

export default ReturnHome;