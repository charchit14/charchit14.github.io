import { ALPHABET_SET, NUMBER_SET } from './constants';

export function getRandomString(length: number): string {
  const charset = ALPHABET_SET + NUMBER_SET;
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }

  return result;
}

export function createImage(src: string) {
  const image = new Image();
  image.src = src;
  return image;
}
