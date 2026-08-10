import { screen, userEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import { createScreenRenderer } from 'src/jest/utils';
import { mockNavigation } from 'src/jest/mocks/mockNavigation';

import PortfolioPreferencesScreen from '../PortfolioPreferencesScreen';

const { renderScreenAsync } = createScreenRenderer(PortfolioPreferencesScreen, {
  initialParams: { theme: 'CLASSIC' },
});

describe(PortfolioPreferencesScreen, () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  beforeEach(() => {
    jest.mocked(useNavigation).mockReturnValue(mockNavigation);
  });

  it('renders preferences content and keeps Continue disabled without changes', async () => {
    await renderScreenAsync();

    expect(await screen.findByTestId('nav-title-label')).toHaveTextContent('Preferences');
    expect(await screen.findByText(/Selma offers optional preferences/)).toBeOnTheScreen();
    expect(await screen.findByTestId('selector-large-swiss-bias')).toBeOnTheScreen();
    expect(await screen.findByRole('button', { name: 'Continue' })).toBeDisabled();
  });

  it('enables Continue after toggling Swiss bias', async () => {
    await renderScreenAsync();

    await user.press(await screen.findByTestId('selector-large-swiss-bias'));

    expect(await screen.findByRole('button', { name: 'Continue' })).not.toBeDisabled();
  });

  it('navigates to summary with the chosen preferences', async () => {
    await renderScreenAsync({ theme: 'SUSTAINABLE' });

    await user.press(await screen.findByTestId('selector-large-swiss-bias'));
    await user.press(await screen.findByRole('button', { name: 'Continue' }));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('PortfolioSummary', {
      theme: 'SUSTAINABLE',
      swissBias: true,
    });
  });
});
