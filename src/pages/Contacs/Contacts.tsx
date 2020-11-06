import React from 'react';
import { Link } from 'react-router-dom';

import Contact from '../../components/Contact/Contact';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/Modal';
import { useFetch } from '../../hooks/useFetch/useFetch';
import { setRequest } from '../../Utils/utils';
import { toast } from 'react-toastify';

const Contacts = () => {
      // const [requestError, setRequestError] = useState('');
      const { response, isLoading, setResponse }: { response: any, isLoading: boolean, setResponse: Function } = useFetch({
            url: 'contacts',
      });

      const updateContacts = (id: number) => {
            $('.modal').modal('hide');
            setResponse({ ...response, result: response.result.filter((elem: any) => elem.id !== id) });
      }

      const deleteContact = async (id: number) => {
            await setRequest({
                  method: 'DELETE',
                  url: `contacts/${id}`,
                  data: null,
                  onSuccess: () => toast.success('Successfully deleted') && updateContacts(id),
                  onFail: (message: string) => toast.error(message)
            })
      }
      return (
            <>
                  <div className='row d-flex justify-content-between align-items-center p-2'>
                        <p className="h2 text-center">My Contacts</p>
                        <Link className='text-left btn-info headerButton' to='/add-contact'>Add New Contact</Link>
                  </div>
                  {!isLoading ? (response && !response.error && response.result && response.result.length > 0 ?
                        <div className='row d-flex justify-content-flex-start'>
                              {response.result.map((elem: any, index: number) =>
                                    <div key={index}>
                                          <Contact
                                                index={index}
                                                name={elem.name}
                                                phone={elem.phone}
                                                dateCreated={elem.date}
                                          />
                                          <Modal index={index} name={elem.name} onDelete={() => deleteContact(elem.id)} />
                                    </div>
                              )} </div> :
                        <div className="empty-contacts text-center">
                              <p className="h2">No Contacts created yet</p>
                              <Link to='/add-contact'>Create one</Link>
                        </div>) : <div className='text-center'><Loader /></div>
                  }
            </>
      );
}

export default Contacts;
