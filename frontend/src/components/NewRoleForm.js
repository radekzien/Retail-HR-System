import { useState } from "react";

const RoleForm = () => {
    const[roleName, setRoleName] = useState('')
    const[hourlyPay, setHourlyPay] = useState('')
    const[error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const role = {roleName, hourlyPay}

        const response = await fetch('/api/roles', {
        method:'POST',
        body: JSON.stringify(role),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json()

    if(!response.ok){
        setError(json.error)
    }
    if(response.ok){
        setError(null)
        console.log('Role created')
        setRoleName('')
        setHourlyPay('')
    }
}

    return(
        <form className = "newRoleForm" onSubmit = {handleSubmit}>
            <h3>Create new Role</h3>
            <label>Company Role Name: </label>
            <input 
                type = "text"
                onChange = {(e)=>setRoleName(e.target.value)}
                value = {roleName}
            />
            <label>Role Pay per Hour: </label>
            <input 
                type = "number"
                onChange = {(e)=>setHourlyPay(e.target.value)}
                value = {hourlyPay}
            />
            <button>Create Role</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default RoleForm