import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '../constant/pagination';

export const buildMeta = (
  total: number,
  size?: number,
  page?: number
) => {
  return {
    page: page || DEFAULT_PAGE,
    size: size || DEFAULT_PAGE_SIZE,
    total: Number(total),
  };
};

export const getPaginationOptions = (option: {
  page?: number;
  size?: number;
}) => {
  const { page = DEFAULT_PAGE, size = DEFAULT_PAGE_SIZE } = option;

  const offset = (page - 1) * size;

  return {
    limit: size,
    offset,
  };
};
