import React from 'react';

import TrendingPanel from './TrendingPanel';

import { Container } from './styles';
import LoadingTrendPanel from '../Shimmer/LoadingTrendPanel';

const RightColumn: React.FC<LoadingProps> = ({ isLoading }) => {
	return (
		<Container className="right-column">
			{ isLoading ? (
				<LoadingTrendPanel />
			) : (
				<>
					<TrendingPanel />
					<TrendingPanel />
				</>
			)}
		</Container>
	);
};

export default RightColumn;
