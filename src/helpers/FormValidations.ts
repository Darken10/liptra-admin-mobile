
export const FormValidations  = {
    numeroValidators: (value:string)=>{
        const regex = /[0-9]+$/;
        if(!regex.test(value)) return "Le Numero doit contenir que des chiffre"
        if(value.length>12 || value.length<8) return "La numero doit etre entre 8 et 12 caracteres"
        return '';
    },

    codeValidators: (value:string)=>{
        const regex = /[0-9]+$/;
        if(!regex.test(value)) return "Le Code doit contenir que des chiffre"
        if(value.length!==6) return "La code doit etre 6 caracteres"
        return '';
    },

    loginPasswordValidation : (value:string)=>{
        if (!value) return "Le mot de passe est obligatoire."
        return ''

    },
    emailValidation : (value:string)=>{
        const re = /\S+@\S+\.\S+/
        if (!value) return "Email est obligatoire"
        if (!re.test(value)) return 'L\'email doit est valide.'
        return ''
    }
}