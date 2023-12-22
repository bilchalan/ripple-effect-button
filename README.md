# Ripple Effect Button

A simple React, TypeScript, and Tailwind CSS ripple effect button component.

## Installation

```bash
npm install ripple-effect-button
```

## Usage

```es6
import { Button, ButtonProps } from "ripple-effect-button";

const MyComponent: React.FC = () => {
  const buttonProps: ButtonProps = {
    variant: "primary",
    size: "large",
    // other props...
  };

  return <Button {...buttonProps}>Click me</Button>;
};
```

## Props

- **variant** (optional): Specifies the button variant (e.g., 'primary', 'outlined', 'secondary').
- **size** (optional): Specifies the button size (e.g., 'small', 'default', 'large').
- **loading** (optional): Enables a loading state for the button.
- **loadingIconSize** (optional): Specifies the size of the loading spinner. Default is 16px.

## Examples

- **Basic Usage**

```es6
import { Button } from "ripple-effect-button";

const MyComponent: React.FC = () => {
  return <Button>Click me</Button>;
};
```

- **Loading State**

```es6
import { Button } from "ripple-effect-button";

const MyComponent: React.FC = () => {
  return (
    <Button loading loadingIconSize="20px" disabled>
      Loading...
    </Button>
  );
};
```

## Author

- [Monir](https://github.com/bilchalan)

## License

This project is licensed under the MIT License.

## Acknowledgments

Inspired by the need for a simple and customizable ripple effect button.
