import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  path: string;
  label: string;
}

const LinkButton = ({ path, label }: Props) => {
  return (
    <Link to={path} className="button-primary mb-6 inline-block">
      {label}
    </Link>
  );
};

export default LinkButton;
