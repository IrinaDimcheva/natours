import axios from 'axios';
import { showAlert } from './alerts';

export const updateData = async (name, email) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/users/updateMe',
      data: {
        name,
        email,
      },
    });

    console.log(res, res.data);

    if (res.data.status === 'success') {
      showAlert('success', 'Data updated successfully!');
      // window.setTimeout(() => {
      //   location.assign('/me');
      // }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
