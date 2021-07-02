import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

toastr.options = {
    positionClass: 'toast-bottom-right',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
    showDuration: 300,
    hideDuration: 1000,
    timeOut: 5000,
    extendedTimeOut: 1000,
    closeButton: true,
    debug: false,
    progressBar: false,
    preventDuplicates: false,
    newestOnTop: false,
};

export function showSuccessToast({ title = 'Action dispatched successfully', message = '' }) {
    toastr.success(message, title);
}

export function showErrorToast({ title = 'Unable to dispatch action', message = '' }) {
    toastr.error(message, title);
}
