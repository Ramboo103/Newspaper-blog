import { Pagination } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';

type PropsPagination = {
	totalCount: number;
	limit: number;
};

export default function PaginationComponent({
	totalCount,
	limit,
}: PropsPagination) {
	const navigate = useNavigate();
	const location = useLocation();
	const pathSegments = location.pathname.split('/').filter(Boolean);
	const current: number =
		parseInt(pathSegments[pathSegments.length - 1]) || 1;

	const totalPage = Math.ceil(totalCount / limit);

	const pageItems = [];
	for (let i = 1; i <= totalPage; i++) {
		if (current + 1 === i || current - 1 === i || current === i) {
			pageItems.push(i);
		}
		if (current + 2 === i || current - 2 === i) {
			pageItems.push('...');
		}
	}

	const onClick = (a: number): void => {
		const idx: number = pathSegments.findIndex(
			(item) => parseInt(item) === current,
		);

		const pathSegmentsCopy = [...pathSegments];

		if (idx === -1) {
			pathSegmentsCopy.push(a.toString());
		} else {
			pathSegmentsCopy[idx] = a.toString();
		}

		const newPath: string = '/' + pathSegmentsCopy.join('/');
		navigate(newPath);
	};

	return (
		<Pagination>
			{current > 1 ? (
				<Pagination.First onClick={() => onClick(1)} />
			) : (
				<></>
			)}
			{current > 1 ? (
				<Pagination.Prev onClick={() => onClick(current - 1)} />
			) : (
				<></>
			)}

			{pageItems.map((item, index) => (
				<Pagination.Item
					key={index}
					active={item === current}
					disabled={item === '...'}
					onClick={() =>
						typeof item === 'number' && item !== current
							? onClick(item)
							: null
					}
				>
					{item}
				</Pagination.Item>
			))}

			{current < totalPage ? (
				<Pagination.Next onClick={() => onClick(current + 1)} />
			) : (
				<></>
			)}
			{current < totalPage ? (
				<Pagination.Last onClick={() => onClick(totalPage)} />
			) : (
				<></>
			)}
		</Pagination>
	);
}
