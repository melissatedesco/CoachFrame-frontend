const ErrorAlert = ({ message }) => {
  if (!message) return null;
  return (
    <div className="alert alert-danger bg-danger-subtle text-danger-emphasis border-danger-subtle" role="alert">
      {message}
    </div>
  );
};

export default ErrorAlert;
