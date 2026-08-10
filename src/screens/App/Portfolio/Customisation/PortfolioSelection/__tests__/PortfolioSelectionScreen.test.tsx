import { screen, userEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import { createScreenRenderer } from 'src/jest/utils';
import { mockNavigation } from 'src/jest/mocks/mockNavigation';

import PortfolioSelectionScreen from '../PortfolioSelectionScreen';

const { renderScreenAsync } = createScreenRenderer(PortfolioSelectionScreen);

describe(PortfolioSelectionScreen, () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  beforeEach(() => {
    jest.mocked(useNavigation).mockReturnValue(mockNavigation);
  });

  it('renders the selection title and marks Classic as active', async () => {
    await renderScreenAsync();

    expect(await screen.findByText('Portfolio selection')).toBeOnTheScreen();
    expect(await screen.findByTestId('portfolio-selection-card-classic')).toBeOnTheScreen();
    expect(await screen.findByText('Active')).toBeOnTheScreen();
  });

  it('navigates to preferences with the selected portfolio', async () => {
    await renderScreenAsync();

    await user.press(await screen.findByRole('button', { name: 'Continue' }));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('PortfolioPreferences', {
      theme: 'CLASSIC',
    });
  });

  it('passes the chosen portfolio when another card is selected', async () => {
    await renderScreenAsync();

    await user.press(await screen.findByTestId('portfolio-selection-card-income'));
    await user.press(await screen.findByRole('button', { name: 'Continue' }));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('PortfolioPreferences', {
      theme: 'INCOME',
    });
  });
});
