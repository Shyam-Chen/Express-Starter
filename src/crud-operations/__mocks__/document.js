const fakeData = [{ _id: 'vn3RecDbwMQTjttnluZW', text: 'qaz123' }];

export const List = {
  find() {
    return {
      exec: () => new Promise(res => res(fakeData)),
    };
  },
};
