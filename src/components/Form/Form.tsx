import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../Input/Input';
import { setRequest } from '../../Utils/utils';
import { useFetch } from '../../hooks/useFetch/useFetch';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';

interface formInputTypes {
      name: string,
      phone: string,
      submit: string,
}

const Form = () => {
      const history = useHistory();
      const [inputValues, setValue] = useState<formInputTypes>({
            name: '',
            phone: '',
            submit: 'Add Contact'
      });
      // const [requestError, setRequestError] = useState('');

      const { response, isLoading }: { response: any, isLoading: boolean } = useFetch({
            url: 'form-fields',
      });

      const handleChange = (e: React.SyntheticEvent) => {
            e.persist();
            let target = e.target as HTMLInputElement;
            const resuableTarget: any = target.getAttribute('name')
            setValue(() => ({ ...inputValues, [resuableTarget]: target.value }))
      }

      const handleSubmit = async (e: React.SyntheticEvent) => {
            e.preventDefault();
            await setRequest({
                  method: 'post',
                  url: 'contacts',
                  data: inputValues,
                  onSuccess: () => {
                        toast.success('Successfully created')
                        history.push('/')
                  },
                  onFail: (message: string) => toast.error(message)
            })
      }
      return (
            !isLoading ? <form onSubmit={handleSubmit}>
                  {response.result.map((elem: any, index: number) =>
                        <Input
                              key={index}
                              onChange={handleChange}
                              label={elem.label}
                              name={elem.name}
                              type={elem.type}
                              required={elem.required}
                              placeholder={elem.name}
                              disabled={elem.type === 'submit' && Object.values(inputValues).indexOf('') !== -1}
                              errorMessage={elem.errorMessage}
                              value={(inputValues as any)[elem.name] || ""}
                        />)}
            </form> : <div className='text-center'>{<Loader />}</div>
      );
}

export default Form;
