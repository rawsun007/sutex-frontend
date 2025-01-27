    import React, { useState } from 'react';
    import axios from 'axios';

    const ChatComponent = () => {
    const [userMessage, setUserMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSendMessage = async () => {
        const trimmedMessage = userMessage.trim();
    
        if (!trimmedMessage) {
        setResponseMessage('Please enter a valid message.');
        return;
        }
    
        setLoading(true);
    
        try {
        const response = await axios.post('https://sutex-backend.onrender.com/api/auth/chat/', {
            message: trimmedMessage,
        });
    
        // Update to handle the correct structure based on the response you received
        const aiResponse = response.data?.outputs?.[0]?.outputs?.[0]?.results?.message?.text || 'No response from AI.';
        setResponseMessage(aiResponse);
        } catch (error) {
        console.error('Error fetching chat response:', error);
    
        if (error.response) {
            setResponseMessage(`Error: ${error.response.data.detail || 'Unknown error from server.'}`);
        } else if (error.request) {
            setResponseMessage('Error: No response from AI service. Check the server status.');
        } else {
            setResponseMessage(`Error: ${error.message}`);
        }
        } finally {
        setLoading(false);
        }
    
        setUserMessage('');
    };
    


    return (
        <div className="container my-4">
        <h1 className="text-center mb-4">Chat with AI</h1>
        <div className="input-group mb-3">
            <input
            type="text"
            className="form-control"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type your message here..."
            disabled={loading}
            />
            <button
            className="btn btn-primary"
            onClick={handleSendMessage}
            disabled={loading}
            >
            {loading ? 'Loading...' : 'Send'}
            </button>
        </div>
        <div className="alert alert-secondary">
            <h4>Response:</h4>
            <p>{responseMessage}</p>
        </div>
        </div>
    );
    };

    export default ChatComponent;
