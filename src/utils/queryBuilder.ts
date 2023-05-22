import { type Request } from 'express';
interface FiltersQuery {
  skip?: number
  take?: number
  select?: object
  where?: object
  data?: object

}

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const handleGetMethod = (query, params, searchFields: string[] = []): FiltersQuery | undefined => {
  const { skip, take, select, search } = query;
  const { id } = params;

  if (select?.includes('password')) {
    throw new Error('Password cannot be selected.');
  }

  const selectedFields = select
    ? select.split(',').reduce((acc: object, curr: string) => {
      acc[curr] = true;
      return acc;
    }, {})
    : undefined;
  const where = {
    AND: searchFields.map((field: string) => ({
      [field]: {
        contains: search,
        mode: 'insensitive',
      },
    })),
  };

  if (id) {
    return { where: { id } };
  }

  return {
    skip,
    take,
    select: selectedFields,
    where,
  };
};

const handlePostMethod = (body: object | [], isBulk: boolean = false): FiltersQuery => {
  const created_at = new Date().toISOString();
  if (isBulk && Array.isArray(body)) {
    return {
      data: body.map((item: any) => ({
        ...item,
        created_at,
      })),
    };
  }
  return {
    data: {
      ...body,
      created_at,
    },
  };
};

const handlePutMethod = (body: object, id: string): FiltersQuery => {
  return {
    where: { id },
    data: body,
  };
};

const handleDeleteMethod = (id: string): FiltersQuery => {
  return {
    where: { id },
  };
};

export default (req: Request, searchFields: string[] = []): any => {
  const { method, path, query, params, body } = req;
  const { id } = params;
  switch (method) {
    case HttpMethod.GET:
      return handleGetMethod(query, params, searchFields);
    case HttpMethod.POST:
      return handlePostMethod(body, path.includes('bulk'));
    case HttpMethod.PUT:
      return handlePutMethod(body, id);
    case HttpMethod.DELETE:
      return handleDeleteMethod(id);
    default:
      throw new Error('Unsupported HTTP method.'); // Handle unsupported HTTP methods or invalid requests
  }
};
