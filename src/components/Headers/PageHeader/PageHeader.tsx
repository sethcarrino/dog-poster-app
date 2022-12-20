import { ReactElement } from 'react';
import { Typography } from 'components';

import * as S from './PageHeader.styles';

type PageHeaderProps = {
	title: string;
	actionText?: string;
	actionClick?: () => void;
	actionIcon?: ReactElement;
};

export const PageHeader = ({
	title,
	actionText,
	actionClick,
	actionIcon,
	...props
}: PageHeaderProps) => {
	return (
		<S.Wrapper {...props}>
			<S.TitleWrapper>
				<Typography variant="h4">{title}</Typography>
			</S.TitleWrapper>
		</S.Wrapper>
	);
};
