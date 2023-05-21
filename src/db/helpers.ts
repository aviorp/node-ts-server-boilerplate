
interface FiltersQuery {
  skip?: number
  take?: number
  where?: {
    OR: any[]
  }
}

export const buildFiltersQuery: any = ({ search, searchFields, skip, take }) => {
  const filters: FiltersQuery = {};

  searchFields.forEach((param: string) => {
    filters?.where?.OR.push({ [param]: { contains: search, mode: 'insensitive' } });
  });

  if ((Boolean(skip)) && (Boolean(take))) {
    filters.skip = parseInt(skip);
    filters.take = parseInt(take);
  }
  return filters;
};
