export const required = (name: string) => {
  return { required: { value: true, message: `${name} is required` } };
};
