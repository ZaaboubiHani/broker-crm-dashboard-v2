
import React from 'react';
import '../user-details/user-details.style.css';
import UserEntity, { UserRole } from '../../entities/user.entity';


interface UserDetailsProps {
    user: UserEntity,
    company: string,
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, company,  }) => {


    return (
        <div className="user-details">
            <h1 style={{fontSize:'20px'}}>{user.fullName}</h1>
            <h2 style={{fontSize:'17px'}}>Société : {company}</h2>
            {user.role === UserRole.supervisor ? (<h2 style={{fontSize:'17px'}}>Superviseur : {'supervisor'}</h2>) : undefined}
            <h2 style={{fontSize:'17px'}}>mobile personnel : {user.phonePersonal}</h2>
            <h2 style={{fontSize:'17px'}}>mobile professionnel : {user.phoneProfessional}</h2>
            <h2 style={{fontSize:'17px'}}>E-mail : {user.email}</h2>
        </div>
    );
};

export default UserDetails;
