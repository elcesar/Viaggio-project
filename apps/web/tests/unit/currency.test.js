import { expect, test } from 'vitest';
import { formatClp } from '../../src/shared/utils/currency';
test('formats CLP without decimals', () => expect(formatClp(43200000)).toBe('$43.200.000'));
