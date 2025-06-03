import { v4 as uuidv4 } from 'uuid';

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

const mockMessages = {
  '1': [
    {
      id: '102',
      content: 'Hello message 1?',
      sender: 'me',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    }
  ],
  '2': [
    {
      id: '202',
      content: 'Hello message<b>1?</b>',
      sender: 'me',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      status: 'delivered'
    },
    {
      id: '203',
      content: 'Hello message 2?',
      sender: 'me',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      status: 'delivered'
    }
  ]
};

let chats = [...mockChats];
let messages = { ...mockMessages };

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const chatService = {
  getChats: () => {
    return delay(300).then(() => Promise.resolve([...chats]));
  },

  getChat: (chatId) => {
    const chat = chats.find(c => c.id === chatId);
    if (!chat) {
      return delay(300).then(() => Promise.reject(new Error('Chat not found')));
    }
    return delay(300).then(() => Promise.resolve({...chat}));
  },

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
    }];
    return delay(500).then(() => Promise.resolve({...newChat}));
  },

  deleteChat: (chatId) => {
    const chatIndex = chats.findIndex(c => c.id === chatId);
    if (chatIndex === -1) {
      return delay(300).then(() => Promise.reject(new Error('Chat not found')));
    }
    chats = chats.filter(c => c.id !== chatId);
    delete messages[chatId];
    return delay(500).then(() => Promise.resolve({ success: true }));
  },

  getMessages: (chatId) => {
    if (!messages[chatId]) {
      return delay(300).then(() => Promise.reject(new Error('Chat not found')));
    }
    return delay(300).then(() => Promise.resolve([...messages[chatId]]));
  },

  sendMessage: (chatId, content, attachment = null) => {
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
    
    // Handle image or file attachments
    if (attachment) {
      if (attachment.type.startsWith('image/')) {
        newMessage.image = {
          url: URL.createObjectURL(attachment),
          name: attachment.name,
          type: attachment.type
        };
      } else {
        newMessage.file = {
          name: attachment.name,
          size: attachment.size,
          type: attachment.type,
          extension: attachment.name.split('.').pop()
        };
      }
    }
    
    messages[chatId] = [...messages[chatId], newMessage];
    
    // Update the last message preview text
    let lastMessagePreview = content;
    if (attachment) {
      if (attachment.type.startsWith('image/')) {
        lastMessagePreview = content ? `📷 ${content}` : '📷 Image';
      } else {
        lastMessagePreview = content ? `📎 ${content}` : `📎 ${attachment.name}`;
      }
    }
    
    chats = chats.map(chat => 
      chat.id === chatId ? {
        ...chat,
        lastMessage: lastMessagePreview,
        timestamp: newMessage.timestamp
      } : chat
    );

    return delay(300).then(() => {
      messages[chatId] = messages[chatId].map(msg => 
        msg.id === newMessage.id ? {...msg, status: 'delivered'} : msg
      );
      return Promise.resolve({...newMessage, status: 'delivered'});
    });
  }
};
