import { Alert } from 'react-native';
import { screen, userEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import { createScreenRenderer } from 'src/jest/utils';
import { mockNavigation } from 'src/jest/mocks/mockNavigation';

import PortfolioSummaryScreen from '../PortfolioSummaryScreen';

const { renderScreenAsync } = createScreenRenderer(PortfolioSummaryScreen, {
  initialParams: { theme: 'INCOME', swissBias: true },
});

describe(PortfolioSummaryScreen, () => {
  let alertSpy: jest.SpiedFunction<typeof Alert.alert>;
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  beforeEach(() => {
    alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());
    jest.mocked(useNavigation).mockReturnValue(mockNavigation);
  });

  afterEach(() => {
    alertSpy.mockRestore();
  });

  it('renders the portfolio summary with allocation changes and support', async () => {
    await renderScreenAsync();

    expect(await screen.findByText('Income portfolio')).toBeOnTheScreen();
    expect(await screen.findByText('Swiss bias')).toBeOnTheScreen();
    expect(await screen.findByText('Allocation changes')).toBeOnTheScreen();
    expect(await screen.findByText('Need some further support?')).toBeOnTheScreen();
    expect(await screen.findByRole('button', { name: 'Confirm portfolio' })).toBeOnTheScreen();
  });

  it('hides the Swiss bias preferences card when Swiss bias is off', async () => {
    await renderScreenAsync({ theme: 'CLASSIC', swissBias: false });

    expect(await screen.findByText('Classic portfolio')).toBeOnTheScreen();
    expect(screen.queryByText('Swiss bias')).not.toBeOnTheScreen();
  });

  it('shows a success alert when confirming the portfolio', async () => {
    await renderScreenAsync();

    await user.press(await screen.findByRole('button', { name: 'Confirm portfolio' }));

    expect(alertSpy).toHaveBeenCalledWith(
      'Your portfolio has been updated',
      'Your portfolio customisation has been saved.',
    );
  });

  it('opens support info when the customer support card is pressed', async () => {
    await renderScreenAsync();

    await user.press(await screen.findByText('Need some further support?'));

    expect(alertSpy).toHaveBeenCalledWith(
      'Need some further support?',
      expect.stringContaining('lovely human crew'),
    );
  });
});
