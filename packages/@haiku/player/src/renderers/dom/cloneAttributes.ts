export default function cloneAttributes(attributes) {
  if (!attributes) {
    return {};
  }
  const clone = {};
  for (const key in attributes) {
    clone[key] = attributes[key];
  }
  return clone;
}
