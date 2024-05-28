/**
 * @format
 */

import 'react-native';

import '@testing-library/jest-native/extend-expect';
import {expect} from '@jest/globals';
import {renderWithProviders} from '../utils/test/test-utils.tsx';
import {fireEvent} from '@testing-library/react-native';
import Login from '../components/page/Login.tsx';

describe('Login Screen', () => {
  let screen: any;

  // 테스트 작성시 마다 새로 컴포넌트 렌더링
  beforeEach(() => {
    screen = renderWithProviders(<Login />);
  });

  it('renders correctly ', () => {
    expect(screen).toMatchSnapshot();
  });

  it('input defined ', () => {
    const usernameInput = screen.getByTestId('usernameInput');
    const passwordInput = screen.getByTestId('passwordInput');
    const loginButton = screen.getByTestId('loginButton');

    expect(usernameInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(loginButton).toBeDefined();
  });

  it('username input validated correctly', () => {
    const testInput = 'ftkem2003';

    // 아이디 입력
    const usernameInput = screen.getByTestId('usernameInput');
    fireEvent.changeText(usernameInput, testInput);
    expect(usernameInput.props.value).toBe(testInput);

    // 로그인
    const loginButton = screen.getByTestId('loginButton');
    fireEvent.press(loginButton);

    // 에러 메세지 출력
    const errorMessage = screen.queryByText('잘못된 이메일 형식입니다.');
    expect(errorMessage).toBeDefined();

    const testInput2 = '';

    // 아이디 입력
    fireEvent.changeText(usernameInput, testInput2);
    expect(usernameInput.props.value).toBe(testInput2);

    fireEvent.press(loginButton);

    // 에러 메세지 출력
    const errorMessage2 = screen.queryByText('이메일을 입력해주세요.');
    expect(errorMessage2).toBeDefined();
  });

  it('password input validated correctly', () => {
    const testInput = 'four';

    // 아이디 입력
    const passwordInput = screen.getByTestId('passwordInput');
    fireEvent.changeText(passwordInput, testInput);
    expect(passwordInput.props.value).toBe(testInput);

    // 로그인
    const loginButton = screen.getByTestId('loginButton');
    fireEvent.press(loginButton);

    // 에러 메세지 출력
    const errorMessage = screen.queryByText(
      '비밀번호는 5자리 이상 입력해주세요.',
    );
    expect(errorMessage).toBeDefined();

    const testInput2 = '';

    // 아이디 입력
    fireEvent.changeText(passwordInput, testInput2);
    expect(passwordInput.props.value).toBe(testInput2);

    fireEvent.press(loginButton);

    // 에러 메세지 출력
    const errorMessage2 = screen.queryByText('비밀번호를 입력해주세요.');
    expect(errorMessage2).toBeDefined();
  });
});
