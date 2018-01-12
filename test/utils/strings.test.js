import {
  capitalize,
  properCaps,
} from '../../src/utils/strings';

describe('capitalize function', () => {
  it('should capitalize a string', () => {
    var text = 'hello';
    var expectedText = 'Hello';

    expect(capitalize(text)).toEqual(expectedText);
  });

  it('should return an empty string', () => {
    var text = '';
    var expectedText = '';

    expect(capitalize(text)).toEqual(expectedText);
  });

  it('should return an empty string', () => {
    var text = null || undefined;
    var expectedText = '';

    expect(capitalize(text)).toEqual(expectedText);
  });
});

describe('properCaps function', () => {
  it('should capitalize all the words within a string', () => {
    var text = 'hello world';
    var expectedText = 'Hello World';

    expect(properCaps(text)).toEqual(expectedText);
  });
});
