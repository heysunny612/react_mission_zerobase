import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Loading() {
  return (
    <ul>
      <li>
        <Skeleton count={3} />
      </li>
      <li>
        <div>
          <Skeleton height={30} />
        </div>
      </li>
    </ul>
  );
}
