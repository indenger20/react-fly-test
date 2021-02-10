import { toast } from 'react-toastify';

toast.configure({
  autoClose: 1000,
  draggable: false,
  position: toast.POSITION.TOP_RIGHT,
});

export { toast as showMessage };
