import {AbstractControl, ValidationErrors} from '@angular/forms';

export function validatePassword(ctrl: AbstractControl): ValidationErrors | null {
    const regex = /^[0-9]{8}$/;
    const value = ctrl.value;

    if (value.match(regex)) {
        return null;
    }

    return {password_error: true};
}
