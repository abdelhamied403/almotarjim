import { Input, InputProps } from "./ui/input";

export type FieldProps = InputProps &
  React.RefAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
    children?: JSX.Element | JSX.Element[];
  };

const Field = ({ label, children, error, ...props }: FieldProps) => {
  return (
    <div className="field">
      <label>{label}</label>
      {children || <Input {...props} />}
      <span className="text-red-500">{error}</span>
    </div>
  );
};

export default Field;
