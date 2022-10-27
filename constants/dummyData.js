import images from './images';

const seatStatus = ['Available', 'Selected', 'Reserved'];

const seats = [
  {
    id: '1',
    row: [
      {
        column: '1',
        row: 'A',
        status: 'Available',
      },
      {
        column: '1',
        row: 'B',
        status: 'Available',
      },
      {
        column: '1',
        row: 'C',
        status: 'Available',
      },
      {
        column: '1',
        row: 'D',
        status: 'Available',
      },
    ],
  },

  {
    id: '2',
    row: [
      {
        column: '2',
        row: 'A',
        status: 'Available',
      },
      {
        column: '2',
        row: 'B',
        status: 'Available',
      },
      {
        column: '2',
        row: 'C',
        status: 'Reserved',
      },
      {
        column: '2',
        row: 'D',
        status: 'Reserved',
      },
      {
        column: '2',
        row: 'E',
        status: 'Available',
      },
      {
        column: '2',
        row: 'F',
        status: 'Available',
      },
      {
        column: '2',
        row: 'G',
        status: 'Available',
      },
    ],
  },

  {
    id: '3',
    row: [
      {
        column: '3',
        row: 'A',
        status: 'Reserved',
      },
      {
        column: '3',
        row: 'B',
        status: 'Reserved',
      },
      {
        column: '3',
        row: 'C',
        status: 'Available',
      },
      {
        column: '3',
        row: 'D',
        status: 'Available',
      },
      {
        column: '3',
        row: 'E',
        status: 'Available',
      },
      {
        column: '3',
        row: 'F',
        status: 'Available',
      },
      {
        column: '3',
        row: 'G',
        status: 'Reserved',
      },
    ],
  },

  {
    id: '4',
    row: [
      {
        column: '4',
        row: 'A',
        status: 'Available',
      },
      {
        column: '4',
        row: 'B',
        status: 'Available',
      },
      {
        column: '4',
        row: 'C',
        status: 'Reserved',
      },
      {
        column: '4',
        row: 'D',
        status: 'Available',
      },
      {
        column: '4',
        row: 'E',
        status: 'Available',
      },
      {
        column: '4',
        row: 'F',
        status: 'Reserved',
      },
      {
        column: '4',
        row: 'G',
        status: 'Available',
      },
    ],
  },
  {
    id: '5',
    row: [
      {
        column: '5',
        row: 'A',
        status: 'Available',
      },
      {
        column: '5',
        row: 'B',
        status: 'Available',
      },
      {
        column: '5',
        row: 'C',
        status: 'Reserved',
      },
      {
        column: '5',
        row: 'D',
        status: 'Reserved',
      },
      {
        column: '5',
        row: 'E',
        status: 'Available',
      },
      {
        column: '5',
        row: 'F',
        status: 'Available',
      },
      {
        column: '5',
        row: 'G',
        status: 'Available',
      },
    ],
  },
  {
    id: '6',
    row: [
      {
        column: '6',
        row: 'A',
        status: 'Available',
      },
      {
        column: '6',
        row: 'B',
        status: 'Available',
      },
      {
        column: '6',
        row: 'C',
        status: 'Available',
      },
      {
        column: '6',
        row: 'D',
        status: 'Available',
      },
    ],
  },
];

const days = [
  {
    id: '1',
    name: 'Sat',
    date: '10',
  },
  {
    id: '2',
    name: 'Sun',
    date: '11',
  },
  {
    id: '3',
    name: 'Mon',
    date: '12',
  },
  {
    id: '4',
    name: 'Tue',
    date: '13',
  },
  {
    id: '5',
    name: 'Wed',
    date: '14',
  },

  {
    id: '6',
    name: 'Thu',
    date: '15',
  },
  {
    id: '7',
    name: 'Fri',
    date: '16',
  },
];

const times = [
  {
    id: '1',
    time: '00:00',
  },
  {
    id: '2',
    time: '02:00',
  },

  {
    id: '3',
    time: '04:00',
  },
  {
    id: '4',
    time: '06:00',
  },

  {
    id: '5',
    time: '08:00',
  },
  {
    id: '6',
    time: '010:00',
  },
  {
    id: '7',
    time: '12:00',
  },
  {
    id: '8',
    time: '14:00',
  },

  {
    id: '9',
    time: '16:00',
  },
  {
    id: '10',
    time: '18:00',
  },

  {
    id: '11',
    time: '20:00',
  },
  {
    id: '12',
    time: '22:00',
  },

  {
    id: '13',
    time: '24:00',
  },
];
export default {
  trendingMovies,
  seats,
  seatStatus,
  days,
  times,
};
