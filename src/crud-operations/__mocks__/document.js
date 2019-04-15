export const fakeData = [
  { _id: 'vn3RecDbwMQTjttnluZW', text: 'Front-end' },
  { _id: '5a4b49309fc9ad8fa4dfe51f', text: 'Back-end' },
];

export const List = {
  find(query) {
    if (query._id) {
      return {
        exec: () => new Promise(res => res(fakeData.filter(item => query._id === item._id))),
      };
    }

    if (query.text) {
      return {
        exec: () => new Promise(res => res(fakeData.filter(item => item.text.toLowerCase().indexOf(query.text.$regex.toLowerCase()) > -1))),
      };
    }

    return {
      exec: () => new Promise(res => res(fakeData)),
    };
  },
};
