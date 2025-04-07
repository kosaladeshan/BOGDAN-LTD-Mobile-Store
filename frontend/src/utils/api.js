const backendServers = [
    'http://localhost:8081',
    'http://localhost:8082',
    'http://localhost:8083'
];

let currentServerIndex = 0;

const getNextServer = () => {
    const server = backendServers[currentServerIndex];
    currentServerIndex = (currentServerIndex + 1) % backendServers.length;
    return server;
};

export const apiRequest = async (endpoint, options = {}) => {
    const baseUrl = getNextServer();
    const url = `${baseUrl}${endpoint}`;
    
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
};