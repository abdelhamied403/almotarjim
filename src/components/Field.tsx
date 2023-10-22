export type FieldProps = {
  label: string;
  error?: string;
  children?: JSX.Element | JSX.Element[];
};

const Field = ({ label, children, error }: FieldProps) => {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
      <span className="text-red-500">{error}</span>
    </div>
  );
};

export default Field;
