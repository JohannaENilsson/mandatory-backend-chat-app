import axios from 'axios';

export function getRooms() {
  return axios.get('/chat');
}

export function createRoom(newRoom) {
  return axios.post('/chat', {
    room: newRoom,
    messages: [],
  });
}

export function deleteRoom(id) {
  return axios.delete(`/chat/${id}`);
}

