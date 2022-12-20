/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { Typography } from "./Typography";
import { TypographyProps } from '@mui/material/Typography';
import { render } from "@testing-library/react";

const makeSut = (props: Partial<TypographyProps>) => {
   
  return render( <Typography variant="h6" className="made-with-text" {...props}>Made with ❤️ by Seth Carrino</Typography>);
};

describe("<Typography />", () => {
  test("Should render variant prop correctly", () => {
    const { container } = makeSut({ variant: "h6" });

    expect(container.getElementsByClassName('made-with-text')[0]).toBeInTheDocument();
  });

  test("Should render child text properly", () => {
    const { getByText } = makeSut({ color: 'inherit' });

    expect(getByText('Made with ❤️ by Seth Carrino')).toBeTruthy();
  });
});