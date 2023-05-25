import { Link } from 'react-router-dom';

export default function Breadcrumbs({ breadcrumbs }) {
  return (
    <ul>
      <li>
        <Link to='/'>홈</Link>
      </li>
      {breadcrumbs &&
        breadcrumbs.map((breadcrumb, index) => (
          <li key={index}>{breadcrumb}</li>
        ))}
    </ul>
  );
}
