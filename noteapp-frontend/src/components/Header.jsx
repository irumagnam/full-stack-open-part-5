import session from '../services/login'

const Header = ({ logout }) => {
  const user = session.getUser()
  return (
    <div>
      <div className='title'>Notes</div>
      {user &&
        <div>
          <b>{user.name}</b> logged in
          <button onClick={logout}>Logout</button>
        </div>
      }
    </div>
  )
}

export default Header