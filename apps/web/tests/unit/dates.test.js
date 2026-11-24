import { expect, test } from 'vitest';
import { formatDate } from '../../src/shared/utils/dates';
test('formats ISO date in Chilean Spanish', () => expect(formatDate('2028-10-10')).toMatch(/10 oct\.? 2028/i));
