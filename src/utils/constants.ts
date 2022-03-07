export const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const APIHost = development ? 'https://api.gearfocus.div4.pgtest.co/' : 'https://google.com';

export const avatarMaleDefault = 'https://booking.ulacab.com/img/default-user.png';

export const avatarFemaleDefault =
  'https://www.sbdems.org/wp-content/uploads/2020/08/facebook-female-profile-icon-67-300x300.png';

export const ACCESS_TOKEN_KEY = 'token';
