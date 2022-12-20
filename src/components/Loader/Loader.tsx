import dogDance from 'assets/dancing-dance.gif';
import * as S from './Loader.styles';

export const Loader = () => {
	return (
		<S.Wrapper>
			<img alt="Dancing Dog" src={dogDance} />
		</S.Wrapper>
	);
};
