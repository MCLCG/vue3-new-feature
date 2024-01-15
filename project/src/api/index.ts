import { createRequest } from './request';

export const getAllInfo = () => {
  return createRequest({
    url: '/annual-report/getAll',
    method: 'get',
  });
};
