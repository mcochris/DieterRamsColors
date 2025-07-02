import themePicker from '../js/themePicker.ts';

describe('themePicker', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="theme-picker">
        <button>light</button>
        <button>dark</button>
        <button>sample</button>
      </div>
      <div class="text"></div>
    `;
  });

  test('clicking dark theme applies dark-theme class', () => {
    themePicker();
    const darkButton = document.querySelectorAll('.theme-picker button')[1] as HTMLButtonElement;
    darkButton.click();
    expect(document.body.classList.contains('dark-theme')).toBe(true);
  });
});
