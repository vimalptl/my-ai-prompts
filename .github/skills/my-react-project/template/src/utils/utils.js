export function getCookie(name) {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookies = document.cookie ? document.cookie.split(';') : [];

  for (let index = 0; index < cookies.length; index += 1) {
    const parts = cookies[index].trim().split('=');

    if (parts[0] === name) {
      return parts[1] || null;
    }
  }

  return null;
}

export function classNames(...values) {
  return values.filter(Boolean).join(' ');
}