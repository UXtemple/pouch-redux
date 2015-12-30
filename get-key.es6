export default function getKey(pouch) {
  return `${pouch.local.name}|${pouch.remote.name}`;
}
