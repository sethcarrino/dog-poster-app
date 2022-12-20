/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { IconButton, IconButtonProps } from "./IconButton";
import { render } from "@testing-library/react";
import { Close } from '@mui/icons-material'; 

const makeSut = (props: Partial<IconButtonProps>) => {
   
  return render( <IconButton icon={<Close />} className="icon-button" size="large" color="inherit" onClick={jest.fn()} {...props} />);
};

describe("<IconButton />", () => {
  test("Should render size prop correctly", () => {
    const { container } = makeSut({ size: "large" });

    expect(container.getElementsByClassName('icon-button')[0]).toBeInTheDocument();
  });

  test("Should render color prop correctly", () => {
    const { container } = makeSut({ color: 'inherit' });

    expect(container.getElementsByClassName('icon-button')[0]).toBeInTheDocument();
  });
});