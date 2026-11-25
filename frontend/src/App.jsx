import { useState } from 'react'
import './App.css'

function App() {
  const [page, setPage] = useState('home')
  const [role, setRole] = useState('student')
const [leaveRequests, setLeaveRequests] = useState([])
  function handleLogin(event) {
    event.preventDefault()
    setPage('dashboard')
  }
function handleLeaveSubmit(event) {
  event.preventDefault()

  const formData = new FormData(event.currentTarget)

  const newRequest = Object.fromEntries(formData.entries())

  setLeaveRequests(prev => [...prev, newRequest])

  alert("Leave Application Submitted Successfully!")

  setPage('requests')
}
  return (
    <div className="container">

      <nav>
        <h2>College Leave Portal</h2>
        <div>
          <a href="#" onClick={() => setPage('home')}>Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      {page === 'home' && (
        <section className="hero">
          <h1>College Leave Management System</h1>
          <p>Apply for leave online and track your leave status.</p>

          <div className="buttons">
            <button onClick={() => {
              setRole('student')
              setPage('login')
            }}>
              Student Login
            </button>

            <button onClick={() => {
              setRole('faculty')
              setPage('login')
            }}>
              Faculty Login
            </button>
          </div>
        </section>
      )}

      {page === 'login' && (
        <section className="hero">
          <h1>
            {role === 'student' ? 'Student Login' : 'Faculty Login'}
          </h1>

          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email Address"
              required
            />

            <input
              type="password"
              placeholder="Password"
              required
            />

            <button type="submit">Login</button>

            <button type="button" onClick={() => setPage('home')}>
              Back to Home
            </button>
          </form>
        </section>
      )}

      {page === 'dashboard' && (
        <section className="hero">
          <h1>
            Welcome to {role === 'student' ? 'Student' : 'Faculty'} Dashboard!
          </h1>

          <p>College Leave Management System</p>

          {role === 'student' && (
           <p>My leave application will be displayed here.</p>
          )}
          <div className="buttons">
  <button onClick={() => setPage('apply')}>
    Apply for Leave
  </button>

  <button onClick={() => setPage('requests')}>
    My Leave Requests
  </button>
</div>

          <button onClick={() => setPage('home')}>
            Logout
          </button>
        </section>
      )}
        {page === 'apply' && (
  <section className="hero">
    <h1>Apply for Leave</h1>

    <form className="login-form" onSubmit={handleLeaveSubmit}>
      <input type="text" name="student Name" placeholder="Student Name" required />

      <input type="text" name="register number" placeholder="Register Number" required />

      <input type="text"
       name="Department" 
      placeholder="department"required />

      <label>Leave From:</label>
      <input type="date"  name="leavefrom"required />

      <label>Leave To:</label>
      <input type="date" name="leaveto" required />

      <textarea name="reason" placeholder="Reason for Leave" required />

      <button type="submit">Submit Application</button>

      <button type="button" onClick={() => setPage('dashboard')}>
        Back to Dashboard
      </button>
    </form>
  </section>
)}
      
{page === 'requests' && (
  <section className="hero">
    <h1>My Leave Requests</h1>

    {leaveRequests.length === 0 ? (
      <p>No leave requests found.</p>
    ) : (
      leaveRequests.map((request, index) => (
        <div className="request-card" key={index}>
          <h3>Leave Request {index + 1}</h3>

          {Object.entries(request).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ))}
        </div>
      ))
    )}

    <button onClick={() => setPage('dashboard')}>
      Back to Dashboard
    </button>
  </section>
)}
    </div>
  )
}

export default App
