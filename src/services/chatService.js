import { v4 as uuidv4 } from 'uuid';

// Mock data for chats
const mockChats = [
  {
    id: '1',
    name: 'Personal Notes',
    lastMessage: 'Remember to check the new requirements',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    unreadCount: 0
  },
  {
    id: '2',
    name: 'Project Ideas',
    lastMessage: 'Add the new feature to the roadmap',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    unreadCount: 2
  }
];

// Mock data for messages
const mockMessages = {
  '1': [
    {
      id: '101',
      content: 'Welcome to your personal notes!',
      sender: 'system',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      status: 'delivered'
    },
    {
      id: '102',
      content: 'Remember to check the new requirements',
      sender: 'me',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      status: 'delivered'
    }
  ],
  '2': [
    {
      id: '201',
      content: 'Project ideas discussion starts here',
      sender: 'system',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      status: 'delivered'
    },
    {
      id: '202',
      content: 'Maybe we should implement a new search algorithm?',
      sender: 'me',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      status: 'delivered'
    },
    {
      id: '203',
      content: 'Add the new feature to the roadmap',
      sender: 'me',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      status: 'delivered'
    }
  ]
};

// Mock chat data store
let chats = [...mockChats];
let messages = { ...mockMessages };

// Simulate delay for async operations
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Chat services
export const chatService = {
  // Get all chats
  getChats: () => {
    return delay(300).then(() => Promise.resolve([...chats]));
  },

  // Get a specific chat
  getChat: (chatId) => {
    const chat = chats.find(c => c.id === chatId);
    if (!chat) {
      return delay(300).then(() => Promise.reject(new Error('Chat not found')));
    }
    return delay(300).then(() => Promise.resolve({...chat}));
  },

  // Create a new chat
  createChat: (name) => {
    const newChat = {
      id: uuidv4(),
      name,
      lastMessage: 'Chat created',
      timestamp: new Date().toISOString(),
      unreadCount: 0
    };
    chats = [...chats, newChat];
    messages[newChat.id] = [{
      id: uuidv4(),
      content: `Welcome to ${name}!`,
      sender: 'system',
      timestamp: new Date().toISOString(),
      status: 'delivered'
    }];
    return delay(500).then(() => Promise.resolve({...newChat}));
  },

  // Delete a chat
  deleteChat: (chatId) => {
    const chatIndex = chats.findIndex(c => c.id === chatId);
    if (chatIndex === -1) {
      return delay(300).then(() => Promise.reject(new Error('Chat not found')));
    }
    chats = chats.filter(c => c.id !== chatId);
    delete messages[chatId];
    return delay(500).then(() => Promise.resolve({ success: true }));
  },

  // Get messages for a chat
  getMessages: (chatId) => {
    if (!messages[chatId]) {
      return delay(300).then(() => Promise.reject(new Error('Chat not found')));
    }
    return delay(300).then(() => Promise.resolve([...messages[chatId]]));
  },

  // Send a message
  sendMessage: (chatId, content) => {
    if (!messages[chatId]) {
      return delay(300).then(() => Promise.reject(new Error('Chat not found')));
    }
    
    const newMessage = {
      id: uuidv4(),
      content,
      sender: 'me',
      timestamp: new Date().toISOString(),
      status: 'sent'
    };
    
    messages[chatId] = [...messages[chatId], newMessage];
    
    // Update the last message in the chat
    chats = chats.map(chat => 
      chat.id === chatId ? {
        ...chat,
        lastMessage: content,
        timestamp: newMessage.timestamp
      } : chat
    );

    return delay(300).then(() => {
      // Simulate message being delivered
      messages[chatId] = messages[chatId].map(msg => 
        msg.id === newMessage.id ? {...msg, status: 'delivered'} : msg
      );
      return Promise.resolve({...newMessage, status: 'delivered'});
    });
  }
};

// Mock websocket for real-time updates
export const createChatSocket = () => {
  let listeners = [];

  return {
    connect: () => {
      console.log('Mock socket connected');
      return Promise.resolve();
    },
    
    addListener: (callback) => {
      listeners.push(callback);
      return () => {
        listeners = listeners.filter(l => l !== callback);
      };
    },
    
    disconnect: () => {
      listeners = [];
      console.log('Mock socket disconnected');
    }
  };
};
