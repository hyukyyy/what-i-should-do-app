// jest.mock('react-native-permissions', () =>
//   require('react-native-permissions/mock'),
// );

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

jest.useFakeTimers();
