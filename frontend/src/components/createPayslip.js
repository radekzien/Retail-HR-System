import weekRange from './payslipUtil';




const payslipUpdate = async (employeeFName, employeeSName, Role, period, endTime, payslips, setPayslips, setError) => {

  //Calculate Week Dates
    const date = weekRange(endTime);
    const weekStart = date.start;
    const weekEnd = date.end;

    // Log the search criteria and payslips for debugging (Commented out for clarity in console)
    /** 
    console.log('Searching for payslip with:');
    console.log('Employee First Name:', employeeFName);
    console.log('Employee Second Name:', employeeSName);
    console.log('Role:', Role);
    console.log('Week Start:', weekStart);
    console.log('Week End:', weekEnd);
    console.log('Existing Payslips:', payslips);
    */

    //Searching for an existing paylip user working names and working week dates
    let payslip = payslips.find(
      (p) => p.employeeFName === employeeFName && 
             p.employeeSName === employeeSName && 
             p.Role === Role && 
             new Date(p.weekStart).toISOString() === new Date(weekStart).toISOString()
    );

    if (!payslip) { //Creates a payslip if no existing one already exists
      console.log('existing payslip not found');
      const payslipData = { employeeFName, employeeSName, Role, Hours: period, weekStart, weekEnd };
      try {
        const response = await fetch('/api/weekly', {
          method: 'POST',
          body: JSON.stringify(payslipData),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          setError('Failed to Create Payslip');
        }
        setError(null);
        setPayslips(prevPayslips => [...prevPayslips, payslipData]);
        console.log('Payslip created');
      } catch (error) {
        setError(error.message);
      }
    } else {
      const updatedPayslip = { ...payslip, Hours: (payslip.Hours || 0) + period };

      //Update an existing payslips total hours
      try {
        const response = await fetch(`/api/weekly/${payslip._id}`, {
          method: 'PATCH',
          body: JSON.stringify(updatedPayslip),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok){ 
            setError('Failed to update Payslip');
        }
        const result = await response.json(); 
        setPayslips(payslips.map(p => p._id === payslip._id ? result : p)); // Update the payslip in the state
        console.log('Payslip updated:', result);
      } catch (error) {
        setError(error.message);
      }
    }
    
    //Reload state with updated payslip
    const response = await fetch('/api/weekly', { timeout: 10000 }); //Reload state with updated payslip!!!! - Took me forever to figure out this was the issue lol - This allows for each newly created payslip to have an _id, meaning we can add multiple shifts and update a payslip in one session without refreshing the page.
        if (!response.ok) {
            setError('Failed to fetch updated payslips');
            return;
        }
        const updatedPayslips = await response.json();
        setPayslips(updatedPayslips);
    
    return payslips
  };

export default payslipUpdate