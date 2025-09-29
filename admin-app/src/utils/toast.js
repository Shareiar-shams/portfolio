import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Reusable Toast Function
export const showToast = (type, title, text = '') => {
  MySwal.fire({
    icon: type,          // "success" | "error" | "warning" | "info" | "question"
    title: title,        // Dynamic title
    text: text,          // Optional message
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });
};
export default showToast;