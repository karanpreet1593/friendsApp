import './user-name-icon-styles.scss'

const UserNameIcon = ({user}) => {

const emptyUserSource = 'https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
    const photoURL = user ? user.photoURL : emptyUserSource
    const displayName = user ? user.displayName : 'user'
    return(
        <div className='userNameIcon-container'>
                <div className='profile-image'>
                    <img className='img'
                    src={photoURL}
                    alt="profile-pic-icon"
                    />
                </div>
                <h4>{`${displayName}`}</h4>
            </div>
    )
}

export default UserNameIcon