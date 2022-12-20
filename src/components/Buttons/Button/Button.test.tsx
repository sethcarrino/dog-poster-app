/* eslint-disable testing-library/prefer-screen-queries */
import { Button, ButtonProps } from "./Button";
import { fireEvent, render } from "@testing-library/react";

const makeSut = (props: Partial<ButtonProps>) => {
  return render(<Button text='Add Dog' variant='text'onClick={jest.fn()} {...props} />);
};

describe("<Button />", () => {
  test("Should render text prop correctly", () => {
    const { getByText } = makeSut({ text: "Add Dog" });

    expect(getByText(/Add Dog/)).toBeInTheDocument();
  });

  test("Should call onClick successfully", () => {
    const spy = jest.fn();

    const { getByText } = makeSut({ onClick: spy });

    fireEvent.click(getByText(/Add Dog/));

    expect(spy).toHaveBeenCalled();
  });
});