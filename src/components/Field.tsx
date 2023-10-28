export type FieldProps = {
  label: string;
  error?: string;
  className?: string;
  children?: JSX.Element | JSX.Element[];
};

const Field = ({ label, children, error, ...props }: FieldProps) => {
  return (
    <div className="field flex flex-col gap-1" {...props}>
      <label>{label}</label>
      {children}
      {!!error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default Field;
