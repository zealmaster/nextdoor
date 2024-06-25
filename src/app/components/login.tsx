// login.js or auth.js

export const isLoggedIn = async () => {
    try {
        const response = await fetch('/api/checkLogin');
        const data = await response.json();
        return data.loggedIn;
    } catch (error) {
        console.error("Error checking login status:", error);
        return false;
    }
};
