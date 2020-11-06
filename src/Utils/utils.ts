import axios, { Method } from 'axios';
import { HOST } from '../config/contacts';

interface RequestProps {
      url: string,
      method: Method,
      data: any,
      onSuccess: Function,
      onFail: Function,
}

export const setRequest = async ({ url, method, data, onSuccess, onFail }: RequestProps) => {
      try {
            const request = await axios({
                  url: `${HOST}${url}`,
                  method,
                  data
            });
            if (request.status === 200) onSuccess()
            return request;
      } catch (error) {
            onFail(error.response.data.message)
      }
}