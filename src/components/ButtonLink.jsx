import { Link } from "react-router-dom";

const ButtonLink = ({ to, children }) => {
  return (
    <button>
      <Link className="button-link" to={to}>
        {children}
      </Link>
    </button>
  );
};

export default ButtonLink;
