import { useState } from 'react';

type callback = (a: number) => void;

type PropsLimit = {
	totalCount: number;
	onSetLimit: callback;
};

export default function LimitPage({ totalCount, onSetLimit }: PropsLimit) {
	const [value, setValue] = useState<number>(10);

	const onChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		const limit: number = parseInt(e.target.value) || 1;
		setValue(limit);

		typeof onSetLimit === 'function' ? onSetLimit(limit) : null;
	};

	return (
		<select
			className='form-select w-auto'
			onChange={onChange}
			value={value}
		>
			<option value='10'>10</option>
			{totalCount > 15 && <option value='15'>15</option>}
			{totalCount > 20 && <option value='20'>20</option>}
			{totalCount > 25 && <option value='25'>25</option>}
			{totalCount > 30 && <option value='30'>30</option>}
			{totalCount > 50 && <option value='50'>50</option>}
			{totalCount > 100 && <option value='100'>100</option>}
			{totalCount > 150 && <option value='150'>150</option>}
			{totalCount > 200 && <option value='200'>200</option>}
			{totalCount > 250 && <option value='250'>250</option>}
			{totalCount > 300 && <option value='300'>300</option>}
			{totalCount > 350 && <option value='350'>350</option>}
			{totalCount > 400 && <option value='400'>400</option>}
			{totalCount > 450 && <option value='450'>450</option>}
			{totalCount > 500 && <option value='500'>500</option>}
		</select>
	);
}
