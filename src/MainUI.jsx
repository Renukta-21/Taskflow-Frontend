import React, { useEffect, useState } from 'react'
useState
function MainUI({ user }) {
    const [greeting, setGreeting] = useState(getGreeting())
    return (
        <div>
            <h3>{getGreeting()} <p style={{ color: 'blue', display:'inline' }}>{user.username}</p></h3>
            <h4>{getFormattedDate()}</h4>
        </div>
    )
}
const getFormattedDate = () => {
    const today = new Date();
    const options = { weekday:"short" , day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(today);
    return `Today, ${formattedDate}`;
};

const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
        return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
        return "Good Afternoon";
    } else {
        return "Good Evening";
    }
};

export default MainUI