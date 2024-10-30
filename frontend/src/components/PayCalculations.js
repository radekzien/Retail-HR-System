const calculatePay = (weekly, roles) => {
    // Variables to be used in calculations
    let natInsDeduction = 0;
    let incTaxDeduction = 0;
    let grossPay = 0;
    let natInsTotal = 0
    let incTaxTotal = 0
    let payTotal = 0

    // Find the role details from the roles array
    const employeeRole = roles.find(role => role.roleName === weekly.Role);

    // Check if the role was found
    if (!employeeRole) {
        console.error('Role not found');
        return { pay: 0, natInsDeduction: 0, incTaxDeduction: 0, netPay: 0 };
    }

    // Calculate net pay
    let totalGrossPay = employeeRole.hourlyPay * weekly.Hours;
    grossPay = totalGrossPay.toFixed(2)

    // National Insurance Deductions
    const primaryThreshold = 242; // Primary Threshold
    const UEL = 967; // Upper Earnings Limit
    const ratePT = 0.08; // Primary Threshold Rate
    const rateUEL = 0.02; // Upper Earnings Limit Rate

    let NItaxedAmount = 0;
    if (grossPay > primaryThreshold && grossPay <= UEL) {
        NItaxedAmount = grossPay - primaryThreshold;
        natInsTotal = NItaxedAmount * ratePT;
    } else if (grossPay > UEL) {
        NItaxedAmount = grossPay - UEL;
        natInsTotal = (NItaxedAmount * rateUEL) + ((UEL - primaryThreshold) * ratePT);
    }

    // PAYE Income Tax Deduction
    const allowanceUpper = 242; // Personal Allowance Upper Limit
    const basicUpper = 725; // Basic Rate Upper Limit
    const higherUpper = 2406.53846; // Higher Rate Upper Limit
    const basicRate = 0.2; // Basic Rate
    const higherRate = 0.4; // Higher Rate
    const additionalRate = 0.45; // Additional Rate

    let ICtaxedAmount = 0;
    if (grossPay > allowanceUpper && grossPay <= basicUpper) {
        ICtaxedAmount = grossPay - allowanceUpper;
        incTaxTotal = ICtaxedAmount * basicRate;
    } else if (grossPay > basicUpper && grossPay <= higherUpper) {
        ICtaxedAmount = grossPay - basicUpper;
        incTaxTotal = (ICtaxedAmount * higherRate) + ((basicUpper - allowanceUpper) * basicRate);
    } else if (grossPay > higherUpper) {
        ICtaxedAmount = grossPay - higherUpper;
        incTaxTotal = (ICtaxedAmount * additionalRate) + ((higherUpper - basicUpper) * higherRate) + ((basicUpper - allowanceUpper) * basicRate);
    }

    // Calculate the final pay
    payTotal = grossPay - natInsTotal - incTaxTotal;

    const pay = payTotal.toFixed(2)
    natInsDeduction = natInsTotal.toFixed(2)
    incTaxDeduction = incTaxTotal.toFixed(2)

    let totalDeductions = natInsTotal + incTaxTotal
    const deductions = totalDeductions.toFixed(2)

    // Return the calculated values
    return { pay, natInsDeduction, incTaxDeduction, grossPay, deductions };
};

export default calculatePay;