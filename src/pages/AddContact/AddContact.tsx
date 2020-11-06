import React from 'react';
import { Link } from 'react-router-dom';

import Form from '../../components/Form/Form';

const AddContact = () => {
      return (
            <div>
                  <div className='row d-flex justify-content-between align-items-center p-3 topHeader'>
                        <p className="h2 text-center">Contacts</p>
                        <Link className='text-left btn-info headerButton' to='/'>Back to home screen</Link>
                  </div>
                  <Form />
            </div>
      );
}

export default AddContact;
