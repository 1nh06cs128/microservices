function ConfigurationValidations(value) {
    console.log(value);
    let errors = {};

    const validateField = (field, value) => {
        if (!value.trim()) {
            errors[field] = `'${field}' is required.`;
            return;
        }
    }

    validateField('productName', value.productName);
    validateField('quantity', value.quantity);

    return errors;
}

export default ConfigurationValidations;
