import { forwardRef, useRef } from 'react';
import * as S from './Box.styles';
import { BoxProps as MUIBoxProps } from '@mui/material/Box';

export const Box = forwardRef(({ ...props }: MUIBoxProps, ref) => {
	const componentRef = useRef<HTMLIFrameElement>(null);
	return (
		<S.StyledBox
			ref={componentRef || ref}
			sx={{ p: 6 }}
			{...props}
		/>
	);
});
